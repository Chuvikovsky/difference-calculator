import { isObject, getKey } from '../functions.js';

const DELETE = 'delete';
const CHANGE = 'change';
const ADD = 'add';
const SAME = 'same';

const removeSign = (tree) => {
  if (!isObject(tree)) {
    return tree;
  }
  const keys = Object.keys(tree);
  const result = keys.reduce((acc, k) => {
    const key = getKey(k);
    return { ...acc, [key]: removeSign(tree[k]) };
  }, {});
  return result;
};

const jsonDiff = (diffTree) => {
  const keys = Object.keys(diffTree);
  const result = keys.reduce((acc, k) => {
    const sign = k.at(-1);
    const key = getKey(k);
    if (sign === '-') {
      if (keys.includes(`${key}+`)) {
        return {
          ...acc,
          [key]: {
            key, status: CHANGE, oldValue: removeSign(diffTree[k]), newValue: removeSign(diffTree[`${key}+`]),
          },
        };
      }
      return {
        ...acc, [key]: { key, status: DELETE, value: removeSign(diffTree[k]) },
      };
    }
    if (sign === '+') {
      if (keys.includes(`${key}-`)) {
        return { ...acc };
      }
      return {
        ...acc, [key]: { key, status: ADD, value: removeSign(diffTree[k]) },
      };
    }
    const isObj = isObject(diffTree[k]);
    if (!isObj) {
      return { ...acc, [key]: { key, status: SAME, value: removeSign(diffTree[k]) } };
    }
    return { ...acc, [key]: { key, status: SAME, value: jsonDiff(diffTree[k]) } };
  }, {});
  return result;
};

const showJsonDiff = (diffTree) => JSON.stringify(jsonDiff(diffTree));

export default showJsonDiff;
