import styles from './Table.module.css';

import {
  useState,
  useEffect,
} from 'react';

import Header from './Header';
import TableBody from './TableBody';

import {
  ReactComponent as NotMarkCheckboxImg,
} from './images/notMarkCheckbox.svg';
import {
  ReactComponent as MarkCheckboxImg,
} from './images/markCheckbox.svg';
import {
  ReactComponent as TailImg,
} from './images/tail.svg';

const Table = ({
  date = '21.11.2021',
  lessonsList,
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

  const onGetElementPlace = (element, studentName, date) => {
    const pageX = element.offsetLeft;
    const pageY = element.offsetTop;
    // const height = element.offsetHeight;
    const width = element.offsetWidth;


    setCurrentUser({
      name: studentName,
      date: date,
      score: element.innerText,
    });

    // console.log(document.getElementById('modal').offsetWidth);
    const modalWidth = document.getElementById('modal').offsetWidth;
    const displayWidth = document.documentElement.clientWidth;
    const rightEdge = pageX + width + modalWidth;
    const fromRightEdge = displayWidth - rightEdge;
    // console.log('X - ', pageX + width + modalWidth);
    // console.log('display width - ', document.documentElement.clientWidth);
    if (fromRightEdge > 0) {
      console.log('to right');

      return setCoordinates({
        modal: {
          left: `${pageX + width}px`,
          top: `${pageY}px`,
        },
        side: 'Left',
      });
    } else if (fromRightEdge < 0) {
      console.log('to left');

      return setCoordinates({
        modal: {
          left: `${pageX - modalWidth}px`,
          top: `${pageY}px`,
        },
        side: 'Right',
      });
    }
  };

  return (
    <div className={ styles.wrapper }>
      <Modal
        coordinates={ coordinates }
        currentUser={ currentUser }
      />
      <Header date={ date } lessons={ lessonsList } />
      { studentsPerformance.students.map((student, index) => (
        <TableBody
          date={ date }
          lessons={ lessonsList.lessons.map(lessons => lessons.name) }
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
  const [
    checkboxState,
    setCheckboxState,
  ] = useState(false);
  const [
    scoreState,
    setScoreState,
  ] = useState(' ');

  useEffect(() => {
    setScoreState(currentUser.score);
  }, [
    currentUser.score,
  ]);

  const onChangeInputHandler = event => {
    const newValue = () => {
      if (event.target.value.match(/^[1-5]$/)) {
        return event.target.value;
      } return 'Ошибка: нужно указать оценку от 1 до 5';
    };
    return setScoreState(newValue);
  };

  return (
    <>
      <div
        id="modal"
        className={ `
          ${styles.modal}
          ${styles[`modalTransform${coordinates.side}`]}
        ` }
        style={ coordinates.modal }
      >
        <TailImg
          className={ `
            ${styles.modalTail}
            ${styles[`modalTail${coordinates.side}`]}
          ` }
        />
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
            <span className={ styles.modalDate }>{ currentUser.date }</span>
          </p>
          <form id="studentAccountingForm">
            <input
              type="hidden"
              name="studentName"
              value={ currentUser.name ? currentUser.name : false }
            />

            <input
              type="hidden"
              name="date"
              value={ currentUser.date ? currentUser.date : false }
            />

            <input
              type="checkbox"
              name="isNotAttendance"
              id="checkAttendance"
              className={ styles.modalCheckbox }
              checked={ checkboxState }
              onChange={ () => setCheckboxState(!checkboxState) }
            />
            <label
              className={ styles.modalLabel }
              htmlFor="checkAttendance"
            >
              { checkboxState ?
                <MarkCheckboxImg className={ styles.modalCustomCheckbox } /> :
                <NotMarkCheckboxImg
                  className={ styles.modalCustomCheckbox } /> }
              Не присутствовал
            </label>

            <input
              className={ styles.modalInputScore }
              type="text"
              value={ scoreState ? scoreState : ' ' }
              onChange={ event => onChangeInputHandler(event) }
              onClick={ event => event.target.select() }
              onKeyUp={ event => event.target.select() }
            />

            <div className={ styles.modalButtonWrapper }>
              <button
                className={ styles.modalButton }
                type="button"
              >
                Поставить отметку
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};


export default Table;
