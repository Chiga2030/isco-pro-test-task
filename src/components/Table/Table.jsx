import styles from './Table.module.css';

import Header from './Header';
import TableBody from './TableBody';


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


export default Table;
