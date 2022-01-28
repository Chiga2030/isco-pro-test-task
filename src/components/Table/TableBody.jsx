import styles from './Table.module.css';

const TableBody = ({
  date,
  students,
  onGetElementPlaceAndUserData,
}) => (
  <div
    className={ `${styles.tableBody} ${styles.scoresSpace}` }
    onPointerUp={ event => onGetElementPlaceAndUserData(
      event.target, date) }
  >
    { students.map((student, index) => (
      <div className={ styles.bodyRow } key={ index }>
        <div className={ `${styles.bodyCell} ${styles.studentName}` }>
          { student.name }
        </div>

        {student.performance.lessons.map((lesson, index) => (
          <div
            key={ index }
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
