const Ont = require('./lib/index');
const rpcClient = new Ont.RpcClient("http://10.0.1.201:20336");
rpcClient.getBlockHeight().then(res => {
  console.log(res);
})
