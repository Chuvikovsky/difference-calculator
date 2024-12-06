const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const normalizedKey = (key) => `${key.slice(0, -1)}`;

const markAllKeys = (tree, sign = '=') => {
  if (!isObject(tree)) {
    return tree;
  }
  const iter = (node) => {
    const keys = Object.keys(node);
    const markedKeys = keys.map((key) => `${key}${sign}`);
    return markedKeys.reduce((acc, mkey) => {
      if (!isObject(node[normalizedKey(mkey)])) {
        return { ...acc, [mkey]: node[normalizedKey(mkey)] };
      }
      return { ...acc, [mkey]: iter(node[normalizedKey(mkey)]) };
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
      if (key.at(-1) === '-') {
        return { ...acc, [key]: markAllKeys(data1[normalizedKey(key)]) };
      }
      if (key.at(-1) === '+') {
        return { ...acc, [key]: markAllKeys(data2[normalizedKey(key)]) };
      }
      if (
        !isObject(data1[normalizedKey(key)])
        && !isObject(data2[normalizedKey(key)])
      ) {
        if (data1[normalizedKey(key)] === data2[normalizedKey(key)]) {
          return { ...acc, [key]: data1[normalizedKey(key)] };
        }
        const key1 = `${normalizedKey(key)}-`;
        const key2 = `${normalizedKey(key)}+`;
        return {
          ...acc,
          [key1]: data1[normalizedKey(key)],
          [key2]: data2[normalizedKey(key)],
        };
      }
      if (
        isObject(data1[normalizedKey(key)])
        !== isObject(data2[normalizedKey(key)])
      ) {
        const key1 = `${normalizedKey(key)}-`;
        const key2 = `${normalizedKey(key)}+`;
        return {
          ...acc,
          [key1]: markAllKeys(data1[normalizedKey(key)]),
          [key2]: markAllKeys(data2[normalizedKey(key)]),
        };
      }
      return {
        ...acc,
        [key]: iter(data1[normalizedKey(key)], data2[normalizedKey(key)]),
      };
    }, {});
  };
  return iter(file1, file2);
};

export { isObject };
