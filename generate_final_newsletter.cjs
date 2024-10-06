// FIRST RUN: yarn run build
// then this file by: node generate_final_newsletter.cjs 

const juice = require('juice');
const fs = require('fs');
const path = require('path');

// Read the HTML file from the build output
const htmlFilePath = path.join(__dirname, '.vercel/output/static/newsletter/index.html');
const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
const options = {
    webResources: {
        relativeTo: path.join(__dirname, '/.vercel/output/static/'), // The root path to resolve CSS and assets
    },
};

juice.juiceResources(htmlContent, options, (err, html) => {
    if (err) {
        console.error(err);
    }
    const outputFilePath = path.join(__dirname, 'final_newsletter.html');
    fs.writeFileSync(outputFilePath, html);
    
    console.log('Styles inlined and output saved to', outputFilePath);
});