import styles from './Table.module.css';


const HeaderCell = ({
  lessonName,
  date,
}) => (
  <div className={ `
    ${styles.headerCell}
    ${styles.lesson}
  ` }>
    <span className={ styles.lessonName }>{ lessonName }</span>
    <span>{ date }</span>
  </div>
);

export default HeaderCell;
