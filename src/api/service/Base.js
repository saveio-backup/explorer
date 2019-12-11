import Res from './../res'
class Base {
  constructor(context) {
    this.context = context;
    this.rpcClient = context.rpcClient;
    this.Res = Res;
  }
}

export default Base;