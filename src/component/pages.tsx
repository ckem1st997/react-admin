import React, { ReactElement } from 'react';
import {
  EuiText,
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiPageSidebarProps,
  EuiButton,
  EuiPageHeader,
} from '@elastic/eui';
import Breadcrumbs from './Breadcrumbs';
import EuiSideNav from './EuiSideNav';

export const Pages =({
  button =         <EuiButton
  fill
  onClick={() => {}}
>
  Filled
</EuiButton>,
  content = <></>,
  sidebar=<EuiSideNav></EuiSideNav>,
  header= <EuiPageHeader
  pageTitle="Page title"
  description="Example of a description."
  breadcrumbs={[
    {
      text: 'Breadcrumb 1',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: 'Breadcrumb 2',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: 'Current',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ]}
  rightSideItems={[
    <EuiButton fill>Add something</EuiButton>,
    <EuiButton>Do something</EuiButton>,
  ]}
  breadcrumbProps={<Breadcrumbs />}
/>,
  panelled,
  bottomBorder = true,
  sidebarSticky,
  offset,
  grow,
}: {
  button?: ReactElement;
  content?: ReactElement;
  sidebar?: ReactElement;
  header?: EuiPageHeaderProps;
  panelled?: EuiPageTemplateProps['panelled'];
  bottomBorder?: EuiPageTemplateProps['bottomBorder'];
  // For fullscreen only
  sidebarSticky?: EuiPageSidebarProps['sticky'];
  offset?: EuiPageTemplateProps['offset'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate
      panelled={panelled}
      bottomBorder={bottomBorder}
      grow={grow}
      offset={offset}
    >
      {sidebar && (
        <EuiPageTemplate.Sidebar sticky={sidebarSticky}>
          {sidebar}
        </EuiPageTemplate.Sidebar>
      )}
      {header && (
        <EuiPageTemplate.Header {...header} rightSideItems={[button]} />
      )}
      <EuiPageTemplate.Section grow={false} bottomBorder={bottomBorder}>
        <EuiText textAlign="center">
          <strong>
            Stack EuiPageTemplate sections and headers to create your custom
            content order.
          </strong>
        </EuiText>
      </EuiPageTemplate.Section>
      <EuiPageTemplate.Section>{content}</EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};