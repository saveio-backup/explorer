import Mock from 'mockjs'

import mockAPI from './mockAPI'

Mock.mock(/\/count\/stat/, 'get', mockAPI.getcountstat);
Mock.mock(/\/storage\/stat/, 'get', mockAPI.getstoragestat);
Mock.mock(/\/profit\/stat/, 'get', mockAPI.getprofitstat);
Mock.mock(/\/file\/stat/, 'get', mockAPI.getfilestat);
Mock.mock(/\/channel\/stat/, 'get', mockAPI.getchannelstat);
Mock.mock(/\/transaction\/stat/, 'get', mockAPI.gettransactionstat);
Mock.mock(/\/stake\/stat/, 'get', mockAPI.getstakestat);
Mock.mock(/\/address\/stat/, 'get', mockAPI.getaddressstat);
Mock.mock(/\/blocks/, 'get', mockAPI.getblocks);
Mock.mock(/\/blockbyheight/, 'get', mockAPI.getblockbyheight);
Mock.mock(/\/blockbyhash/, 'get', mockAPI.getblockbyhash);
Mock.mock(/\/txbyaddr/, 'get', mockAPI.gettxbyaddr);
Mock.mock(/\/transactions/, 'get', mockAPI.gettransactions);
Mock.mock(/\/transactionbyhash/, 'get', mockAPI.gettransactionbyhash);
Mock.mock(/\/nodes/, 'get', mockAPI.getnodes);

