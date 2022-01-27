import styles from './Table.module.css';

import BodyCell from './BodyCell';


const TableBody = ({
  date,
  lessons,
  student,
  onGetElementPlace,
}) => {
  console.log();

  return (
    <div className={ styles.tableBody }>
      <div className={ `${styles.bodyCell} ${styles.studentName}` }>
        { student.name }
      </div>
      <div
        className={ styles.scoresSpace }
        onPointerDown={ event => onGetElementPlace(
          event.target, student.name, student.performance.lessons[0].date) }
      >
        <BodyCell
          date={ date }
          lessons={lessons}
          studentPerformance={ student.performance }
        />
      </div>
    </div>
  );
};


export default TableBody;
