import parser from './parsers/index.js';
import style from './formatters/index.js';
import reader from './readers/index.js';
import diff from './diff/index.js';

export default (file1, file2, format) => {
  const { content: content1, extension: extension1 } = reader(file1);
  const { content: content2, extension: extension2 } = reader(file2);
  const data1 = parser(content1, extension1);
  const data2 = parser(content2, extension2);
  const diffObj = diff(data1, data2);
  return style(diffObj, format);
};
