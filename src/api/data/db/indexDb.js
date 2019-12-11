class IndexDb {
  constructor() {
    this.version = {
      transaction: 1,
      version: 1
    }
    this.init();
  }

  async init() {
    let isFirst = await this.isExist({
      indexDbName: 'version',
      key: 'version',
      includeFirst: true
    });
    if(isFirst === false) {
      this.insertData({
        indexDbName: 'version',
        key: 'version',
        data: [{
          transaction: 1,
          version: 1
        }]
      });
    } else {
      let res = await this.findData({
        indexDbName: 'version',
        key: 'version'
      });

      console.log('res');
      console.log(res);
      this.version = res[res.length - 1];
    }
  }

  createDatabase(indexDbName) {
    return new Promise((resolve,reject) => {
      let openRequest = indexedDB.open(indexDbName);
      openRequest.onerror = function (e) { //当创建数据库失败时候的回调
        console.log("Database error: " + e.target.errorCode);
        reject(e);
      };
      openRequest.onsuccess = function (event) {
        console.log("Database open created");
        resolve();
      };
    });
  }

  deleteDatabase(indexDbName) {
    return new Promise((resolve, reject) => {
      let deleteDbRequest = indexedDB.deleteDatabase(indexDbName);
      deleteDbRequest.onsuccess = function (event) {
        console.log("detete database success");
        resolve();
      };
      deleteDbRequest.onerror = function (e) {
        console.log("Database error: " + e.target.errorCode);
        reject(e);
      };
    })
  }

  addStorageObj({
    indexDbName,
    key,
    keyPath = false
  }) {
    console.log(this.version);
    const vm = this;
    return new Promise(async (resolve, reject) => {
      let db;
      let openRequest;
      vm.version[indexDbName] = vm.version[indexDbName] + 1;
      let version = vm.version[indexDbName];
      let waitDone = await vm.insertData({indexDbName: 'version', key: 'version', data: [vm.version]});
      openRequest = indexedDB.open(indexDbName, version);
      openRequest.onerror = function (e) {
        reject();
      }
      openRequest.onsuccess = function (event) {
        console.log("Database created");
      }
      openRequest.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(key)) {
          //keyPath:Javascript对象，对象必须有一属性作为键值
          let option = keyPath === false ? {
            autoIncrement: true
          } : {
            keyPath: keyPath
          }
          console.log('who quickly?');
          let objectStore = db.createObjectStore(key, option);
          resolve();
        }
      }
    })
  }


  insertData({
    indexDbName,
    key,
    data,
    keyPath = false
  }) {
    const vm = this;
    return new Promise(async (resolve, reject) => {
      // is not exist else to create storageObj
      let isExist = await vm.isExist({
        indexDbName,
        key,
        keyPath
      });
      if(!isExist) {
        let waitDone = await vm.addStorageObj({
          indexDbName,
          key,
          keyPath
        })
      }

      let db;
      let openRequest;
      let version = vm.version[indexDbName];
      openRequest = indexedDB.open(indexDbName, version);
      openRequest.onerror = function (e) {
        console.log("Database error: " + e.target.errorCode);
        reject(e);
      };
      openRequest.onsuccess = function (event) {
        console.log("Database open created");
        db = openRequest.result;
        let transaction = db.transaction(key, 'readwrite');
        let store = transaction.objectStore(key);
        for (let i = 0; i < data.length; i++) {
          store.add(data[i]); //将对象添加至userinfo相关的objectstore中
        }
        resolve();
        return;
      };
      openRequest.onupgradeneeded = function (event) {
        db = event.target.result;
        //在第一次创建数据库的时候，就创建key相关的objectstore，以供后面添加数据时候使用
        if (!db.objectStoreNames.contains(key)) {
          //keyPath:Javascript对象，对象必须有一属性作为键值
          let option = keyPath === false ? {
            autoIncrement: true
          } : {
            keyPath: keyPath
          }
          db.createObjectStore(key, option);
        }
      }
    })
  }

  findData({
    indexDbName,
    key,
    keyPath = false
  }) {
    const vm = this;
    return new Promise(async function (resolve, reject) {
      // is not exist else to create storageObj
      let isExist = await vm.isExist({
        indexDbName,
        key,
        keyPath
      });
      if(!isExist) {
        let waitDone = await vm.addStorageObj({
          indexDbName,
          key,
          keyPath
        })
      }

      let openRequest; 
      let version = vm.version[indexDbName];
      openRequest = indexedDB.open(indexDbName, version);
      let db;
      openRequest.onerror = function (e) { //当创建数据库失败时候的回调
        console.log("Database error: " + e.target.errorCode);
        reject(e)
      };
      openRequest.onsuccess = function (event) {
        console.log("Database open created");
        db = openRequest.result; //创建数据库成功时候，将结果给db，此时db就是当前数据库
        // if storageObj not exist; to create
        // let exist = false;
        // for(let i = 0;i < db.objectStoreNames.length; i++) {
        //   if(db.objectStoreNames[i] === key) {
        //     exist = true;
        //   }
        // }
        // if(!exist) {
        //   vm.addStorageObj({
        //     indexDbName,
        //     key
        //   })
        //   resolve([]);
        //   return;
        // }
        let transaction = db.transaction(key, 'readonly');
        let objectStore = transaction.objectStore(key);
        if (keyPath === false) {
          let cursor = objectStore.openCursor();
          let arr = [];
          cursor.onsuccess = function (e) {
            let res = e.target.result;
            if (!res || res === null) {
              resolve(arr);
              return;
            }
            let request = objectStore.get(Number(res.key)); //根据查找出来的id，再次逐个查找
            request.onsuccess = function (e) {
              let res = e.target.result; //查找成功时候返回的结果对象
              if (res) {
                arr.push(res); 
              } else {
                console.log(arr);
                resolve(arr);
                return;
              }
            }
            res.continue();
          }
          cursor.onerror = function (e) {
            console.log(e);
            reject();
          }
        } else {
          let request = objectStore.get(Number(keyPath)); //查找i=1的对象，这里使用Number将1转换成数值类型
          request.onsuccess = function (e) {
            let res = e.target.result; //查找成功时候返回的结果对象
            console.log(res);
            resolve(res);
          }
          request.onerror = function(e) {
            reject(e);
          }
        };
      }
    })
  }

  isExist({
    indexDbName,
    key,
    keyPath = false,
    includeFirst = false
  }) {
    const vm = this;
    return new Promise((resolve, reject) => {
      let openRequest;
      let version = vm.version[indexDbName];
      let db;
      openRequest = indexedDB.open(indexDbName, version);
      openRequest.onerror = function (e) { //当创建数据库失败时候的回调
        console.log("Database error: " + e.target.errorCode);
        reject(e)
      };
      openRequest.onsuccess = function (event) {
        console.log("Database open created");
        db = openRequest.result; //创建数据库成功时候，将结果给db，此时db就是当前数据库
        // if storageObj not exist; to create
        for(let i = 0;i < db.objectStoreNames.length; i++) {
          if(db.objectStoreNames[i] === key) {
            resolve(true);
          }
        }
        resolve(false);
      }
      openRequest.onupgradeneeded = function (event) {
        db = event.target.result;
        //在第一次创建数据库的时候，就创建key相关的objectstore，以供后面添加数据时候使用
        if (!db.objectStoreNames.contains(key)) {
          //keyPath:Javascript对象，对象必须有一属性作为键值
          let option = keyPath === false ? {
            autoIncrement: true
          } : {
            keyPath: keyPath
          }
          db.createObjectStore(key, option);
          if(includeFirst) resolve(false);
        }
      }
    })
  }

  deleteData({indexDbName, key, keyPath = false}) {
    const vm = this;
    return new Promise(async (resolve, reject) => {
      let version = vm.version[indexDbName]
      let openRequest = indexedDB.open(indexDbName, version);
      let db;
      openRequest.onerror = function (e) {
        console.log(e);
        reject();
      }
      openRequest.onsuccess = function (event) {
        db = openRequest.result; //创建数据库成功时候，将结果给db，此时db就是当前数据库
        let transaction = db.transaction(key, 'readwrite');
        let objectStore = transaction.objectStore(key);
        if(keyPath === false) {
          objectStore.clear();
          resolve();
        } else {
          let request = objectStore.delete(Number(keyPath)); //根据查找出来的id，再次逐个查找
          request.onsuccess = function (e) {
            console.log("delete success");
            resolve(e);
          }
          request.onerror = function (e) {
            reject(e);
          }
        }
      }
    })
  }

  updateData({
    indexDbName,
    key,
    data,
    keyPath = false
  }) {
    console.log({
      indexDbName,
      key,
      data,
      keyPath
    });
    const vm = this;
    return new Promise(async function(resolve,reject) {
      // is not exist else to create storageObj
      let isExist = await vm.isExist({
        indexDbName,
        key,
        keyPath
      });
      if(isExist) {
        let waitDone = await vm.deleteData({
          indexDbName,
          key,
          data,
          keyPath
        });
      } else {
        let waitDone2 = await vm.addStorageObj({
          indexDbName,
          key,
          keyPath
        })
      }
      console.log('==============>');
      let waitDone3 = await vm.insertData({
        indexDbName,
        key,
        data,
        keyPath
      });
      resolve();
    }).catch(() => {
      console.log('qweqwesafasfasdfasdfasdfa========123');
    })
  }
}

export default IndexDb;