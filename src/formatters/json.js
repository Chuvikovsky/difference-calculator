const replacer = (key, value) => {
  if (key === 'hasChildren' || key === 'isValueObject') {
    return undefined;
  }
  return value;
};

const showJsonDiff = (diffObj) => JSON.stringify(diffObj, replacer, '  ');

export default showJsonDiff;
