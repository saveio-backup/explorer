const response = Symbol('response');
class Res {
  constructor() {

    this[response] = {
      error: 0,
      result: null,
      version: 'v1.0.0' 
    }
  }
  get() {
    return this[response];
  }

  set({error = 0, result = null, version = 'v1.0.0'}) {
    this[response] = {
      error,
      result,
      version 
    }
  }

  getError() {
    return this[response].error;
  }

  setError(error = 0) {
    this[response].error = error;
  
  }

  getResult() {
    return this[response].result;
  }

  setResult(result) {
    this[response].result = result;
  }
}

export default Res;