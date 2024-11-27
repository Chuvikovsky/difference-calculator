const getFileExt = (fileName) => {
  return fileName.split('.').at(-1).toLowerCase();
};

export { getFileExt };
