import styles from './Table.module.css';

const TableBody = ({
  date,
  students,
  onGetElementPlaceAndUserData,
}) => (
  <div
    className={ `${styles.tableBody} ${styles.scoresSpace}` }
    onPointerUp={ event => onGetElementPlaceAndUserData(
      event.target, students.name, date) }
  >
    { students.map(student => (
      <div className={ styles.bodyRow }>
        <div className={ `${styles.bodyCell} ${styles.studentName}` }>
          { student.name }
        </div>

        {student.performance.lessons.map(lesson => (
          <div
            className={ `
              ${styles.bodyCell}
              ${styles.lesson}
              ${styles.studentScores}
            ` }
          >
            { lesson.score }
          </div>
        ))}
      </div>
    )) }

  </div>
);


export default TableBody;
