import { Grid } from '@mantine/core';
import { FC } from 'react';
import classes from './GridExample.module.scss';

export const GridExample: FC = () => {
  return (
    <Grid className={classes.grid} mt={300}>
      <Grid.Col span="content" className={classes.gridItemFitContent}>
        fit content
      </Grid.Col>
      <Grid.Col span={9} className={classes.gridItem}>
        2
      </Grid.Col>
    </Grid>
  );
};
