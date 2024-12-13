import { isObject } from '../utils.js';

const checkValue = (value) => {
  if ([null, true, false].includes(value)) {
    return String(value);
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'number') {
    return value;
  }
  return `'${value}'`;
};

const getAddedSentence = (prop, value) => `Property '${prop}' was added with value: ${checkValue(value)}`;

const getDeletedSentence = (prop) => `Property '${prop}' was removed`;

const getUpdateSentence = (prop, oldValue, newValue) => `Property '${prop}' was updated. From ${checkValue(oldValue)} to ${checkValue(newValue)}`;

const getFormattedPlain = (plainList) => plainList.map(({ path, status, value }) => {
  switch (status) {
    case 'added':
      return getAddedSentence(path, value);
    case 'deleted':
      return getDeletedSentence(path);
    case 'updated':
      return getUpdateSentence(path, value.oldValue, value.newValue);
    default:
      throw new Error(`Unknown status type: ${status}`);
  }
});

const showPlain = (diffObj) => {
  const iter = (node, parent = '') => {
    const result = node.flatMap((obj) => {
      const { key, status, end } = obj;
      const update = obj.update ?? false;
      const path = parent === '' ? key : `${parent}.${key}`;
      if (['deleted', 'added'].includes(status) && !update) {
        return { path, status, value: obj.value };
      }
      if (status === 'updated') {
        return {
          path, status, value: obj.value,
        };
      }
      if (end) {
        return [];
      }
      return iter(obj.value, path);
    });
    return result;
  };
  const plainList = iter(diffObj);
  return getFormattedPlain(plainList).join('\n');
};

export default showPlain;
