import diff from './diff/index.js';
import parse from './parsers/index.js';
import style from './formatters/index.js';

export default (file1, file2, format) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const diffObj = diff(data1, data2);
  return style(diffObj, format);
};
