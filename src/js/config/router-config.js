import VueRouter from 'vue-router';

const initRouter = () => {
    const routerParam = {
        mode: 'history',
        routes: [{
            path: '/',
            name: 'home',
            component: (resolve) => require(['components/welcome/home'], resolve)
        }, {
            path: '/login',
            name: 'login',
            component: (resolve) => require(['components/login'], resolve)
        }, {
            path: '/form',
            name: 'form',
            component: (resolve) => require(['components/demo-modules/form'], resolve)
        }, {
            path: '/basic',
            name: 'basic',
            component: (resolve) => require(['components/treehole/basic'], resolve)
        }, {
            path: '/statistic',
            name: 'statistic',
            component: (resolve) => require(['components/treehole/statistic'], resolve)
        }, {
            path: '/settings',
            name: 'settings',
            component: (resolve) => require(['components/treehole/settings'], resolve)
        }, {
            path: '/article/new',
            name: 'new',
            component: (resolve) => require(['components/treehole/article/new'], resolve)
        }, {
            path: '/article/history',
            name: 'history',
            component: (resolve) => require(['components/treehole/article/history'], resolve)
        }, {
            path: '/article/commont',
            name: 'commont',
            component: (resolve) => require(['components/treehole/article/commont'], resolve)
        }, {
            path: '/article/kinds',
            name: 'kinds',
            component: (resolve) => require(['components/treehole/article/kinds'], resolve)
        }, {
            path: '/resources',
            name: 'resources',
            component: (resolve) => require(['components/treehole/resources/resources'], resolve)
        }]
    };

    let router = new VueRouter(routerParam);

    router.beforeEach((to, from, next) => {
        HeyUI.$LoadingBar.start();
        // if (titleConfig[to.name]) {
        //   document.title = titleConfig[to.name] + ' - 应用';
        // } else {
        // document.title = '管理系统';
        // }
        console.log(to.path)
        var user = null
        if (!user) {
            if (to.path==="/login") {
                next()
            }else{
                next('/login')
            }
        }
        next();
    })
    router.afterEach(() => {
        HeyUI.$LoadingBar.success();
        // Vue.nextTick(() => {
        //   $('.app-body').scrollTop(0);
        // });
    });
    return router;
}

export default initRouter;