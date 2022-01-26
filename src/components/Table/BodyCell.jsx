import styles from './Table.module.css';


const BodyCell = ({
  date,
  classesName,
  studentPerformance,
}) => (
  <>
    { studentPerformance.classes
      .filter((study, index) => (study.date === date
        && study.name === classesName[index]))
      .map((study, index) => (
        <div
          className={ `${styles.bodyCell} ${styles.study}` }
          key={ String(index + Date.now()) }
        >
          { study.score }
        </div>)) }
  </>
);


export default BodyCell;
