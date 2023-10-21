import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { EuiFieldSearch, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiSearchBar, EuiSelectableMessage, EuiSelectableTemplateSitewide, EuiSideNav, htmlIdGenerator, slugify } from '@elastic/eui';
import { Link, redirect, useNavigate, useNavigation, useNavigationType } from 'react-router-dom';
import { sideNavData } from '../data/sideNavData';
import { createItemMenu } from '../hepler/Helper';
import { isNullOrEmpty } from '../hepler/StringHelper';
import { recursiveSearch } from '../hepler/FunctionHelper';






export default () => {
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [sideNavs, setSideNavs] = useState<any[]>([]);
  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };
  const sideNav = sideNavData.map((itemData) => createItemMenu(itemData.label, itemData, navigate));
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


