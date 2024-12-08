import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

export default (diffTree, style) => {
  switch (style) {
    case 'stylish':
      return getStylish(diffTree);
    case 'plain':
      return getPlain(diffTree);
    case 'json':
      return getJson(diffTree);
    default:
      throw new Error(`Unknown style type: ${style}`);
  }
};
