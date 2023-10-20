import React, { useState } from 'react';
import {
    EuiBreadcrumb,
    EuiHeaderBreadcrumbs
} from '@elastic/eui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sideNavData } from '../data/sideNavData';
export default () => {
    const navigate = useNavigate();

    //
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(location)
    // Tạo một hàm để chuyển đổi currentPath thành breadcrumbs
    function generateBreadcrumbs(path: string) {
        const pathParts = path.split('/').filter(part => part !== '');
        const breadcrumbs: EuiBreadcrumb[] = [];
      
        let currentPath = '';
      
        pathParts.forEach((part, index) => {
          currentPath += '/' + part;
          const breadcrumb: EuiBreadcrumb = {
            text: part,
            className: 'customClass',
          };
          
          if (index === 0) {
            breadcrumb.onClick = () => {
              navigate('/');
            };
          } else {
            breadcrumb.onClick = () => {
              navigate(currentPath);
            };
          }
      
          breadcrumbs.push(breadcrumb);
      
          // Bỏ sự kiện onClick và sử dụng label thay vì text cho các đối tượng con cuối cùng
          if (index === pathParts.length - 1) {
            breadcrumbs[breadcrumbs.length - 1].onClick = undefined;
            breadcrumbs[breadcrumbs.length - 1].text = pathParts[pathParts.length - 1];
          }
        });
      
        return breadcrumbs;
      }
      

    //

    const renderBreadcrumbs = () => {
        const breadcrumbs: EuiBreadcrumb[] = [
            {
                text: 'Quản lý 1',
                onClick: (e) => {
                    navigate("/");
                },
                className: 'customClass',
            },
            {
                text: 'Home 1',
                className: 'customClass',
            },
        ];
        return (
            <EuiHeaderBreadcrumbs
                aria-label="Header breadcrumbs example"
                breadcrumbs={breadcrumbs}
            />
        );
    };
    return (
        <>
            {/* {renderBreadcrumbs()} */}
                <EuiHeaderBreadcrumbs
                aria-label="Header breadcrumbs example"
                breadcrumbs={generateBreadcrumbs(currentPath)}
            />
        </>
    );
};
