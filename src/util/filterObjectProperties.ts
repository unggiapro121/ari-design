/**
 * Filters a list of properties from an object
 * @param object object to be filtered
 * @param filterList list of properties to be removed
 * @returns filtered object
 */
const filterObjectProperties = (object: any, filterList: string[]) => {
  return Object.keys(object)
    .filter(key => filterList.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = object[key];

      return obj;
    }, {});
};

export default filterObjectProperties;