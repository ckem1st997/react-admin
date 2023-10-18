import { slugify, EuiErrorBoundary } from '@elastic/eui';
import React, { createElement, Fragment } from 'react';
import { JSX } from 'react/jsx-runtime';

// import { slugify } from '../../src/services';


// Guidelines


const createExample = (example: any, customTitle: any) => {
  if (!example) {
    throw new Error(
      'One of your example pages is undefined. This usually happens when you export or import it with the wrong name.'
    );
  }

  const {
    title,
    sections,
    isBeta,
    isNew,
    isDeprecated,
    playground,
    guidelines,
    ...rest
  } = example;
  const filteredSections = sections.filter((section: undefined) => section !== undefined);

  filteredSections.forEach((section: { id: string | undefined; title: string; }) => {
    section.id = section.title ? slugify(section.title) : undefined;
  });

  const renderedSections = filteredSections.map((section: any, index: any) =>
    createElement(GuideSection, {
      // Using index as the key because not all require a `title`
      key: index,
      ...section,
    })
  );

  let playgroundComponent: JSX.Element[];
  if (playground) {
    if (Array.isArray(playground)) {
      playgroundComponent = playground.map((elm, idx) => {
        return <Fragment key={idx}>{playgroundCreator(elm())}</Fragment>;
      });
    } else playgroundComponent = playgroundCreator(playground());
  }

  const component = () => (
    <EuiErrorBoundary>
      <GuideTabbedPage
        title={title}
        isBeta={isBeta}
        isNew={isNew}
        isDeprecated={isDeprecated}
        playground={playgroundComponent}
        guidelines={guidelines}
        {...rest}
      >
        {renderedSections}
      </GuideTabbedPage>
    </EuiErrorBoundary>
  );

  return {
    name: customTitle || title,
    component,
    sections: filteredSections,
    isBeta,
    isNew,
    isDeprecated,
    hasGuidelines: typeof guidelines !== 'undefined',
  };
};

const createTabbedPage = ({
  title,
  pages,
  isBeta,
  isNew,
  isDeprecated,
  ...rest
}) => {
  const component = () => (
    <GuideTabbedPage title={title} pages={pages} {...rest} />
  );

  const pagesSections = pages.map((page: { title: string; }, index: string | number) => {
    return {
      id: slugify(page.title),
      title: page.title,
      sections: pages[index].sections,
    };
  });

  return {
    name: title,
    component,
    sections: pagesSections,
    isBeta,
    isNew,
    isDeprecated,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createMarkdownExample = (file: { default: string; }, name: any, intro: any) => {
  const headings = file.default.match(/^(##) (.*)/gm);

  const sections = headings.map((heading: string) => {
    const title = heading.replace('## ', '');

    return { id: slugify(title), title: title };
  });

  return {
    name,
    component: () => (
      <GuideTabbedPage title={name}>
        <GuideMarkdownFormat grow={false}>{file.default}</GuideMarkdownFormat>
      </GuideTabbedPage>
    ),
    sections: sections,
  };
};

const navigation = [
  {
    name: 'Layout',
    items: [

    ].map((example) => createExample(example)),
  },
  {
    name: 'Navigation',
    items: [
     
    ].map((example) => createExample(example)),
  },
  {
    name: 'Display',
    items: [
      
    ].map((example) => createExample(example)),
  },
  {
    name: 'Forms',
    items: [
      
    ].map((example) => createExample(example)),
  },
  {
    name: 'Tabular content',
    items: [
    
    ].map((example) => createExample(example)),
  },
  {
    name: 'Editors & syntax',
    items: [
     
    ].map((example) => createExample(example)),
  },
  {
    name: 'Elastic Charts',
    items: [
     
    ].map((example) => createExample(example)),
  },
].map(({ name, items, ...rest }) => ({
  name,
  type: slugify(name),
  items: items.map(
    ({ name: itemName, hasGuidelines, isTabbedPage, sections, ...rest }) => {
      const item = {
        name: itemName,
        path: `${slugify(name)}/${slugify(itemName)}`,
        sections,
        ...rest,
      };

      if (hasGuidelines) {
        item.from = `guidelines/${slugify(itemName)}`;
        item.to = `${slugify(name)}/${slugify(itemName)}/guidelines`;
      }

      return item;
    }
  ),
  ...rest,
}));

const allRoutes = navigation.reduce((accummulatedRoutes, section) => {
  accummulatedRoutes.push(...section.items);
  return accummulatedRoutes;
}, []);

export default {
  navigation,

  getAppRoutes: function getAppRoutes() {
    return allRoutes;
  },
};
