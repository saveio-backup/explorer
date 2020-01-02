import Sync from './sync/index'
class Data {
  constructor(context) {
    this.sync = new Sync(context);
    // this.db = new IndexDb();
  }
}
export default Data;