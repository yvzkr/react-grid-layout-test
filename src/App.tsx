import { MantineProvider, Tabs, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import { FC, useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { GridExample } from './components/GridExample/GridExample';
import { ReactGrid } from './components/ReactGrid';

export const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function listener() {
      setWidth(ref.current.clientWidth);
    }
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => {
    setWidth(ref.current?.clientWidth);
  }, []);

  return (
    <MantineProvider withCssVariables>
      <Tabs defaultValue="reactGrid">
        <Tabs.List>
          <Tabs.Tab value="reactGrid">ReactGrid</Tabs.Tab>
          <Tabs.Tab value="grid">Grid</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="reactGrid">
          <ReactGrid />
        </Tabs.Panel>

        <Tabs.Panel value="grid">
          <GridExample />
        </Tabs.Panel>
      </Tabs>
      <Title>{width}</Title>
    </MantineProvider>
  );
};
