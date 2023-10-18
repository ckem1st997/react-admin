import React, { useState } from 'react';
import {
    EuiBreadcrumb,
    EuiHeaderBreadcrumbs
} from '@elastic/eui';
import { Link } from 'react-router-dom';
export default () => {

    const renderBreadcrumbs = () => {
        const breadcrumbs: EuiBreadcrumb[] = [
            {
                text: 'Management',
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                },
                'data-test-subj': 'breadcrumbsAnimals',
                className: 'customClass',
            },
            {
                text: 'Truncation test is here for a really long item',
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                },
            },
            {
                text: 'Hidden',
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                },
            },
            {
                text: 'Users',
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                },
            },
            {
                text: 'Create',
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
