import styles from './Table.module.css';

import HeaderCell from './HeaderCell';


const Header = ({
  date,
  lessons,
}) => (
  <header className={ styles.header }>
    <div className={ `
      ${styles.headerCell}
      ${styles.studentName}
    ` }>
      ФИО студента
    </div>
    { lessons.lessons
      .filter(lesson => lesson.date === date)
      .map(lesson => (
        <HeaderCell
          lessonName={ lesson.name }
          date={ date }
          key={ lesson.name }
        />)) }
  </header>
);


export default Header;
