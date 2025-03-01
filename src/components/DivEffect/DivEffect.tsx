import classes from './DivEffect.module.scss';

export const DivEffect = () => {
  return (
    <div className={classes.container}>
      <div className={classes.stackedCards}>
        <div className={classes.card}></div>
        <div className={classes.card}></div>
        <div className={classes.card}></div>
      </div>

      <div className={classes.dots}>
        <div className={classes.dot}></div>
        <div className={classes.dotActive}></div>
        <div className={classes.dot}></div>
      </div>
    </div>
  );
};
