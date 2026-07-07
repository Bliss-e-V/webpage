const parser = require('postcss-selector-parser');

module.exports = () => {
    return {
        postcssPlugin: 'postcss-replace-attribute-selectors',
        Rule(rule) {
            // Accumulate mappings onto the root so every rule's selectors survive
            // (assigning a fresh array per rule would keep only the last one).
            const root = rule.root();
            const transformedSelectors = (root.transformedSelectors ||= []);

            const transformSelectors = parser((selectors) => {
                selectors.walkAttributes((attr) => {
                    const attribute = attr.attribute;
                    const operator = attr.operator || '';
                    const value = attr.value || '';

                    const className = `attr-${attribute}${operator}${value}`.replace(/[^a-zA-Z0-9-_]/g, '');

                    // Replace the attribute selector with a class selector
                    const classSelector = parser.className({ value: className });
                    attr.replaceWith(classSelector);

                    // Store the mapping for updating HTML elements later
                    transformedSelectors.push({
                        original: `[${attribute}${operator}${value ? `"${value}"` : ''}]`,
                        className,
                    });
                });
            });

            rule.selector = transformSelectors.processSync(rule.selector);
        },
    };
};
module.exports.postcss = true;
