import { isObject } from '../utils.js';

const statuses = {
  added: '+',
  deleted: '-',
  changed: ' ',
  unchanged: ' ',
};

const indentation = 4;
const spaceForSign = 2;

const generatePadding = (depth) => {
  const repeat = depth > 0 ? depth * indentation - spaceForSign : depth;
  return `${' '.repeat(repeat)}`;
};

const showStylishObj = (obj, depth) => {
  const keys = Object.keys(obj);
  const result = keys.reduce((acc, key) => {
    const padding = generatePadding(depth);
    if (!isObject(obj[key])) {
      return [...acc, `${padding}  ${key}: ${obj[key]}`];
    }
    return [...acc, `${padding}  ${key}: {`, ...showStylishObj(obj[key], depth + 1), `${padding}  }`];
  }, []);
  return result;
};

const showStylish = (diffObj) => {
  const iter = (tree, depth = 1) => tree.flatMap((obj) => {
    const {
      key, status, value, hasChildren = false, isValueObject = false,
    } = obj;
    if (status === 'updated') {
      return [];
    }
    const padding = generatePadding(depth);
    if (hasChildren) {
      return [`${padding}${statuses[status]} ${key}: {`, ...iter(value, depth + 1), `${padding}  }`];
    }
    if (isValueObject) {
      return [`${padding}${statuses[status]} ${key}: {`, ...showStylishObj(value, depth + 1), `${padding}  }`];
    }
    return [`${padding}${statuses[status]} ${key}: ${value}`];
  });
  const result = iter(diffObj, 1);
  return ['{', ...result, '}'].join('\n');
};

export default showStylish;
