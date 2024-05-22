const generateADSPath = (path : string) => {
  return path.replace('/src/', '');
};

export default generateADSPath;