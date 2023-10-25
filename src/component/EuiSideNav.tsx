import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { EuiFieldSearch, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiSearchBar, EuiSelectableMessage, EuiSelectableTemplateSitewide, EuiSideNav, htmlIdGenerator, slugify } from '@elastic/eui';
import { Link, redirect, useNavigate, useNavigation, useNavigationType } from 'react-router-dom';
import { sideNavData } from '../data/sideNavData';
import { isNullOrEmpty } from '../hepler/StringHelper';
import { recursiveSearch } from '../hepler/FunctionHelper';





export default () => {


  
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [sideNavs, setSideNavs] = useState<any[]>([]);
  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };
  const sideNav = sideNavData.map((itemData) => createItemMenu(itemData.label, itemData));
  useEffect(() => {
    setSideNavs(sideNav)
  }, []);

  function searchDataSide(q: string) {
    if (isNullOrEmpty(q))
      return setSideNavs(sideNav);
    return setSideNavs(recursiveSearch(sideNav,q));
  };
  const searchModel = (
    <EuiFieldSearch
      placeholder="Search this"
      // value={value}
      onChange={(e: any) => searchDataSide(e.target.value)}
      // isClearable={isClearable}
      aria-label="Use aria labels when no actual label is in use"
    />
  );
  const search =
    <EuiHeaderSectionItem>
      {searchModel}
    </EuiHeaderSectionItem>


function createItemMenu(label: string, options: any) {
  const item = {
      id: slugify(label),
      name: label,
      onClick: options.onClick,
      ...options
  };
  if (options) {
      if (options.icontype) {
          item.icon = <EuiIcon type={options.icontype} />;
      }

      if (options.path) {
          item.onClick = () => {
              navigate(options.path);
          };
      }

      if (options.items) {
          item.items = options.items.map((subItem: any) => createItemMenu(subItem.label, subItem));
      }
  }


  return item;
}


  return (
    <EuiSideNav
      heading={search}
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNavs}
    // style={{ width: 192 }}
    />
  );
};


