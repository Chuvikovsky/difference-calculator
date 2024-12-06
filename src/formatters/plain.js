import { isObject, getKey } from '../functions.js';

const checkValue = (value) => {
  if ([null, true, false].includes(value)) {
    return value;
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const getAddSentence = (prop, value) => `Property '${prop}' was added with value: ${checkValue(value)}`;

const getRemoveSentence = (prop) => `Property '${prop}' was removed`;

const getUpdateSentence = (prop, oldValue, newValue) => `Property '${prop}' was updated. From ${checkValue(oldValue)} to ${checkValue(newValue)}`;

const showPlainDiff = (diffTree) => {
  const iter = (node, parent = []) => {
    const keys = Object.keys(node);
    const result = keys.reduce((acc, key) => {
      const sign = key.at(-1);
      const isNodeObj = isObject(node[key]);
      const value = node[key];
      const propPath = [...parent, getKey(key)].join('.');
      if (sign === '-') {
        const plusKey = `${getKey(key)}+`;
        const newValue = node[plusKey];
        if (newValue === undefined) {
          return [...acc, getRemoveSentence(propPath)];
        }
        return [...acc, getUpdateSentence(propPath, value, newValue)];
      }
      if (sign === '+' && isNodeObj) {
        return [...acc, getAddSentence(propPath, value)];
      }
      if (sign === '=' && !isNodeObj) {
        return [...acc];
      }
      if (sign === '+' && !isNodeObj) {
        const minusKey = `${getKey(key)}-`;
        const oldValue = node[minusKey];
        if (oldValue === undefined) {
          return [...acc, getAddSentence(propPath, value)];
        }
        return [...acc];
      }
      return [...acc, ...iter(node[key], [...parent, getKey(key)])];
    }, []);
    return result;
  };
  const result = iter(diffTree, []);
  return result.join('\n');
};

export default showPlainDiff;
