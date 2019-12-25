import Buffer from 'buffer'
class Util {
  /**
   * 
   * @param {Array} arr
   * @return {Number} list number sum; 
   */
  static sum(arr) {
    return arr.reduce((acc, val) => acc + val);
  }

  /**
   * 
   * @param {Array} list
   * @param {String/Number} keyName
   * @return {Object} value = true 
   */
  static listToObj(list, keyName) {
    let obj = {};
    for(let value of list) {
      if(keyName) {
        obj[value[keyName]] = true;
      } else {
        obj[value] = true;
      }
    }
    return obj;
  }

  /**
   * 
   * @param {Object} obj
   * @return {Array} obj to list about item is obj's key
   */
  static objKeyToList(obj) {
    let list = [];
    for(let key in obj) {
      list.push(key)
    }
    return list;
  }

  static decodeToStringByBase64(base64String) {
    let res = Buffer.Buffer.from(base64String, 'base64').toString('utf-8');
    return res;
  }

  static flatArr(arr) {
    let _arr = []
    for(let value of arr) {
      _arr.concat(value);
    }
    return _arr;
  }
}

export default Util