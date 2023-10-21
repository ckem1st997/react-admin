import React, { useEffect, useState } from 'react';
import {
    EuiBreadcrumb,
    EuiButton,
    EuiButtonEmpty,
    EuiHeaderBreadcrumbs,
    EuiHeaderLink,
    EuiIcon
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
    const [isLoadingButon, setisLoadingButon] = useState(true);
    useEffect(() => {
        //  setisLoadingButon(false);
    }, [location.pathname]);

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
            if (element && !isNullOrEmpty(element.Text) && element.Value !== '/') {
                url = url + element.Value;
                if (index !== crumbs.length - 1) {
                    if (!element.Disabled)
                        breadcrumbsData.push({
                            text: element.Text,
                            onClick: (e) => {
                                navigate(url);
                            },
                            className: 'customClass',
                        })
                    else
                        breadcrumbsData.push({
                            text: element.Text,
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
            {/* <EuiButton iconType="home" color="primary" size='s' fill onClick={() => navigate("/")}>
                Home
            </EuiButton>, */}
            <EuiButtonEmpty iconType="arrowLeft" flush="both" onClick={() => navigate(-1)}>
                Quay lại
            </EuiButtonEmpty>
        </>
    );
};
