import { isObject } from '../utils.js';

const checkValue = (value) => {
  if ([null, true, false].includes(value) || typeof value === 'number') {
    return String(value);
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const getAddedSentence = (prop, value) => `Property '${prop}' was added with value: ${checkValue(value)}`;

const getDeletedSentence = (prop) => `Property '${prop}' was removed`;

const getUpdateSentence = (prop, oldValue, newValue) => `Property '${prop}' was updated. From ${checkValue(oldValue)} to ${checkValue(
  newValue,
)}`;

const showPlain = (diffObj) => {
  const iter = (node, parent = '') => {
    const result = node.reduce((acc, obj) => {
      const {
        key, status, value, hasChildren = false,
      } = obj;
      const path = parent === '' ? key : `${parent}.${key}`;
      if (status === 'added') {
        return { ...acc, [path]: getAddedSentence(path, value) };
      }
      if (status === 'deleted') {
        return { ...acc, [path]: getDeletedSentence(path, value) };
      }
      if (status === 'updated') {
        return { ...acc, [path]: getUpdateSentence(path, value.oldValue, value.newValue) };
      }
      if (hasChildren) {
        return { ...acc, ...iter(value, path) };
      }
      return { ...acc };
    }, {});
    return result;
  };
  const plainObj = iter(diffObj);
  return Object.values(plainObj).join('\n');
};

export default showPlain;
