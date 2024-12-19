import _ from 'lodash';
import { isObject } from '../utils.js';

const diff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allUnsortKeys = Array.from(new Set([...keys1, ...keys2]));
  const allKeys = _.sortBy(allUnsortKeys);
  return allKeys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        return [
          ...acc,
          {
            key,
            status: 'unchanged',
            value: data2[key],
          },
        ];
      }
      if (isObject(data1[key]) && isObject(data2[key])) {
        return [
          ...acc,
          {
            key,
            status: 'unchanged',
            value: diff(data1[key], data2[key]),
            hasChildren: true,
          },
        ];
      }
      return [
        ...acc,
        {
          key,
          status: 'deleted',
          value: data1[key],
          isValueObject: isObject(data1[key]),
        },
        {
          key,
          status: 'added',
          value: data2[key],
          isValueObject: isObject(data2[key]),
        },
        {
          key,
          status: 'updated',
          value: { oldValue: data1[key], newValue: data2[key] },
        },
      ];
    }
    if (Object.hasOwn(data1, key)) {
      return [
        ...acc,
        {
          key,
          status: 'deleted',
          value: data1[key],
          isValueObject: isObject(data1[key]),
        },
      ];
    }
    return [
      ...acc,
      {
        key,
        status: 'added',
        value: data2[key],
        isValueObject: isObject(data2[key]),
      },
    ];
  }, []);
};

export default diff;
