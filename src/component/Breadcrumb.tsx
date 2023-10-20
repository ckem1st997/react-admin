import React, { useEffect, useState } from 'react';
import {
    EuiBreadcrumb,
    EuiHeaderBreadcrumbs
} from '@elastic/eui';
import { Link, NavigateFunction, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { NavItem, sideNavData } from '../data/sideNavData';
import { SelectListItem } from '../model/model';
import { isNullOrEmpty } from '../hepler/StringHelper';
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

    //  const parentsList = findParentsByPath(sideNavData, currentPath);

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
        breadcrumbsData.push({
            text: "Trang chủ",
            onClick: (e) => {
                navigate("/");
            },
            className: 'customClass',
        })
        let crumbs = matches
            .filter((match: any) => Boolean(match.handle?.crumb))
            .map((match: any) => match.handle.crumb(match.data));
        let url = "";
        for (let index = 0; index < crumbs.length; index++) {
            const element: SelectListItem = crumbs[index];
            console.log(element)
            if (element && !isNullOrEmpty(element.Text) && element.Value !=='/') {
                url = url + element.Value;
                if (index !== crumbs.length - 1) {
                    breadcrumbsData.push({
                        text: element.Text,
                        onClick: (e) => {
                            navigate(url);
                        },
                        className: 'customClass',
                    })
                }
                else
                    breadcrumbsData.push({
                        text: element.Text,
                        className: 'customClass',
                    })
            }

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
