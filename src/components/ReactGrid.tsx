import { faEllipsisVertical, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Button, Group, Menu, Stack, Text } from '@mantine/core';
import '@mantine/core/styles.css';
import React, { FC, useMemo } from 'react';
import GridLayout, { Layout, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import classes from '../App.module.scss';

const ResizeHandler = React.forwardRef<HTMLButtonElement, { handleAxis?: string }>(({ handleAxis, ...props }, ref) => {
  return (
    <ActionIcon
      ref={ref}
      className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
      variant="outline"
      color="gray"
      {...props}
    >
      <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
    </ActionIcon>
  );
});

const data: any[] = [
  {
    id: 'a',
    layout: { x: 0, y: 0, w: 3, h: 2 },
  },
  {
    id: 'b',
    layout: { x: 6, y: 0, w: 3, h: 2 },
  },
  {
    id: 'c',
    layout: { x: 9, y: 0, w: 3, h: 2 },
  },
  {
    id: 'd',
    layout: { x: 0, y: 1, w: 3, h: 2 },
  },
  {
    id: 'e',
    layout: { x: 0, y: 1, w: 3, h: 2 },
  },
  {
    id: 'f',
    layout: { x: 3, y: 1, w: 9, h: 2 },
  },
  {
    id: 'g',
    layout: { x: 0, y: 4, w: 4, h: 2 },
  },
  {
    id: 'h',
    layout: { x: 4, y: 4, w: 8, h: 2 },
  },
];

// At the top of the file, create the width-aware grid layout component
const ResponsiveGridLayout = WidthProvider(GridLayout) as unknown as React.ComponentClass<
  GridLayout.ReactGridLayoutProps & { measureBeforeMount?: boolean }
>;

export const ReactGrid: FC = () => {
  const handleLayoutChange = (layout: Layout[]) => {
    console.log(layout);
  };

  const gridItems = useMemo(
    () =>
      data.map((item) => (
        <Stack key={item.id} data-grid={{ ...item.layout, minW: 3, minH: 2 }} className={classes.gridItem}>
          <Group justify="flex-end">
            <Menu position="bottom-end">
              <Menu.Target>
                <ActionIcon className="not-draggable" variant="outline">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Button variant="outline">Item 1</Button>
                <Button variant="outline">Item 2</Button>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Stack className={classes.gridItemContent}>
            <Text fz={36} tt="uppercase">
              {item.id}
            </Text>
          </Stack>
        </Stack>
      )),
    [],
  );

  return (
    <div className={classes.gridLayout}>
      <ResponsiveGridLayout
        className="layout"
        cols={12}
        rowHeight={215}
        margin={[30, 30]}
        resizeHandle={<ResizeHandler />}
        onLayoutChange={handleLayoutChange}
        draggableCancel=".not-draggable"
      >
        {gridItems}
      </ResponsiveGridLayout>
    </div>
  );
};
