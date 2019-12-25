import Base from './Base'
class Other extends Base {
  constructor(context) {
    super(context);
  }

  /**
   * 
   * @param {String/Number} val
   * @return {String/Boolean} 1: 'address'/2: 'txHash'/3: 'block'/0: false 
   */
  async getTypeByContent(val) {
    let addressReg = /^A[1-9A-HJ-NP-Za-km-z]{33}$/;
    let blockReg = /^\d+$/
    if(addressReg.test(val)) {
      return 1;
    } else if(val.length === 64) {
      return 2;
    } else if(blockReg.test(val)) {
      if(val == 0) return 0;
      let blockHeight = await this.context.service.Block.getBlockHeight();
      if(parseInt(val) > blockHeight) return 0;
      else return 3;
    } else {
      return 0;
    }
  }
}
export default Other;