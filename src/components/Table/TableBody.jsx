import styles from './Table.module.css';

import {
  useRef,
} from 'react';

import BodyCell from './BodyCell';


const TableBody = ({
  date,
  classesName,
  student,
}) => {
  const scoresSpace = useRef(null);

  return (
    <div className={ styles.tableBody }>
      <div className={ `${styles.bodyCell} ${styles.studentName}` }>
        { student.name }
      </div>
      <div className={ styles.scoresSpace } ref={ scoresSpace }>
        <BodyCell
          date={ date }
          classesName={classesName}
          studentPerformance={ student.performance }
        />
      </div>
    </div>
  );
};


export default TableBody;
