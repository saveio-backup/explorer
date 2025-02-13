import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    model: 'hash',
    scrollBehavior(to, from) {
        return {
            x: 0,
            y: 0
        }
    },
    routes: [{
            path: '/home',
            name: 'Home',
            component: resolve => require(['@/pages/Home.vue'], resolve)
        },
        {
            path: '/blocks',
            name: 'Blocks',
            component: resolve => require(['@/pages/Blocks.vue'], resolve),
            children: [{
                path: 'index',
                name: 'BlocksIndex',
                component: resolve => require(['@/pages/Blocks/Index.vue'], resolve)
            }, {
                path: 'detail',
                name: 'BlocksDetail',
                component: resolve => require(['@/pages/Blocks/Detail.vue'], resolve)
            }, {
                path: '',
                redirect: {
                    name: 'BlocksIndex'
                }
            }]
        },
        {
            path: '/transactions',
            name: 'Transaction',
            component: resolve => require(['@/pages/Transaction.vue'], resolve),
            children: [{
                path: 'index',
                name: 'TransactionIndex',
                component: resolve => require(['@/pages/Transaction/Index.vue'], resolve)
            }, {
                path: 'detail',
                name: 'TransactionDetail',
                component: resolve => require(['@/pages/Transaction/Detail.vue'], resolve)
            }, {
                path: '',
                redirect: {
                    name: 'TransactionIndex'
                }
            }]
        },
        {
            path: '/node',
            name: 'Node',
            component: resolve => require(['@/pages/Node.vue'], resolve)
        },
        {
            path: '/address',
            name: 'Address',
            component: resolve => require(['@/pages/Address.vue'], resolve)
        },
        {
            path: '/chartMore',
            name: 'ChartMore',
            component: resolve => require(['@/pages/ChartMore.vue'], resolve)
        },
        {
            path: '/chartDetail',
            name: 'ChartDetail',
            component: resolve => require(['@/pages/ChartDetail.vue'], resolve),
            children: [{
                path: 'addressposition',
                name: 'AddressPosition',
                component: resolve => require(['@/pages/ChartDetail/AddressPosition.vue'], resolve)
            }, {
                path: 'allNetProfit',
                name: 'AllNetProfit',
                component: resolve => require(['@/pages/ChartDetail/AllNetProfit.vue'], resolve)
            }, {
                path: 'channelNumber',
                name: 'ChannelNumber',
                component: resolve => require(['@/pages/ChartDetail/ChannelNumber.vue'], resolve)
            },{
                path: 'dayTransaction',
                name: 'DayTransaction',
                component: resolve => require(['@/pages/ChartDetail/DayTransaction.vue'], resolve)
            },{
                path: 'fileTotal',
                name: 'FileTotal',
                component: resolve => require(['@/pages/ChartDetail/FileTotal.vue'], resolve)
            },{
                path: 'storageSpace',
                name: 'StorageSpace',
                component: resolve => require(['@/pages/ChartDetail/StorageSpace.vue'], resolve)
            },{
                path: 'sumStake',
                name: 'SumStake',
                component: resolve => require(['@/pages/ChartDetail/SumStake.vue'], resolve)
            },{
                path: '',
                redirect: {
                    name: 'AllNetProfit'
                }
            }]
        },
        {
            path: '/noFind',
            name: 'NoFind',
            component: resolve => require(['@/pages/NoFind.vue'], resolve)
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '*',
            name: 'Page404',
            component: resolve => require(['@/pages/Page404.vue'], resolve)
        }
    ]
})