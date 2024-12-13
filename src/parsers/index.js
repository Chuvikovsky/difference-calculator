import { isObject } from '../utils.js';

const parser = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = keys1.filter((key) => keys2.includes(key));
  const allKeys = Array.from(new Set([...keys1, ...keys2])).toSorted();
  return allKeys.reduce((acc, key) => {
    if (commonKeys.includes(key)) {
      if (data1[key] === data2[key]) {
        return [...acc, {
          key, status: 'unchanged', value: data2[key], end: true,
        }];
      }
      if (isObject(data1[key]) !== isObject(data2[key])
        || (!isObject(data1[key]) && !isObject(data2[key]))) {
        return [...acc,
          {
            key, status: 'deleted', value: data1[key], update: true, end: true,
          },
          {
            key, status: 'added', value: data2[key], update: true, end: true,
          },
          {
            key, status: 'updated', value: { oldValue: data1[key], newValue: data2[key] }, end: true,
          },
        ];
      }
      return [...acc, {
        key, status: 'unchanged', value: parser(data1[key], data2[key]), end: false,
      }];
    }
    if (keys1.includes(key)) {
      return [...acc, {
        key, status: 'deleted', value: data1[key], update: false, end: true,
      }];
    }
    return [...acc, {
      key, status: 'added', value: data2[key], update: false, end: true,
    }];
  }, []);
};

export default parser;
