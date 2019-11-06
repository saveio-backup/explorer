class MockAPI {
  getcountstat() {
    return {
      "Action": "getcountstat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "BlockHeight": 1011,
        "TotalTxCount": 2251234,
        "DNSNodeCount": 321341234,
        "FSNodeCount": 42341243,
        "TotalAddrs": 5123421,
        "TotalChannels": 21342346
      },
      "Version": "1.0.0"
    }
  }
  getstoragestat() {
    return {
      "Action": "getstoragestat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Used": 10,
        "Remain": 90,
        "Details": [{
          "Used": 20,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }]
      },
      "Version": "1.0.0"
    }
  }
  getprofitstat(params) {
    console.log('params',params);
    return {
      "Action": "getprofitstat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Details": [
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.0000051",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.000007",
            "UpdatedAt": "1572864587"
          },
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.0000412",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.000000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.000000007",
            "UpdatedAt": "1572864587"
          },
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.000002",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.000007",
            "UpdatedAt": "1572864587"
          },
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.000023",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.0000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.0000007",
            "UpdatedAt": "1572864587"
          },
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.0000123123",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.0000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.0000007",
            "UpdatedAt": "1572864587"
          },
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.0000001",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.000007",
            "UpdatedAt": "1572864587"
          },
          {
            "IndexProfit": 0,
            "IndexProfitFormat": "0.0000004",
            "ChannelProfit": 20,
            "ChannelProfitFormat": "0.000002",
            "StorageProfit": 70,
            "StorageProfitFormat": "0.0000007",
            "UpdatedAt": "1572864587"
          }
        ]

      },
      "Version": "1.0.0"
    }
  }
  getfilestat() {
    return {
      "Action": "getfilestat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Details": [{
          "New": 10,
          "Total": 100,
          "UpdatedAt": 1572864587
        }]
      },
      "Version": "1.0.0"
    }
  }
  getchannelstat() {
    return {
      "Action": "getchannelstat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Details": [{
          "New": 10,
          "Close": 3,
          "Total": 100,
          "UpdatedAt": 1572864587
        }]
      },
      "Version": "1.0.0"
    }
  }
  gettransactionstat() {
    return {
      "Action": "gettransactionstat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Details": [{
          "Onchain": 10,
          "Offchain": 1,
          "UpdatedAt": "1572864587"
        }]
      },
      "Version": "1.0.0"
    }
  }
  getstakestat() {
    return {
      "Action": "getstakestat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Details": [{
          "DNS": 100000000,
          "DNSFormat": "1.0",
          "FS": 100000000,
          "FSFormat": "1.0",
          "UpdatedAt": "1572864587"
        }]
      },
      "Version": "1.0.0"
    }
  }
  getaddressstat() {
    return {
      "Action": "getaddressstat",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Total": 366192312,
        "NewAddrIn7D": 3661,
        "NewAddrIn30D": 13661,
        "AddrCountList": [{
          "Range": "0-0.00001",
          "Count": 1,
          "Ratio": 0.2
        }],
        "AmountCountList": [{
          "Range": "0-0.00001",
          "Count": 1,
          "Ratio": 0.2
        }],
        "Details": [{
          "Address": "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
          "Balance": 100,
          "BalanceFormat": "0.0000001",
          "TransferCountIn30D": 10,
          "FirstTransferDate": 1572864587
        }]
      },
      "Version": "1.0.0"
    }
  }
  getblocks() {
    return {
      "Action": "getblocks",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Total": 23921,
        "Blocks": [{
          "Height": 100,
          "TxCount": 1,
          "Size": 2041,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Height": 101,
          "TxCount": 1,
          "Size": 2120,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Height": 102,
          "TxCount": 100,
          "Size": 30,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Height": 103,
          "TxCount": 11200,
          "Size": 20222,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Height": 104,
          "TxCount": 10,
          "Size": 2,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Height": 105,
          "TxCount": 100000,
          "Size": 20000,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        }]
      },
      "Version": "1.0.0"
    }
  }
  getblockbyheight() {
    return {
      "Action": "getblockbyheight",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Hash": "xxx",
        "Height": 100,
        "TxCount": 100,
        "Size": 20,
        "Miner": "xxx",
        "Status": 1,
        "CreatedAt": 1572935306,
        "Txs": [{
          "Hash": "",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx"
        }]

      },
      "Version": "1.0.0"
    }
  }
  getblockbyhash() {
    return {
      "Action": "getblockbyhash",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Hash": "xxx",
        "Height": 100,
        "TxCount": 100,
        "Size": 20,
        "Miner": "xxx",
        "Status": 1,
        "CreatedAt": 1572935306,
        "Txs": [{
          "Hash": "",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
        }]

      },
      "Version": "1.0.0"
    }
  }
  gettxbyaddr() {
    return {
      "Action": "gettxbyaddr",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "BalanceFormat": "xxx",
        "ChannelCount": 100,
        "TxCount": 100,
        "CreatedAt": 1572935306,
        "Txs": [{
          "Hash": "",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        }]

      },
      "Version": "1.0.0"
    }
  }
  gettransactions() {
    return {
      "Action": "gettransactions",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Total": 20000,
        "Txs": [{
          "Hash": "asfashfjakbsfhbajfaabkfadsfnjbaksdhfbj",
          "Height": 1220,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Hash": "asfashfjakbsfhbajfaabkfadsfnjbaksdhfbj",
          "Height": 1220,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Hash": "ghdkdbgksdfbjkasbdfkasdkjfasdfadsfj",
          "Height": 1221,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Hash": "asfasghdsbjtbuyarbfhjszvj",
          "Height": 1222,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Hash": "bbbjkbzxvjkhdjklahsdjklndafs",
          "Height": 1223,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        },{
          "Hash": "hkgbafsdbsjdfjkabsdhfasjdfbkadsfasdf",
          "Height": 1224,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "xxx",
          "To": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        }]

      },
      "Version": "1.0.0"
    }
  }
  gettransactionbyhash() {
    return {
      "Action": "gettransactionbyhash",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Hash": "",
        "Height": 1220,
        "Amount": "100",
        "Asset": "SAVE",
        "Fee": "0.01",
        "Status": 1,
        "Type": 0,
        "CreatedAt": 1572935306,
        "Details": [{
            "From": "xxx",
            "To": "xxx",
            "Amount": "100.0",
            "Asset": "SAVE"

          },
          {
            "From": "xxx",
            "To": "xxx",
            "Amount": "0.01",
            "Asset": "SAVE"
          }
        ]
      },
      "Version": "1.0.0"
    }
  }
  getnodes() {
    return {
      "Action": "getnodes",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Online": 100,
        "Offline": 2,
        "DNS": [{
          "Alias": "Mixar",
          "Region": "Europ",
          "IP": "127.0.0.1",
          "ChannelCount": 10,
          "Stake": "100.0"
        }, ],
        "FS": [{
          "Alias": "Mixar",
          "Region": "Europ",
          "Storage": 1024,
          "ProfitFormat": "12323.02",
          "Address": "dDSHgHSdHhgflLKnbCrijBckv"
        }, ]
      },
      "Version": "1.0.0"
    }
  }
}

export default new MockAPI();
