import styles from './Table.module.css';

import {
  useState,
} from 'react';

import Modal from '../Modal/Modal';

import Header from './Header';
import TableBody from './TableBody';

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


      setCurrentUser({
        name: studentName,
        date: date,
        score: element.innerText,
        element: element,
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


export default Table;
