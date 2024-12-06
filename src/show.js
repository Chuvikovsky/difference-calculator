import { isObject } from './gendiff.js';

const showDiff = (diff) => {
  const iter = (tree, depth = 1) => {
    const keys = Object.keys(tree);
    return keys.reduce((acc, key) => {
      const sign = key.slice(-1) === '=' ? ' ' : key.slice(-1);
      const k = key.slice(0, -1);
      const rept = depth > 0 ? depth * 4 - 2 : depth;
      const padding = `${' '.repeat(rept)}`;
      if (!isObject(tree[key])) {
        return [...acc, `${padding}${sign} ${k}: ${tree[key]}`];
      }
      return [
        ...acc,
        `${padding}${sign} ${k}: {`,
        iter(tree[key], depth + 1),
        `${padding}  }`,
      ].flat();
    }, []);
  };
  const result = iter(diff, 1);
  return ['{', ...result, '}'].join('\n');
};

export default showDiff;
