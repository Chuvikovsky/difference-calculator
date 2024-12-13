const getJson = (diffObj) => diffObj.reduce((acc, {
  key, status, value, end,
}) => {
  if (status === 'updated') {
    return { ...acc, [key]: { status, value } };
  }
  if (end) {
    return { ...acc, [key]: { status, value } };
  }
  return { ...acc, [key]: { status, value: getJson(value) } };
}, {});

const showJsonDiff = (diffObj) => JSON.stringify(getJson(diffObj));

export default showJsonDiff;
