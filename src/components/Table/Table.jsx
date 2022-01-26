import styles from './Table.module.css';


const Table = ({
  date = '21.11.2021',
  classesList,
  studentsPerformance,
}) => (
  <div className={ styles.wrapper }>
    <Header date={ date } classesList={ classesList } />
    { studentsPerformance.students.map((student, index) => (
      <TableBody
        date={ date }
        classesName={ classesList.classes.map(classes => classes.name) }
        student={ student }
        key={ String(index + Date.now()) }
      />
    )) }
  </div>
);


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


const TableBody = ({
  date,
  classesName,
  student,
}) => (
  <div className={ styles.tableBody }>
    <div className={ `${styles.bodyCell} ${styles.studentName}` }>
      { student.name }
    </div>
    <BodyCell
      date={ date }
      classesName={classesName}
      studentPerformance={ student.performance }
    />
  </div>
);

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


export default Table;
