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
  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const onGetElementPlaceAndUserData = (element, studentName, date) => {
    if (Array.prototype.some.call(
      element.classList, name => name === styles.studentScores)) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const halfWidth = width * .5;

      const leftSide = element.offsetLeft;
      const rightSide = window.outerWidth - leftSide - width;

      const topSide = element.offsetTop;
      const bottomSide = window.outerHeight - topSide - height;

      const modalWidth = document.getElementById('modal').offsetWidth;
      const modalHeight = document.getElementById('modal').offsetHeight;
      const halfModalWidth = modalWidth * .5;

      // console.dir(element);
      // const cloneElement = element.cloneNode(true);

      // cloneElement.style.background = '#fff';
      // cloneElement.style.color = '#000';
      // cloneElement.style.position = 'absolute';
      // cloneElement.style.top = `${topSide - 6}px`;
      // cloneElement.style.left = `${leftSide - 6}px`;
      // cloneElement.style.height = `${height + 8}px`;
      // cloneElement.style.width = `${width + 8}px`;

      // document.body.appendChild(cloneElement);

      element.style.transform = 'scale(1.1)';


      setCurrentUser({
        name: studentName,
        date: date,
        score: element.innerText,
      });

      setShowModal(true);


      if (leftSide > rightSide && topSide < bottomSide) {
        return setCoordinates({
          modal: {
            left: `${leftSide - modalWidth}px`,
            top: `${topSide}px`,
          },
          side: 'RightTop',
        });
      } else if (leftSide > rightSide) {
        return setCoordinates({
          modal: {
            left: `${leftSide - modalWidth}px`,
            top: `${topSide - modalHeight + height}px`,
          },
          side: 'RightBottom',
        });
      } else if (leftSide < rightSide && modalWidth < rightSide
        && topSide < bottomSide) {
        return setCoordinates({
          modal: {
            left: `${leftSide + width}px`,
            top: `${topSide}px`,
          },
          side: 'LeftTop',
        });
      } else if (leftSide < rightSide && modalWidth < rightSide
        && topSide > bottomSide) {
        return setCoordinates({
          modal: {
            left: `${leftSide + width}px`,
            top: `${topSide - modalHeight + height}px`,
          },
          side: 'LeftBottom',
        });
      } else if (leftSide < rightSide && rightSide < modalWidth
        && topSide < bottomSide) {
        return setCoordinates({
          modal: {
            left: `${leftSide + halfWidth - halfModalWidth}px`,
            top: `${topSide + height}px`,
          },
          side: 'Down',
        });
      } else if (rightSide > leftSide && modalWidth > leftSide
        && topSide > bottomSide) {
        return setCoordinates({
          modal: {
            left: `${leftSide + halfWidth - halfModalWidth}px`,
            top: `${topSide - modalHeight - (height * .5)}px`,
          },
          side: 'Up',
        });
      }
    }
  };

  return (
    <div className={ styles.wrapper }>
      <Modal
        isShow={ showModal }
        onShowToggle={ setShowModal }
        coordinates={ coordinates }
        currentUser={ currentUser }
      />
      <Header date={ date } lessons={ lessonsList } />
      <TableBody
        date={ date }
        students={ studentsPerformance.students }
        onGetElementPlaceAndUserData={ onGetElementPlaceAndUserData }
      />
    </div>
  );
};


const Modal = ({
  coordinates,
  currentUser,
  isShow,
  onShowToggle,
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
        className={ `
          ${styles.modalDarkLayer}
          ${isShow ? false : styles.modalDarkLayerHidden}` }
        onPointerUp={ () => onShowToggle(!isShow) }
      >
      </div>
      <div
        id="modal"
        className={ `
          ${styles.modal}
          ${styles[`modalTransform${coordinates.side}`]}
          ${isShow ? false : styles.modalHidden}
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
