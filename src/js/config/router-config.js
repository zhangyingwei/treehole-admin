import VueRouter from 'vue-router';

const initRouter = () => {
    const routerParam = {
        mode: 'history',
        routes: [{
            path: '/vue/admin',
            name: 'home',
            component: (resolve) => require(['components/welcome/home'], resolve)
        }, {
            path: '/vue/admin/login',
            name: 'login',
            component: (resolve) => require(['components/login'], resolve)
        }, {
            path: '/vue/admin/form',
            name: 'form',
            component: (resolve) => require(['components/demo-modules/form'], resolve)
        }, {
            path: '/vue/admin/basic',
            name: 'basic',
            component: (resolve) => require(['components/treehole/basic'], resolve)
        }, {
            path: '/vue/admin/statistic',
            name: 'statistic',
            component: (resolve) => require(['components/treehole/statistic'], resolve)
        }, {
            path: '/vue/admin/settings',
            name: 'settings',
            component: (resolve) => require(['components/treehole/settings'], resolve)
        }, {
            path: '/vue/admin/article/new',
            name: 'new',
            component: (resolve) => require(['components/treehole/article/new'], resolve)
        }, {
            path: '/vue/admin/article/history',
            name: 'history',
            component: (resolve) => require(['components/treehole/article/history'], resolve)
        }, {
            path: '/vue/admin/article/commont',
            name: 'commont',
            component: (resolve) => require(['components/treehole/article/commont'], resolve)
        }, {
            path: '/vue/admin/article/kinds',
            name: 'kinds',
            component: (resolve) => require(['components/treehole/article/kinds'], resolve)
        }, {
            path: '/vue/admin/resources',
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
        var user = {}
        if (!user) {
            if (to.path === "/vue/admin/login") {
                next()
            } else {
                next('/vue/admin/login')
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