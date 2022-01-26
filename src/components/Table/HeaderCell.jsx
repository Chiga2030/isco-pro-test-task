import styles from './Table.module.css';


const HeaderCell = ({
  studyName,
  date,
}) => (
  <div className={ `
    ${styles.headerCell}
    ${styles.study}
  ` }>
    <span className={ styles.studyName }>{ studyName }</span>
    <span>{ date }</span>
  </div>
);

export default HeaderCell;
