import getStylish from './stylish.js';
import getPlain from './plain.js';

export default (diffObj, style) => {
  switch (style) {
    case 'stylish':
      return getStylish(diffObj);
    case 'plain':
      return getPlain(diffObj);
    default:
      throw new Error(`Unknown style type: ${style}`);
  }
};
