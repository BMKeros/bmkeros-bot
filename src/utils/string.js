export const format = (str, obj) => str.replace(/\{(\w+)\}/g, (a, b) => obj[b]);

