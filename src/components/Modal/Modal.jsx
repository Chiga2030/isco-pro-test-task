import styles from './Modal.module.css';

import {
  useState,
  useEffect,
} from 'react';

import {
  ReactComponent as NotMarkCheckboxImg,
} from './images/notMarkCheckbox.svg';
import {
  ReactComponent as MarkCheckboxImg,
} from './images/markCheckbox.svg';
import {
  ReactComponent as TailImg,
} from './images/tail.svg';


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

  useEffect(() => {
    if (currentUser.element) {
      currentUser.element.classList.add(styles.modalScale);

      return () => currentUser.element.classList.remove(styles.modalScale);
    }
  }, [
    currentUser.element,
  ]);

  const onChangeInputHandler = event => {
    const newValue = () => {
      if (event.target.value.match(/^[1-5]$/)) {
        return event.target.value;
      } return 'Ошибка: нужно указать оценку от 1 до 5';
    };
    return setScoreState(newValue);
  };

  const onShowToggleHandler = () => {
    currentUser.element.classList.remove(styles.modalScale);
    onShowToggle(!isShow);
  };

  return (
    <>
      <div
        className={ `
          ${styles.modalDarkLayer}
          ${isShow ? false : styles.modalDarkLayerHidden}` }
        onPointerUp={ onShowToggleHandler }
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


export default Modal;
