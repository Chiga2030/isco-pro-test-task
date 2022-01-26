import styles from './Table.module.css';

import HeaderCell from './HeaderCell';


const Header = ({
  date,
  classesList,
}) => (
  <header className={ styles.header }>
    <div className={ `
      ${styles.headerCell}
      ${styles.studentName}
    ` }>
      ФИО студента
    </div>
    { classesList.classes
      .filter(study => study.date === date)
      .map(stydy => (
        <HeaderCell
          studyName={ stydy.name }
          date={ date }
          key={ stydy.name }
        />)) }
  </header>
);


export default Header;
