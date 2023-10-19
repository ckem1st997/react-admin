import React, { useState } from 'react';
import { EuiIcon, EuiSideNav, htmlIdGenerator, slugify } from '@elastic/eui';
import { Link, redirect, useNavigate, useNavigation, useNavigationType } from 'react-router-dom';
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
      ...data,
    };
  };

  const sideNav = [
    createItem('Trang chủ', {
      onClick: () => { navigate("/") },
      icon: <EuiIcon type="logoElasticsearch" />,
      items: [
        createItem('Home 1', {
          onClick: () => { navigate("/home1") },
          icon: <EuiIcon type="logoElasticsearch" />,
          items: [
            createItem('Data sources1'),
          ],
        }),
        createItem('Home2', {
          onClick: null,
          icon: <EuiIcon type="logoElasticsearch" />,
          items: [
            createItem('Data sources'),
          ],
        }),
      ],
    }),
    createItem('Kibana', {
      onClick: undefined,
      icon: <EuiIcon type="logoKibana" />,
      items: [
        createItem('Advanced settings', {
          items: [
            createItem('General', { disabled: true }),
            createItem('Timelion', {
              items: [
                createItem('Time stuff', {
                  icon: <EuiIcon type="clock" />,
                }),
                createItem('Lion stuff', {
                  icon: <EuiIcon type="stats" />,
                }),
              ],
            }),
            createItem('Visualizations'),
          ],
        }),
        createItem('Index Patterns'),
        createItem('Saved Objects'),
        createItem('Reporting'),
      ],
    }),
    createItem('Logstash-Grid', {
      onClick: () => { navigate("/grid") },
      icon: <EuiIcon type="logoLogstash" />,
      items: [createItem('Pipeline viewer')],
    }),
    createItem('Blogs', {
      onClick: () => { navigate("/blogs") },
      icon: <EuiIcon type="logoLogstash" />,
      items: [createItem('Pipeline viewer')],
    }),
  ];
  return (
    <EuiSideNav
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192 }}
    />
  );
};