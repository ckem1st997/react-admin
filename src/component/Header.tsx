import React, { useContext, useEffect, useState } from 'react';
import {
  EuiAvatar,
  EuiBreadcrumb,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableMessage,
  EuiSelectableOption,
  EuiSelectableProps,
  EuiSelectableTemplateSitewide,
  EuiSpacer,
  EuiSwitch,
  EuiSwitchEvent,
  EuiText,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { Link } from 'react-router-dom';
import Search_Menu from './Search_Menu';
import { ThemeToggeContext } from '../default/Context';

export default () => {
  const [checked, setChecked] = useState(false);
  const { theme, setTheme } = useContext(ThemeToggeContext);

  // Sử dụng useEffect để theo dõi thay đổi trong location (URL)
  useEffect(() => {
    const color = checked ? 'light' : 'dark';
    setTheme(color);
    console.log(theme)
  }, [checked]);


  const onChange = (e: EuiSwitchEvent) => {
    setChecked(e.target.checked);
  };

  
  const renderLogo = () => (
    <EuiHeaderLogo
      iconType="logoElastic"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Go to home page"
    />
  );
  const search = (
    <EuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        compressed: true,
      }}
      popoverButton={
        <EuiHeaderSectionItemButton flush='left' aria-label="Sitewide search">
          <EuiIcon type="search" size="m" />
        </EuiHeaderSectionItemButton>
      }
      emptyMessage={
        <EuiSelectableMessage style={{ minHeight: 300 }}>
          Danh sách kết quả tìm kiếm...
          <Link to="/">Trang chủ</Link>
        </EuiSelectableMessage>
      }
    />
  );
  return (
    <EuiHeader>
      <EuiHeaderSection>
        <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderSpacesMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      {/* {renderBreadcrumbs()} */}
      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>
          <EuiSwitch
            label="Malware protection"
            checked={checked}
            onChange={(e) => onChange(e)}
          />
          {search}
          {/* <Search_Menu></Search_Menu> */}
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderUserMenu />
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderAppMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};
const HeaderUserMenu = () => {
  const headerUserPopoverId = useGeneratedHtmlId({
    prefix: 'headerUserPopover',
  });
  const [isOpen, setIsOpen] = useState(false);
  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerUserPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );
  return (
    <EuiPopover
      id={headerUserPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      <div style={{ width: 300 }}>
        <EuiFlexGroup gutterSize="m" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiAvatar name="John Username" size="xl" />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <p>John Username</p>
            </EuiText>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>Edit profile</EuiLink>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiLink>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};
const HeaderSpacesMenu = () => {
  const headerSpacesPopoverId = useGeneratedHtmlId({
    prefix: 'headerSpacesPopover',
  });
  const spacesValues: EuiSelectableOption[] = [
    {
      label: 'Sales team',
      prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
      checked: 'on',
    },
    {
      label: 'Engineering',
      prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
    },
    {
      label: 'Security',
      prepend: <EuiAvatar type="space" name="Security" size="s" />,
    },
    {
      label: 'Default',
      prepend: <EuiAvatar type="space" name="Default" size="s" />,
    },
  ];
  const additionalSpaces = [
    {
      label: 'Sales team 2',
      prepend: <EuiAvatar type="space" name="Sales Team 2" size="s" />,
    },
    {
      label: 'Engineering 2',
      prepend: <EuiAvatar type="space" name="Engineering 2" size="s" />,
    },
    {
      label: 'Security 2',
      prepend: <EuiAvatar type="space" name="Security 2" size="s" />,
    },
    {
      label: 'Default 2',
      prepend: <EuiAvatar type="space" name="Default 2" size="s" />,
    },
  ];
  const [spaces, setSpaces] = useState<EuiSelectableOption[]>(spacesValues);
  const [selectedSpace, setSelectedSpace] = useState(
    spaces.filter((option) => option.checked)[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const isListExtended = () => {
    return spaces.length > 4 ? true : false;
  };
  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const closePopover = () => {
    setIsOpen(false);
  };
  const onChange: EuiSelectableProps['onChange'] = (options) => {
    setSpaces(options);
    setSelectedSpace(options.filter((option) => option.checked)[0]);
    setIsOpen(false);
  };
  const addMoreSpaces = () => {
    setSpaces(spaces.concat(additionalSpaces));
  };
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerSpacesPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}
    >
      {selectedSpace.prepend}
    </EuiHeaderSectionItemButton>
  );
  return (
    <EuiPopover
      id={headerSpacesPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiSelectable
        {...({
          searchable: isListExtended(),
          searchProps: {
            placeholder: 'Find a space',
            compressed: true,
          },
        } as Partial<EuiSelectableProps>)}
        options={spaces}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 40,
          showIcons: false,
        }}
      >
        {(list, search) => (
          <>
            <EuiPopoverTitle paddingSize="s">
              {search || 'Your spaces'}
            </EuiPopoverTitle>
            {list}
            <EuiPopoverFooter paddingSize="s">
              <EuiButton
                size="s"
                fullWidth
                onClick={addMoreSpaces}
                disabled={isListExtended()}
              >
                Add more spaces
              </EuiButton>
            </EuiPopoverFooter>
          </>
        )}
      </EuiSelectable>
    </EuiPopover>
  );
};
const HeaderAppMenu = () => {
  const headerAppPopoverId = useGeneratedHtmlId({ prefix: 'headerAppPopover' });
  const headerAppKeyPadMenuId = useGeneratedHtmlId({
    prefix: 'headerAppKeyPadMenu',
  });
  const [isOpen, setIsOpen] = useState(false);
  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerAppKeyPadMenuId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Apps menu with 1 new app"
      notification="1"
      onClick={onMenuButtonClick}
    >
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );
  return (
    <EuiPopover
      id={headerAppPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
    >
      <EuiKeyPadMenu id={headerAppKeyPadMenuId} style={{ width: 288 }}>
        <EuiKeyPadMenuItem label="Discover">
          <EuiIcon type="discoverApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Dashboard">
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Dev Tools">
          <EuiIcon type="devToolsApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Machine Learning">
          <EuiIcon type="machineLearningApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Graph">
          <EuiIcon type="graphApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Visualize">
          <EuiIcon type="visualizeApp" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Timelion" betaBadgeLabel="Beta">
          <EuiIcon type="timelionApp" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </EuiPopover>
  );
};