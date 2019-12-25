const result = {
  bytesToSize(bytes) {
    if (bytes === 0) return '0 Byte';
    var k = 1024;

    sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    i = Math.floor(Math.log(bytes) / Math.log(k));
    var num = bytes / Math.pow(k, i);
    return num.toFixed(2) + ' ' + sizes[i];
  },
  filterFloat(value) {
    if (/^(\-|\+)?|(\.\d+)(\d+(\.\d+)?|(\d+\.)|Infinity)$/
      .test(value))
      return Number(value);
    return NaN;
  },
  effectiveNumber(value) {
    var m = Number(value)
      .toExponential()
      .match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return Number(value).toFixed(Math.max(0, (m[1] || "").length - m[2]));
  },
  getStart7ToEnd8(val) {
    if(val.length <= 12) return val;
    return val.slice(0,7)+'...'+val.slice(val.length - 8);
  },
  getStart6ToEnd6(val) {
    if(val.length <= 12) return val;
    return val.slice(0,6)+'...'+val.slice(val.length - 6);
  }
}
module.exports = result;