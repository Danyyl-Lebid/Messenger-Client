export const renderError = (node, value) => {
    if (!node || !value) return false;
    node.textContent = value;
};
export const renderText = (node, value) => {
    if (!node || value === undefined) return false;
    node.textContent = value;
};
