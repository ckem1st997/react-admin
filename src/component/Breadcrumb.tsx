import React, { useState } from 'react';
import {
    EuiBreadcrumb,
    EuiHeaderBreadcrumbs
} from '@elastic/eui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default () => {
    const navigate = useNavigate();

    //
    const location = useLocation();
    const currentPath = location.pathname;
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

            // Điều hướng đến đường dẫn tương ứng khi click vào breadcrumb
            if (index === 0) {
                breadcrumb.onClick = () => {
                    navigate('/');
                };
                breadcrumbs.push({
                    text: part,
                    onClick: (e) => {
                        navigate("/");
                    },
                    className: 'customClass',
                })
            } else {
                breadcrumb.onClick = () => {
                    navigate(currentPath);
                };
                breadcrumbs.push({
                    text: part,
                    onClick: (e) => {
                        navigate(currentPath);
                    },
                    className: 'customClass',
                })
            }

          //  breadcrumbs.push(breadcrumb);
        });

        return breadcrumbs;
    }

console.log(generateBreadcrumbs(currentPath))
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
            {renderBreadcrumbs()}
        </>
    );
};
