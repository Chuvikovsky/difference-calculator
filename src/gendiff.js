import parser from './parsers/index.js';
import style from './formatters/index.js';
import reader from './readers/index.js';

export default (file1, file2, format) => {
  const data1 = reader(file1);
  const data2 = reader(file2);
  const diffObj = parser(data1, data2);
  return style(diffObj, format);
};
