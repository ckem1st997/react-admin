export interface NavItem {
    label: string;
    icontype?: string;
    path?: string;
    items?: NavItem[]; // Dùng đệ quy cho thằng cha có items
    disabled?: boolean;
};
export const sideNavData: NavItem[] = [
    {
        label: 'Trang chủ',
        icontype: 'logoElasticsearch',
        path: '/'
    },
    {
        label: 'Quản lý vật tư',
        icontype: 'logoElasticsearch',
        items: [
            {
                label: 'Danh sách vật tư',
                icontype: 'logoMaps',
                path: 'unit/grid',
            },
            {
                label: 'Emty Pages',
                icontype: 'logoMaps',
                path: 'unit/home',
            },
        ],
    },
    {
        label: 'Quản lý kho',
        icontype: 'logoElasticStack',
        items: [
            {
                label: 'Danh sách kho',
                icontype: 'logoObservability',
                path: '/Grid',
            },
            {
                label: '404',
                icontype: 'logoObservability',
                path: '/home2312312',
            },
        ],
    },
    {
        label: 'Login',
        icontype: 'logoAppSearch',
     //   path: '/blogs',
        items: [
            {
                label: 'Login',
                icontype: 'logoVulnerabilityManagement',
                path: '/auth/login',
            },
        ],
    },
    {
        label: 'Kibana',
        icontype: 'logoKibana',
        items: [
            {
                label: 'Advanced settings',
                items: [
                    {
                        label: 'General',
                        disabled: true,
                    },
                    {
                        label: 'Timelion',
                        items: [
                            {
                                label: 'Time stuff',
                                icontype: 'clock',
                            },
                            {
                                label: 'Lion stuff',
                                icontype: 'stats',
                            },
                        ],
                    },
                    {
                        label: 'Visualizations',
                    },
                ],
            },
            {
                label: 'Index Patterns',
            },
            {
                label: 'Saved Objects',
            },
            {
                label: 'Reporting',
            },
        ],
    },
];
