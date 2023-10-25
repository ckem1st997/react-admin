import React, { useState } from 'react';
import {
    EuiButton,
    EuiContextMenu,
    EuiFormRow,
    EuiIcon,
    EuiPopover,
    EuiSwitch,
    EuiSpacer,
    useGeneratedHtmlId,
    EuiContextMenuPanelDescriptor,
    EuiKeyPadMenu,
    EuiKeyPadMenuItem,
    EuiEmptyPrompt,
    EuiLink,
    EuiTitle,
} from '@elastic/eui';
import { NavItem, sideNavData } from '../data/sideNavData';
import { useNavigate } from 'react-router-dom';
export default () => {
    const navigate = useNavigate();
    const [isPopoverOpen, setPopover] = useState(false);
    const embeddedCodeSwitchId__1 = useGeneratedHtmlId({
        prefix: 'embeddedCodeSwitch',
        suffix: 'first',
    });
    const embeddedCodeSwitchId__2 = useGeneratedHtmlId({
        prefix: 'embeddedCodeSwitch',
        suffix: 'second',
    });
    const contextMenuPopoverId = useGeneratedHtmlId({
        prefix: 'contextMenuPopover',
    });
    const onButtonClick = () => {
        setPopover(!isPopoverOpen);
    };
    const closePopover = () => {
        setPopover(false);
    };


    const panels: EuiContextMenuPanelDescriptor[] = [
        {
            id: 0,
            title: 'Danh sách trang',
            items: [
                {
                    name: 'Quản lý kho',
                    icon: 'search',                   
                    onClick: () => {
                        navigate("/")
                    },
                },
                {
                    name: 'Quản lý tồn',
                    icon: 'user',
                  // href: 'http://elastic.co',
                    target: '_blank',
                    panel: 1
                },
                {
                    name: 'Quản lý vật tư',
                    icon: 'color',
                    onClick: () => {
                        navigate("/grid")
                    },
                }
            ],
        },
        {
            id: 1,
            initialFocusedItemIndex: 1,
            title: 'Danh sách',
            items: [
                {
                    name: 'PDF reports',
                    icon: 'user',
                    onClick: () => {
                        navigate("/unit/grid")
                    },
                },
                {
                    name: 'Embed code',
                    icon: 'user',
                   // panel: 2,
                },
            ]
        }

    ];
    const menuItems = [
        { label: 'Quản lý kho', iconType: 'indexManagementApp', onClick: onButtonClick },
        { label: 'Quản lý vật tư', iconType: 'cloudSunny' },
        { label: 'Báo cáo', iconType: 'reporter', onClick: onButtonClick },
    ];
    return (
        <>
            <EuiPopover
                id={contextMenuPopoverId}

                isOpen={isPopoverOpen}
                closePopover={closePopover}
                panelPaddingSize="s"
                // anchorPosition="upRight"
                title='Quản lý'
            >

                <EuiContextMenu initialPanelId={0} panels={panels} />
            </EuiPopover>
            <nav aria-label="Nav title" className='header-fix'>
                <EuiKeyPadMenu>
                    {menuItems.map((menuItem, index) => (
                        <EuiKeyPadMenuItem key={index} onClick={menuItem.onClick} label={menuItem.label}>
                            <EuiIcon type={menuItem.iconType} size="l" />
                        </EuiKeyPadMenuItem>
                    ))}
                </EuiKeyPadMenu>
            </nav>

            {/* <EuiSpacer size="s" /> */}
            {/* <p>llll</p> */}
        </>

    );
};