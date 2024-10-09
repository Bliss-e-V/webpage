module.exports = () => {
    return {
        postcssPlugin: 'postcss-replace-attribute-selectors',
        Rule(rule) {
            const parser = require('postcss-selector-parser');
            const transformedSelectors = [];

            const transformSelectors = parser((selectors) => {
                selectors.walkAttributes((attr) => {
                    // Generate a unique class name based on the attribute selector
                    const attribute = attr.attribute;
                    const operator = attr.operator || '';
                    const value = attr.value || '';

                    const className = `attr-${attribute}${operator}${value}`.replace(/[^a-zA-Z0-9-_]/g, '');

                    // Replace the attribute selector with a class selector
                    const classSelector = parser.className({ value: className });
                    attr.replaceWith(classSelector);

                    // Store the mapping for updating HTML elements later
                    transformedSelectors.push({
                        original: `[${attribute}${operator ? operator : ''}${value ? `"${value}"` : ''}]`,
                        className,
                    });
                });
            });

            rule.selector = transformSelectors.processSync(rule.selector);
            // Attach the transformed selectors to the rule for later use
            rule.walkDecls((decl) => {
                decl.root().transformedSelectors = transformedSelectors;
            });
        },
    };
};
module.exports.postcss = true;
