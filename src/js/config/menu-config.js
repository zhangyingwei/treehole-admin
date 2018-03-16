const menuConfig = [{
        title: '首页',
        key: 'home',
        icon: 'h-icon-home'
    },
    {
        title: '博客管理',
        icon: 'h-icon-menu',
        key: 'blog',
        children: [{
                title: '基础信息',
                icon: 'h-icon-message',
                key: 'basic'
            },
            {
                title: '统计信息',
                icon: 'h-icon-complete',
                key: 'statistic'
            },
            {
                title: '系统设置',
                icon: 'h-icon-setting',
                key: 'settings'
            }
        ]
    },
    {
        title: '文章管理',
        icon: 'h-icon-calendar',
        key: 'article',
        children: [{
                title: '新建发布',
                icon: 'h-icon-edit',
                key: 'new'
            },
            {
                title: '历史管理',
                icon: 'h-icon-link',
                key: 'history'
            },
            {
                title: '评论管理',
                icon: 'h-icon-message',
                key: 'commont'
            },
            {
                title: '分类管理',
                icon: 'h-icon-star-on',
                key: 'kinds'
            }
        ]
    },
    {
        title: '素材管理',
        icon: 'h-icon-star-on',
        key: 'resources',
    },
    // {
    //     title: '示例',
    //     icon: 'h-icon-star-on',
    //     children: [{
    //         title: '表单',
    //         icon: 'h-icon-search',
    //         key: 'form'
    //     }]
    // }
];

export default menuConfig;