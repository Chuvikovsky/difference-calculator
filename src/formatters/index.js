import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diffTree, style) => {
  switch (style) {
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    case 'stylish':
    default:
      return stylish(diffTree);
  }
};
