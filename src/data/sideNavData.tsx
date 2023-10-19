export const sideNavData = [
    {
      label: 'Quản lý 1',
      icontype: 'logoElasticsearch',
      items: [
        {
          label: 'Trang chủ',
          icontype: 'logoWorkplaceSearch',
          path: '/',
        },
        {
          label: 'Home 1',
          icontype: 'logoMaps',
          path: '/home1',
        },
        {
          label: 'Home2',
          icontype: 'logoMetrics',
          path: '/home2',
        },
      ],
    },
    {
      label: 'Quản lý 2',
      icontype: 'logoElasticStack',
      items: [
        {
          label: 'Grid',
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
      label: 'Blogs',
      icontype: 'logoAppSearch',
      path: '/blogs',
      items: [
        {
          label: '404 viewer',
          icontype: 'logoVulnerabilityManagement',
          path: '/432432432',
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
