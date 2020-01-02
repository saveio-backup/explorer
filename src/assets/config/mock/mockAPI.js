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
        "Used": 100000000000000,
        "Remain": 900000000000000,
        "Details": [{
          "Used": 20,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 20,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 20,
          "Remain": 8000,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 2000,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 2000,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 2000,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 2000,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 20,
          "Remain": 800,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 720,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 520,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 2000,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 202,
          "Remain": 80,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 205,
          "Remain": 840,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 20,
          "Remain": 850,
          "UpdatedAt": "1572864587"
        }, {
          "Used": 620,
          "Remain": 280,
          "UpdatedAt": "1572864587"
        }]
      },
      "Version": "1.0.0"
    }
  }
  getprofitstat(params) {
    console.log('params', params);
    if (params.url === '/v1/profit/stat/0') {
      return {
        "Action": "getprofitstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
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
    } else if (params.url === '/v1/profit/stat/1') {
      return {
        "Action": "getprofitstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
              "IndexProfit": 0,
              "IndexProfitFormat": "5100",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "200",
              "StorageProfit": 70,
              "StorageProfitFormat": "700",
              "UpdatedAt": "1572864587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "5100",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "200",
              "StorageProfit": 70,
              "StorageProfitFormat": "200",
              "UpdatedAt": "1572874587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "1200",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "220",
              "StorageProfit": 70,
              "StorageProfitFormat": "20",
              "UpdatedAt": "1572884587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "1200",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "240",
              "StorageProfit": 70,
              "StorageProfitFormat": "210",
              "UpdatedAt": "1572894587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "20",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "11",
              "StorageProfit": 70,
              "StorageProfitFormat": "23",
              "UpdatedAt": "1572904587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "13",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "54",
              "StorageProfit": 70,
              "StorageProfitFormat": "65",
              "UpdatedAt": "1572914587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "55",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "44",
              "StorageProfit": 70,
              "StorageProfitFormat": "35",
              "UpdatedAt": "1572924587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "53",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "53",
              "StorageProfit": 70,
              "StorageProfitFormat": "642",
              "UpdatedAt": "1572934587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "34",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "43",
              "StorageProfit": 70,
              "StorageProfitFormat": "33",
              "UpdatedAt": "1572944587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "22",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "33",
              "StorageProfit": 70,
              "StorageProfitFormat": "2",
              "UpdatedAt": "1572954587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "23",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "11",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1572964587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "33",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1572974587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "44",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "3",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1572984587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "4",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1572994587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "4",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1573004587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "4",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1573014587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "4",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1573024587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "4",
              "StorageProfit": 70,
              "StorageProfitFormat": "3",
              "UpdatedAt": "1573034587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "3",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "3",
              "StorageProfit": 70,
              "StorageProfitFormat": "3",
              "UpdatedAt": "1573044587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "3",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "2",
              "StorageProfit": 70,
              "StorageProfitFormat": "4",
              "UpdatedAt": "1573054587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "4",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "4",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.000007",
              "UpdatedAt": "1573064587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.000023",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.0000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.0000007",
              "UpdatedAt": "1573074587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.0000123123",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.0000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.0000007",
              "UpdatedAt": "1573084587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.0000001",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.000007",
              "UpdatedAt": "1573094587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.0000004",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.0000007",
              "UpdatedAt": "1573104587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.0000412",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.000000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.000000007",
              "UpdatedAt": "1573114587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.000002",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.000007",
              "UpdatedAt": "1573124587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.000023",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.0000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.0000007",
              "UpdatedAt": "1573134587"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "0.0000123123",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "0.0000002",
              "StorageProfit": 70,
              "StorageProfitFormat": "0.0000007",
              "UpdatedAt": "1573144587"
            }
          ]

        },
        "Version": "1.0.0"
      }
    } else {
      return {
        "Action": "getprofitstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
              "IndexProfit": 0,
              "IndexProfitFormat": "3000",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "3000",
              "StorageProfit": 70,
              "StorageProfitFormat": "3200",
              "UpdatedAt": "1573184615"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "2900",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "2900",
              "StorageProfit": 70,
              "StorageProfitFormat": "2300",
              "UpdatedAt": "1573098215"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "3211",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "3321",
              "StorageProfit": 70,
              "StorageProfitFormat": "2533",
              "UpdatedAt": "1573011815"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "2600",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "2799",
              "StorageProfit": 70,
              "StorageProfitFormat": "2955",
              "UpdatedAt": "1572925415"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "2800",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "2900",
              "StorageProfit": 70,
              "StorageProfitFormat": "2900",
              "UpdatedAt": "1572839015"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "1899",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "1990",
              "StorageProfit": 70,
              "StorageProfitFormat": "1788",
              "UpdatedAt": "1572752615"
            },
            {
              "IndexProfit": 0,
              "IndexProfitFormat": "1788",
              "ChannelProfit": 20,
              "ChannelProfitFormat": "1777",
              "StorageProfit": 70,
              "StorageProfitFormat": "1888",
              "UpdatedAt": "1572666215"
            }
          ]
        },
        "Version": "1.0.0"
      }
    }
  }
  getfilestat(params) {
    if (params.url === '/v1/file/stat/0') {
      return {
        "Action": "getfilestat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
            "New": 10,
            "Total": 100,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 200,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 230,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 106,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 156,
            "UpdatedAt": 1572864587
          }, {
            "New": 10,
            "Total": 836,
            "UpdatedAt": 1572864587
          }]
        },
        "Version": "1.0.0"
      }
    } else {
      return {
        "Action": "getfilestat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
            "New": 10,
            "Total": 100,
            "UpdatedAt": 1573184615
          }, {
            "New": 10,
            "Total": 10,
            "UpdatedAt": 1573098215
          }, {
            "New": 10,
            "Total": 200,
            "UpdatedAt": 1573011815
          }, {
            "New": 10,
            "Total": 230,
            "UpdatedAt": 1572925415
          }, {
            "New": 10,
            "Total": 106,
            "UpdatedAt": 1572839015
          }, {
            "New": 10,
            "Total": 156,
            "UpdatedAt": 1572752615
          }, {
            "New": 10,
            "Total": 836,
            "UpdatedAt": 1572666215
          }]
        },
        "Version": "1.0.0"
      }
    }
  }
  getchannelstat(params) {
    if (params.url === '/v1/channel/stat/0') {
      return {
        "Action": "getchannelstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
              "New": 10,
              "Close": 3,
              "Total": 370,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 160,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 80,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 60,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 50,
              "UpdatedAt": 1572864587
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 20,
              "UpdatedAt": 1572864587
            }
          ]
        },
        "Version": "1.0.0"
      }
    } else {
      return {
        "Action": "getchannelstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
              "New": 10,
              "Close": 3,
              "Total": 370,
              "UpdatedAt": 1573184615
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 210,
              "UpdatedAt": 1573098215
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 160,
              "UpdatedAt": 1573011815
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 80,
              "UpdatedAt": 1572925415
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 60,
              "UpdatedAt": 1572839015
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 50,
              "UpdatedAt": 1572752615
            },
            {
              "New": 10,
              "Close": 3,
              "Total": 20,
              "UpdatedAt": 1572666215
            }
          ]
        },
        "Version": "1.0.0"
      }
    }
  }
  gettransactionstat(params) {
    if (params.url === '/v1/transaction/stat/0') {
      return {
        "Action": "gettransactionstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
              "Onchain": 130,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572864587"
            }
          ]
        },
        "Version": "1.0.0"
      }
    } else {
      return {
        "Action": "gettransactionstat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
              "Onchain": 130,
              "Offchain": 1,
              "UpdatedAt": "1573184615"
            },
            {
              "Onchain": 102,
              "Offchain": 1,
              "UpdatedAt": "1573098215"
            },
            {
              "Onchain": 54,
              "Offchain": 1,
              "UpdatedAt": "1573011815"
            }, {
              "Onchain": 38,
              "Offchain": 1,
              "UpdatedAt": "1572925415"
            }, {
              "Onchain": 22,
              "Offchain": 1,
              "UpdatedAt": "1572839015"
            }, {
              "Onchain": 5,
              "Offchain": 1,
              "UpdatedAt": "1572752615"
            }, {
              "Onchain": 10,
              "Offchain": 1,
              "UpdatedAt": "1572666215"
            }
          ]
        },
        "Version": "1.0.0"
      }
    }
  }
  getstakestat(params) {
    if (params.url === '/v1/stake/stat/0') {
      return {
        "Action": "getstakestat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "2.0",
            "FS": 100000000,
            "FSFormat": "1.3",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "1.3",
            "FS": 100000000,
            "FSFormat": "0.2",
            "UpdatedAt": "1572864587"
          }, {
            "DNS": 100000000,
            "DNSFormat": "1.0",
            "FS": 100000000,
            "FSFormat": "0.3",
            "UpdatedAt": "1572864587"
          }]
        },
        "Version": "1.0.0"
      }
    } else {
      return {
        "Action": "getstakestat",
        "Desc": "SUCCESS",
        "Error": 0,
        "Result": {
          "Details": [{
            "DNS": 100000000,
            "DNSFormat": "6.0",
            "FS": 100000000,
            "FSFormat": "2.72",
            "UpdatedAt": "1573184615"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.3",
            "UpdatedAt": "1573098215"
          }, {
            "DNS": 100000000,
            "DNSFormat": "3.2",
            "FS": 100000000,
            "FSFormat": "2.05",
            "UpdatedAt": "1573011815"
          }, {
            "DNS": 100000000,
            "DNSFormat": "5.0",
            "FS": 100000000,
            "FSFormat": "2.0",
            "UpdatedAt": "1572925415"
          }, {
            "DNS": 100000000,
            "DNSFormat": "2.0",
            "FS": 100000000,
            "FSFormat": "1.3",
            "UpdatedAt": "1572839015"
          }, {
            "DNS": 100000000,
            "DNSFormat": "1.3",
            "FS": 100000000,
            "FSFormat": "0.2",
            "UpdatedAt": "1572752615"
          }, {
            "DNS": 100000000,
            "DNSFormat": "1.0",
            "FS": 100000000,
            "FSFormat": "0.3",
            "UpdatedAt": "1572666215"
          }]
        },
        "Version": "1.0.0"
      }
    }
  }
  getaddressstat(params) {
    if (params.url === '/v1/address/stat') {
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
          }, {
            "Range": "0.00001-0.0001",
            "Count": 20,
            "Ratio": 0.4
          }, {
            "Range": "0.0001-0.001",
            "Count": 60,
            "Ratio": 0.12
          }, {
            "Range": "0.001-0.01",
            "Count": 80,
            "Ratio": .16
          }, {
            "Range": "0.01-0.1",
            "Count": 130,
            "Ratio": .26
          }, {
            "Range": "0.1-1",
            "Count": 200,
            "Ratio": .40
          }, {
            "Range": "1-10",
            "Count": 90,
            "Ratio": .18
          }, {
            "Range": "10-100",
            "Count": 120,
            "Ratio": .24
          }, {
            "Range": "100-1000",
            "Count": 100,
            "Ratio": .20
          }, {
            "Range": "1000-10000",
            "Count": 70,
            "Ratio": .14
          }, {
            "Range": "10000-100000",
            "Count": 36,
            "Ratio": .072
          }],
          "AmountCountList": [{
            "Range": "0-0.00001",
            "Count": 1,
            "Ratio": 0.2
          }, {
            "Range": "0.00001-0.0001",
            "Count": 20,
            "Ratio": .04
          }, {
            "Range": "0.0001-0.001",
            "Count": 60,
            "Ratio": .12
          }, {
            "Range": "0.001-0.01",
            "Count": 80,
            "Ratio": .16
          }, {
            "Range": "0.01-0.1",
            "Count": 130,
            "Ratio": .26
          }, {
            "Range": "0.1-1",
            "Count": 140,
            "Ratio": .28
          }, {
            "Range": "1-10",
            "Count": 90,
            "Ratio": .18
          }, {
            "Range": "10-100",
            "Count": 120,
            "Ratio": .24
          }, {
            "Range": "100-1000",
            "Count": 100,
            "Ratio": .02
          }, {
            "Range": "1000-10000",
            "Count": 70,
            "Ratio": .14
          }, {
            "Range": "10000-100000",
            "Count": 36,
            "Ratio": 0.072
          }],
          "Details": [{
            "Address": "34xp4yCVPFHoCNxv4Twseo",
            "Balance": 100,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCG3xR7yCVPFHoCNxv4Twseo",
            "Balance": 100,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "m3xR7yCVPFHoCNxv4Twseo",
            "Balance": 100,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJyxv4Twseo",
            "Balance": 100,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
            "Balance": 100,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRJym3xR7yCVPFHoCNxv4Twseo",
            "Balance": 500,
            "BalanceFormat": "1.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJym3xRTwseo",
            "Balance": 500,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJxv4Twseo",
            "Balance": 300,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
            "Balance": 110,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJym3Nxv4Twseo",
            "Balance": 120,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
            "Balance": 99,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 10,
            "FirstTransferDate": 1572864587
          }, {
            "Address": "34xp4vRoCGJym3xR7yC4Twseo",
            "Balance": 102,
            "BalanceFormat": "0.0000001",
            "TransferCountIn30D": 14,
            "FirstTransferDate": 1572864587
          }]
        },
        "Version": "1.0.0"
      }
    } else {
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
          }, {
            "Range": "0.00001-0.0001",
            "Count": 20,
            "Ratio": 4
          }, {
            "Range": "0.0001-0.001",
            "Count": 60,
            "Ratio": 12
          }, {
            "Range": "0.001-0.01",
            "Count": 80,
            "Ratio": 16
          }, {
            "Range": "0.01-0.1",
            "Count": 130,
            "Ratio": 26
          }, {
            "Range": "0.1-1",
            "Count": 200,
            "Ratio": 40
          }, {
            "Range": "1-10",
            "Count": 90,
            "Ratio": 18
          }, {
            "Range": "10-100",
            "Count": 120,
            "Ratio": 24
          }, {
            "Range": "100-1000",
            "Count": 100,
            "Ratio": 20
          }, {
            "Range": "1000-10000",
            "Count": 70,
            "Ratio": 14
          }, {
            "Range": "10000-100000",
            "Count": 36,
            "Ratio": 7.2
          }],
          "AmountCountList": [{
            "Range": "0-0.00001",
            "Count": 1,
            "Ratio": 0.2
          }, {
            "Range": "0.00001-0.0001",
            "Count": 20,
            "Ratio": 4
          }, {
            "Range": "0.0001-0.001",
            "Count": 60,
            "Ratio": 12
          }, {
            "Range": "0.001-0.01",
            "Count": 80,
            "Ratio": 16
          }, {
            "Range": "0.01-0.1",
            "Count": 130,
            "Ratio": 26
          }, {
            "Range": "0.1-1",
            "Count": 140,
            "Ratio": 28
          }, {
            "Range": "1-10",
            "Count": 90,
            "Ratio": 18
          }, {
            "Range": "10-100",
            "Count": 120,
            "Ratio": 24
          }, {
            "Range": "100-1000",
            "Count": 100,
            "Ratio": 20
          }, {
            "Range": "1000-10000",
            "Count": 70,
            "Ratio": 14
          }, {
            "Range": "10000-100000",
            "Count": 36,
            "Ratio": 7.2
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
  }
  getblocks(params) {
    return {
      "Action": "getblocks",
      "Desc": "SUCCESS",
      "Error": 0,
      "Result": {
        "Total": 109,
        "Blocks": [{
          "Height": 109,
          "TxCount": 1,
          "Size": 2041,
          "Miner": "xxx",
          "Status": 0,
          "CreatedAt": 1573206399
        }, {
          "Height": 108,
          "TxCount": 1,
          "Size": 2120,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1573118798
        }, {
          "Height": 107,
          "TxCount": 107,
          "Size": 30,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1573205158
        }, {
          "Height": 106,
          "TxCount": 11200,
          "Size": 20222,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Height": 105,
          "TxCount": 10,
          "Size": 2,
          "Miner": "xxx",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Height": 104,
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
        "Hash": "hjskaghkjdghHLFHLKHKLHASKLJDHALKFJHLKJ",
        "Height": 102,
        "TxCount": 10123,
        "Size": 20681,
        "Miner": "snkj",
        "Status": 1,
        "CreatedAt": 1572935306,
        "Txs": [{
          "Hash": "gasagasdjga",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "gssjkfdhkjahlfka",
          "To": "gnjkbsgjkbsdfas"
        }, {
          "Hash": "gasagasfaasdjga",
          "Amount": "1200",
          "Asset": "ONI",
          "From": "gssjSDGkfdhkjahlfka",
          "To": "gnjkbsgjkAASFbsdfas"
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
        "BalanceFormat": "1000000.00",
        "ChannelCount": 100,
        "TxCount": 100,
        "CreatedAt": 1572935306,
        "Txs": [{
          "Hash": "aghiahskjgalkjsgn",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "jksdhkjasfasfasfashdjgasd",
          "To": "ksdahgkjsdgasfasfasfaaadsgasdg",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "aghiahskjgalkjsgn",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "jksdhkjassfasfhdjgasd",
          "To": "asfasfasfasfasfasfasfasasfasf",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "aghiahskjgalkjsgn",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "jksdhkjashdjgasd",
          "To": "ksdahgkjsdgadsgasdg",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "aghiahskjgalkjsgnFSDAFGJASGDF",
          "Amount": "100",
          "Asset": "ONI",
          "From": "jksdhkjasasdfjasdfhdjgasd",
          "To": "ksdadsahgkfhgkjsdgadsgasdg",
          "Status": 0,
          "CreatedAt": 1572935306
        }, {
          "Hash": "aghiahskjgalkjsgn",
          "Amount": "100000000",
          "Asset": "SAVE",
          "From": "jksdhkjashdjgasd",
          "To": "ksdahgkjsdgadsgasdg",
          "Status": 0,
          "CreatedAt": 1562935306
        }, {
          "Hash": "aghiahskjgalkjsgn",
          "Amount": "100",
          "Asset": "SAVE",
          "From": "jksdhkjashdjgasd",
          "To": "ksdahgkjsdgadsgasdg",
          "Status": 1,
          "CreatedAt": 1552935306
        }]

      },
      "Version": "1.0.0"
    }
  }
  gettransactions(params) {
    console.log(params);
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
          "From": "hafkjhskfja",
          "To": "fkahfjhsakljfd",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "asfashfjakbsfhbajfaabkfadsfnjbaksdhfbj",
          "Height": 1220,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "gfsagdfasjdfkasdf",
          "To": "jsdhfkjahsdkjfhjklahsdf",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "ghdkdbgksdfbjkasbdfkasdkjfasdfadsfj",
          "Height": 1221,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "dshfkjashdfjhasjldkf",
          "To": "ajfshkdjfhakjshdfljkhasdf",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "asfasghdsbjtbuyarbfhjszvj",
          "Height": 1222,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "ahskjhasjdfklhlasdf",
          "To": "jksdhflhasjkfhlaksdf",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "bbbjkbzxvjkhdjklahsdjklndafs",
          "Height": 1223,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "asjkdhfjklahasdasdasdassldfjasdf",
          "To": "kasdjhfkjhaskjdflas",
          "Status": 1,
          "CreatedAt": 1572935306
        }, {
          "Hash": "hkgbafsdbsjdfjkabsdhfasjdfbkadsfasdf",
          "Height": 1224,
          "Amount": "100",
          "Asset": "SAVE",
          "From": "sdlashdfkjhaljskdfhadf",
          "To": "kshdflkjhsljkfdasdf",
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
            "From": "fgasfkafs",
            "To": "ngksdjgbsjkbgbsakhd",
            "Amount": "100.0",
            "Asset": "SAVE"

          },
          {
            "From": "ghkgjfsdfg",
            "To": "kmfkg",
            "Amount": "0.01",
            "Asset": "ONI"
          },
          {
            "From": "jsdgkkhdkjfg",
            "To": "fbgaskjdgbadsag",
            "Amount": "0.01",
            "Asset": "SAVE"
          },
          {
            "From": "kjsadkgjnsdg",
            "To": "mkdsgkjsbgjksdfg",
            "Amount": "1000",
            "Asset": "SAVE"
          },
          {
            "From": "nadfghkjsdbfg",
            "To": "ndsbgkahbnngas",
            "Amount": "0.09",
            "Asset": "SAVE"
          },
          {
            "From": "m,agishdkfjgbdsng",
            "To": "kjfdhhkgjsfdgsdfg",
            "Amount": "0.01",
            "Asset": "SAVE"
          },
          {
            "From": ",msdkjhlksafsdf",
            "To": "kdsgkja",
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
          "Stake": "100.0",
          "lng": 10,
          "lat": 10
        }, {
          "Alias": "Memi",
          "Region": "China",
          "IP": "127.0.0.1",
          "ChannelCount": 20,
          "Stake": "100.0",
          "lng": 50,
          "lat": 50
        }, {
          "Alias": "Polter",
          "Region": "Japan",
          "IP": "127.0.0.1",
          "ChannelCount": 100,
          "Stake": "10000000.0",
          "lng": 10,
          "lat": 50
        }, {
          "Alias": "libis",
          "Region": "USA.",
          "IP": "127.0.0.1",
          "ChannelCount": 10,
          "Stake": "100.0",
          "lng": 15,
          "lat": 52
        }, ],
        "FS": [{
          "Alias": "Can123123se",
          "Region": "Canada112",
          "Storage": 1021231234,
          "ProfitFormat": "11232323.02",
          "Address": "dDSHSdHhgflLKnbCrijBckv",
          "lng": 120,
          "lat": 47
        }, {
          "Alias": "Canse",
          "Region": "Fsdfqw",
          "Storage": 1020000,
          "ProfitFormat": "1.02",
          "Address": "dDSHgHS1234dHhgflLKnbCrijBckv",
          "lng": 123,
          "lat": 20
        }, {
          "Alias": "Canse1234",
          "Region": "C23142134anada",
          "Storage": 10,
          "ProfitFormat": "12323.2302",
          "Address": "dDSH21352135gHSdHhgflLKnbCrijBckv",
          "lng": 116.43,
          "lat": 39.9
        }, {
          "Alias": "Can532se",
          "Region": "Cana235da",
          "Storage": 102412312,
          "ProfitFormat": "12321233.02",
          "Address": "dDSHgH123SdHhgflLKnbCrijBckv",
          "lng": 116.33,
          "lat": 39.98
        }, {
          "Alias": "Canse123",
          "Region": "Canada123",
          "Storage": 1023434,
          "ProfitFormat": "123.02",
          "Address": "dD",
          "lng": 116.44,
          "lat": 39.92
        }, {
          "Alias": "jsdge",
          "Region": "sdfh",
          "Storage": 25836823745,
          "ProfitFormat": "12323.35234523",
          "Address": "ffdasgahsdfasdfasd",
          "lng": 42,
          "lat": 67
        }, {
          "Alias": "tr",
          "Region": "asdf",
          "Storage": 0,
          "ProfitFormat": "0",
          "Address": "d",
          "lng": 42,
          "lat": 62
        }, {
          "Alias": "Ca",
          "Region": "f",
          "Storage": 8752435235,
          "ProfitFormat": "123.02",
          "Address": "dDSHgjsaf",
          "lng": 49,
          "lat": 66
        }, {
          "Alias": "bfhsa32",
          "Region": "bdakasfdjf",
          "Storage": 102576837254,
          "ProfitFormat": "12.02",
          "Address": "dDSwetq",
          "lng": 49,
          "lat": 33
        }, {
          "Alias": "dsakf",
          "Region": "isadh",
          "Storage": 100000,
          "ProfitFormat": "12.02",
          "Address": "dDSHgH",
          "lng": 49,
          "lat": 26
        }, {
          "Alias": "hsidagkf",
          "Region": "fakdf",
          "Storage": 102412124,
          "ProfitFormat": "12323.2",
          "Address": "gasdffasdwe",
          "lng": 45,
          "lat": 22
        }, {
          "Alias": "Case",
          "Region": "Ca",
          "Storage": 10,
          "ProfitFormat": "12302",
          "Address": "hgflLKnbCrijBckv",
          "lng": 49,
          "lat": 27.2
        }, {
          "Alias": "Cansasd",
          "Region": "Ca",
          "Storage": 104,
          "ProfitFormat": "1232.02",
          "Address": "dDSHgHSdH",
          "lng": 48,
          "lat": 27.2
        }, ]
      },
      "Version": "1.0.0"
    }
  }
}

export default new MockAPI();
