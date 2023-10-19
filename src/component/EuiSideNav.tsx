import React, { useState } from 'react';
import { EuiIcon, EuiSideNav, htmlIdGenerator, slugify } from '@elastic/eui';
import { Link, redirect, useNavigate, useNavigation, useNavigationType } from 'react-router-dom';
import { sideNavData } from '../data/sideNavData';
import { createItemMenu } from '../hepler/Helper';
export default () => {
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');
  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };
  const selectItem = (name: any) => {
    setSelectedItem(name);
  };
  const createItem = (name: string, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data
    };
  };

  // const dataNav = [
  //   createItem('Quản lý 1', {
  //     onClick: undefined,
  //     icon: <EuiIcon type="logoElasticsearch" />,
  //     items: [
  //       createItem('Trang chủ', {
  //         onClick: () => { navigate("/") },
  //         icon: <EuiIcon type="logoWorkplaceSearch" />
  //       }),
  //       createItem('Home 1', {
  //         onClick: () => { navigate("/home1") },
  //         icon: <EuiIcon type="logoMaps" />
  //       }),
  //       createItem('Home2', {
  //         onClick: () => { navigate("/home2") },
  //         icon: <EuiIcon type="logoMetrics" />
  //       }),
  //     ],
  //   }),
  //   createItem('Quản lý 2', {
  //     onClick: undefined,
  //     icon: <EuiIcon type="logoElasticStack" />,
  //     items: [
  //       createItem('Grid', {
  //         onClick: () => { navigate("/Grid") },
  //         icon: <EuiIcon type="logoObservability" />
  //       }),
  //       createItem('404', {
  //       onClick: () => { navigate("/home2312312") },
  //       icon: <EuiIcon type="logoObservability" />
  //     })
  //   ],
  //   }),
  //   createItem('Blogs', {
  //     onClick: () => { navigate("/blogs") },
  //     icon: <EuiIcon type="logoAppSearch" />,
  //     items: [createItem('404 viewer', {
  //       onClick: () => { navigate("/432432432") },
  //       icon: <EuiIcon type="logoVulnerabilityManagement" />
  //     })],
  //   }),
  //   createItem('Kibana', {
  //     onClick: undefined,
  //     icon: <EuiIcon type="logoKibana" />,
  //     items: [
  //       createItem('Advanced settings', {
  //         items: [
  //           createItem('General', { disabled: true }),
  //           createItem('Timelion', {
  //             items: [
  //               createItem('Time stuff', {
  //                 icon: <EuiIcon type="clock" />,
  //               }),
  //               createItem('Lion stuff', {
  //                 icon: <EuiIcon type="stats" />,
  //               }),
  //             ],
  //           }),
  //           createItem('Visualizations'),
  //         ],
  //       }),
  //       createItem('Index Patterns'),
  //       createItem('Saved Objects'),
  //       createItem('Reporting'),
  //     ],
  //   }),
  // ];






  const sideNav = sideNavData.map((itemData) => createItemMenu(itemData.label, itemData, navigate));

  return (
    <EuiSideNav
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      // style={{ width: 192 }}
    />
  );
};


