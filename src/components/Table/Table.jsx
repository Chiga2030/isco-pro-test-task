import styles from './Table.module.css';

import {
  useState,
} from 'react';

import Header from './Header';
import TableBody from './TableBody';

import {
  ReactComponent as NotMarkCheckboxImg,
} from './images/notMarkCheckbox.svg';
import {
  ReactComponent as MarkCheckboxImg,
} from './images/markCheckbox.svg';

const Table = ({
  date = '21.11.2021',
  classesList,
  studentsPerformance,
}) => {
  const [
    coordinates,
    setCoordinates,
  ] = useState({});
  const [
    currentUser,
    setCurrentUser,
  ] = useState({});

  const onGetElementPlace = (element, studentName, score) => {
    setCoordinates({
      pageX: element.offsetLeft,
      pageY: element.offsetTop,
      height: element.offsetHeight,
      width: element.offsetWidth,
    });

    setCurrentUser({
      name: studentName,
      score: score,
    });

    console.log(studentName);
    console.log(score);
  };

  return (
    <div className={ styles.wrapper }>
      <Modal coordinates={ coordinates } currentUser={ currentUser } />
      <Header date={ date } classesList={ classesList } />
      { studentsPerformance.students.map((student, index) => (
        <TableBody
          date={ date }
          classesName={ classesList.classes.map(classes => classes.name) }
          student={ student }
          key={ String(index + Date.now()) }
          onGetElementPlace={ onGetElementPlace }
        />
      )) }
    </div>
  );
};


const Modal = ({
  coordinates,
  currentUser,
}) => {
  console.log();
  const [
    checkboxState,
    setCheckboxState,
  ] = useState(null);

  return (
    <div
      className={ styles.modal }
      style={{
        left: `${coordinates.pageX + coordinates.width + 13}px`,
        top: `${coordinates.pageY - 26}px`,
      }}
    >
      <header>
        <h3 className={ styles.modalHeader }>Поставить отметку</h3>
      </header>
      <main>
        <p className={ styles.modalParagraphs }>
          <span>Студент</span>
          <span className={ styles.modalUsername }>{ currentUser.name }</span>
        </p>
        <p className={ styles.modalParagraphs }>
          <span>Дата</span>
          <span className={ styles.modalDate }>{ currentUser.score }</span>
        </p>
        <form id="studentAccountingForm">
          <input type="hidden" name="studentName" value={ currentUser.name }/>
          <input type="hidden" name="score" value={ currentUser.score }/>
          <input
            type="checkbox"
            name="isNotAttendance"
            id="checkAttendance"
            className={ styles.modalCheckbox }
            onChange={ () => setCheckboxState(!checkboxState) }
          />
          <label
            className={ styles.modalLabel }
            htmlFor="checkAttendance"
          >
            { checkboxState ?
              <MarkCheckboxImg className={ styles.modalCustomCheckbox } /> :
              <NotMarkCheckboxImg className={ styles.modalCustomCheckbox } /> }
            Не присутствовал
          </label>
        </form>
      </main>
    </div>
  );
};


export default Table;
