/**
 * The file enables `@/api/service/index.js` to import all service modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */



class Service {
  constructor(context) {
    this.init(context);
  }

  init(context) {
    const vm = this;
    const files = require.context('.', false, /\.js$/)
    files.keys().forEach(filePath => {
      if (filePath === './index.js' || filePath === './Base.js') return;
      let _Class = files(filePath).default
      vm[filePath.replace(/(\.\/|\.js)/g, '')] = new _Class(context);
    });
  }
}

export default Service