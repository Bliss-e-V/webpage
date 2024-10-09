const juice = require('juice');
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');
const postcss = require('postcss');
const jsdom = require('jsdom');
const removeAttributeSelectors = require('./postcss-replace-attribute-selectors.cjs');

// Path to your HTML file
const htmlFilePath = path.join(__dirname, '.vercel/output/static/newsletter/index.html');

// Read the HTML content
const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

const juiceOptions = {
    applyStyleTags: true,
    inlineStyleTags: true,
    removeStyleTags: true,
    insertPreservedExtraCss: false,
    webResources: {
        relativeTo: path.join(__dirname, '/.vercel/output/static/'),
    },
};

// Minification options
const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: false, // We'll handle CSS minification separately
    minifyJS: true,
};

async function processCSS(cssContent) {
    // Process the CSS with PostCSS
    const result = await postcss([removeAttributeSelectors]).process(cssContent, { from: undefined });

    // Save the transformed selectors for updating the HTML
    const transformedSelectors = result.root.transformedSelectors || [];

    return { processedCSS: result.css, transformedSelectors };
}

async function updateHTML(htmlContent, transformedSelectors) {
    const dom = new jsdom.JSDOM(htmlContent);
    const document = dom.window.document;

    // Update HTML elements to include new class names
    transformedSelectors.forEach(({ original, className }) => {
        // Remove the square brackets from the original selector
        const attrSelector = original.replace(/^\[|\]$/g, '');
        // Split the attribute and value if necessary
        const [attrName, attrValue] = attrSelector.includes('=')
            ? attrSelector.split('=').map((s) => s.replace(/"/g, ''))
            : [attrSelector, null];

        // Select elements with the attribute
        const elements = attrValue
            ? document.querySelectorAll(`[${attrName}="${attrValue}"]`)
            : document.querySelectorAll(`[${attrName}]`);

        elements.forEach((element) => {
            // Add the new class name
            element.classList.add(className);
        });
    });

    return dom.serialize();
}

async function inlineSVGs(htmlContent) {
    const dom = new jsdom.JSDOM(htmlContent);
    const document = dom.window.document;

    // Find all <img> tags with src ending with .svg
    const imgElements = document.querySelectorAll('img[src$=".svg"]');

    for (let imgElement of imgElements) {
        const src = imgElement.getAttribute('src');
        if (src) {
            // Resolve the SVG file path relative to the HTML file path
            const svgFilePath = path.resolve(path.dirname(htmlFilePath), src);

            // Read the SVG file content
            if (fs.existsSync(svgFilePath)) {
                const svgContent = fs.readFileSync(svgFilePath, 'utf-8');

                // Parse the SVG content
                const svgDom = new jsdom.JSDOM(svgContent, { contentType: 'image/svg+xml' });
                const svgDocument = svgDom.window.document;
                const svgElement = svgDocument.querySelector('svg');

                if (svgElement) {
                    // Adopt the SVG element into the main document
                    const importedNode = document.importNode(svgElement, true);

                    // Copy attributes from the <img> tag to the SVG element
                    for (let attr of imgElement.attributes) {
                        if (attr.name !== 'src') {
                            importedNode.setAttribute(attr.name, attr.value);
                        }
                    }

                    // Replace the <img> tag with the SVG element
                    imgElement.parentNode.replaceChild(importedNode, imgElement);
                }
            } else {
                console.warn(`SVG file not found: ${svgFilePath}`);
            }
        }
    }

    return dom.serialize();
}

juice.juiceResources(htmlContent, juiceOptions, async (err, juicedHtml) => {
    if (err) {
        console.error(err);
        return;
    }

    try {
        // Step 1: Parse the HTML to find CSS file paths
        const dom = new jsdom.JSDOM(htmlContent);
        const document = dom.window.document;

        // Find all <link rel="stylesheet"> elements
        const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        let cssContent = '';

        for (let linkElement of linkElements) {
            const href = linkElement.getAttribute('href');
            if (href) {
                // Resolve the CSS file path relative to the HTML file path
                const cssFilePath = path.join(__dirname, '/.vercel/output/static/', href);

                // Read the CSS file content
                if (fs.existsSync(cssFilePath)) {
                    const fileContent = fs.readFileSync(cssFilePath, 'utf-8');
                    cssContent += fileContent + '\n';
                } else {
                    console.warn(`CSS file not found: ${cssFilePath}`);
                }
            }
        }

        if (!cssContent) {
            console.error('No CSS content found.');
            return;
        }

        // Step 2: Process the CSS to replace attribute selectors
        const { processedCSS, transformedSelectors } = await processCSS(cssContent);

        // Step 3: Update the HTML to reflect the new class names
        let updatedHtml = await updateHTML(juicedHtml, transformedSelectors);

        // Step 4: Inline SVG images
        updatedHtml = await inlineSVGs(updatedHtml);

        // Step 5: Remove existing styles and insert the processed CSS
        const updatedDom = new jsdom.JSDOM(updatedHtml);
        const updatedDocument = updatedDom.window.document;

        // Remove existing <style> and <link rel="stylesheet"> tags
        const styleTags = updatedDocument.querySelectorAll('style');
        styleTags.forEach((tag) => tag.remove());

        const linkTags = updatedDocument.querySelectorAll('link[rel="stylesheet"]');
        linkTags.forEach((tag) => tag.remove());

        // Create a new <style> tag with the processed CSS
        const newStyleTag = updatedDocument.createElement('style');
        newStyleTag.textContent = processedCSS;
        updatedDocument.head.appendChild(newStyleTag);

        // Serialize and minify the final HTML
        let finalHtml = updatedDom.serialize();
        finalHtml = await minify(finalHtml, minifyOptions);

        const outputFilePath = path.join(__dirname, 'newsletter.html');
        fs.writeFileSync(outputFilePath, finalHtml);

        console.log('SVGs inlined and output saved to', outputFilePath);
    } catch (error) {
        console.error('Error during processing:', error);
    }
});
