import React, { useState } from 'react';
import {
    EuiBreadcrumb,
    EuiHeaderBreadcrumbs
} from '@elastic/eui';
import { Link, NavigateFunction, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { NavItem, sideNavData } from '../data/sideNavData';
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
    function generateBreadcrumbs1(navData: NavItem[], path: string, navigate: NavigateFunction) {
        const pathParts = path.split('/').filter(part => part !== '');
        const breadcrumbs: EuiBreadcrumb[] = [];

        let currentPath = '';

        pathParts.forEach((part, index) => {
            currentPath += '/' + part;
            const matchingItem = navData.find(item => item.path === currentPath);

            if (matchingItem) {
                const breadcrumb: EuiBreadcrumb = {
                    text: matchingItem.label,
                    className: 'customClass',
                };

                if (index === 0) {
                    breadcrumb.onClick = () => {
                        navigate('/');
                    };
                } else if (!matchingItem.items) {
                    breadcrumb.onClick = () => {
                        navigate(currentPath);
                    };
                }

                breadcrumbs.push(breadcrumb);
            }
        });

        return breadcrumbs;
    }
    //

    function findParentsByPath(navData: NavItem[], path: string) {
        const parents: NavItem[] = [];
        const findParents = (data: NavItem[], currentPath: string) => {
            for (const item of data) {
                if (item.path === currentPath) {
                    return true;
                }
                if (item.items) {
                    if (findParents(item.items, currentPath)) {
                        parents.push(item);
                        return true;
                    }
                }
            }
            return false;
        };

        for (const item of navData) {
            if (findParents([item], path)) {
                break;
            }
        }

        return parents;
    }

    //

    const pathToFind = '/home/home1'; // Thay đổi path cần tìm ở đây
    const parentsList = findParentsByPath(sideNavData, currentPath);
    console.log('Parents:', parentsList);






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

    function Breadcrumbs() {
        let matches = useMatches();
        const breadcrumbsData: EuiBreadcrumb[] = [];
        console.log(matches)
        let crumbs = matches
            .filter((match: any) => Boolean(match.handle?.crumb))
            .map((match: any) => match.handle.crumb(match.data));
        let url = "";
        for (let index = 0; index < crumbs.length; index++) {
            const element = crumbs[index];
            url = url + element;
            if (index !== crumbs.length - 1) {
                breadcrumbsData.push({
                    text: url,
                    onClick: (e) => {
                        navigate(url);
                    },
                    className: 'customClass',
                })
            }
            else
                breadcrumbsData.push({
                    text: url,
                    className: 'customClass',
                })
        }
        return breadcrumbsData;
    }

    return (
        <>
            {/* {renderBreadcrumbs()} */}
            <EuiHeaderBreadcrumbs
                aria-label="Header breadcrumbs example"
                breadcrumbs={Breadcrumbs()}
            />
        </>
    );
};
