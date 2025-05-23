import { MantineProvider, Tabs, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import { FC, useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DivEffect } from './components/DivEffect/DivEffect';
import { GridExample } from './components/GridExample/GridExample';
import { JsonFileLanguageEditor } from './components/JsonFileLanguageEditor/JsonFileLanguageEditor';
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
      <Tabs defaultValue="jsonFileLanguageEditor">
        <Tabs.List>
          <Tabs.Tab value="jsonFileLanguageEditor">Json File Language</Tabs.Tab>
          <Tabs.Tab value="reactGrid">ReactGrid</Tabs.Tab>
          <Tabs.Tab value="grid">Grid</Tabs.Tab>
          <Tabs.Tab value="divEffect">Div Effect</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="jsonFileLanguageEditor">
          <JsonFileLanguageEditor />
        </Tabs.Panel>

        <Tabs.Panel value="reactGrid">
          <ReactGrid />
        </Tabs.Panel>

        <Tabs.Panel value="grid">
          <GridExample />
        </Tabs.Panel>

        <Tabs.Panel value="divEffect">
          <DivEffect />
        </Tabs.Panel>
      </Tabs>
      <Title>{width}</Title>
    </MantineProvider>
  );
};
