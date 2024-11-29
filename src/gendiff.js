export default (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = keys2.filter((k) => keys1.includes(k));
  const filteredKeys2 = keys2.flatMap((k) => (commonKeys.includes(k) ? [] : k));
  const sortedKeys = [...keys1, ...filteredKeys2].sort();
  return sortedKeys.reduce((acc, k) => {
    if (commonKeys.includes(k) && data1[k] === data2[k]) {
      return { ...acc, [`  ${k}`]: data1[k] };
    }
    if (commonKeys.includes(k) && data1[k] !== data2[k]) {
      return { ...acc, [`- ${k}`]: data1[k], [`+ ${k}`]: data2[k] };
    }
    if (keys1.includes(k)) {
      return { ...acc, [`- ${k}`]: data1[k] };
    }
    if (keys2.includes(k)) {
      return { ...acc, [`+ ${k}`]: data2[k] };
    }
    return acc;
  }, {});
};
