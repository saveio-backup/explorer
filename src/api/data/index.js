import Sync from './sync/index'
import IndexDb from './db/indexDb'
class Data {
  constructor() {
    this.sync = new Sync();
    this.db = new IndexDb();
  }
}
export default Data;