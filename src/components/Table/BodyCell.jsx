import styles from './Table.module.css';


const BodyCell = ({
  date,
  lessons,
  studentPerformance,
}) => (
  <>
    { studentPerformance.lessons
      .filter((lesson, index) => (lesson.date === date
        && lesson.name === lessons[index]))
      .map((lesson, index) => (
        <div
          className={ `
            ${styles.bodyCell}
            ${styles.lesson}
            ${styles.studentScores}
          ` }
          key={ String(index + Date.now()) }
        >
          { lesson.score }
        </div>)) }
  </>
);


export default BodyCell;
