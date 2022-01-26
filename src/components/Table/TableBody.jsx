import styles from './Table.module.css';

import BodyCell from './BodyCell';


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

export default TableBody;
