import { isObject, getKey } from '../functions.js';

const markAllNestedKeys = (tree, sign = '=') => {
  if (!isObject(tree)) {
    return tree;
  }
  const iter = (node) => {
    const keys = Object.keys(node);
    const markedKeys = keys.map((key) => `${key}${sign}`);
    return markedKeys.reduce((acc, mkey) => {
      if (!isObject(node[getKey(mkey)])) {
        return { ...acc, [mkey]: node[getKey(mkey)] };
      }
      return { ...acc, [mkey]: iter(node[getKey(mkey)]) };
    }, {});
  };
  return iter(tree);
};

export default (file1, file2) => {
  const iter = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const markedKeys1 = keys1.map((key) => (keys2.includes(key) ? `${key}=` : `${key}-`));
    const markedKeys2 = keys2.map((key) => (keys1.includes(key) ? `${key}=` : `${key}+`));
    const commonKeys = Array.from(
      new Set([...markedKeys1, ...markedKeys2]),
    ).sort();

    return commonKeys.reduce((acc, key) => {
      const k = getKey(key);
      if (key.at(-1) === '-') {
        return { ...acc, [key]: markAllNestedKeys(data1[k]) };
      }
      if (key.at(-1) === '+') {
        return { ...acc, [key]: markAllNestedKeys(data2[k]) };
      }
      if (
        !isObject(data1[k])
        && !isObject(data2[k])
      ) {
        if (data1[k] === data2[k]) {
          return { ...acc, [key]: data1[k] };
        }
        const key1 = `${k}-`;
        const key2 = `${k}+`;
        return {
          ...acc,
          [key1]: data1[k],
          [key2]: data2[k],
        };
      }
      if (
        isObject(data1[k])
        !== isObject(data2[k])
      ) {
        const key1 = `${k}-`;
        const key2 = `${k}+`;
        return {
          ...acc,
          [key1]: markAllNestedKeys(data1[k]),
          [key2]: markAllNestedKeys(data2[k]),
        };
      }
      return {
        ...acc,
        [key]: iter(data1[k], data2[k]),
      };
    }, {});
  };
  return iter(file1, file2);
};
