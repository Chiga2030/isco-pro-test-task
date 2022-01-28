# Тестовое задание для Isco.pro

Pop-up для таблицы успеваемости на React


## Техническое задание:
При клике на ячейку таблицы должен открываться “попап” c значением ячейки, значением второго столбца в одном ряду с кликнутой ячейкой (ФИО студента), и значением шапки колонки в которой находится ячейка(дата).

Стили самой таблицы не обязательно делать как на макете, важно чтобы попап менял свое положение в зависимости от положения ячейки с указателем на активную ячейку.

---

**Стэк - стандартный набор Create React App.**  
**Затрачено времени - 22 часа**

---

## Pop-up
Находится в скрытом состоянии ождая тригера от хэндлера, который повешен на ячейки  с оценками.  
***Хендлер только 1 на всю таблицу.***

От отго же хэндлера поступает информация о позиционировании pop-up окна и информация, которая должна быть отражена внутри pop-up окна.  

Внутри pop-up окна контроллируемые поля ввода.  
Есть два скрытых поля (предполагается, что данные будут отправлены на конечную точку).

Стрелка указывающая на ячейку имеет несколько положений в зависимости от позиционирования окна.

Pop-up закрывается при нажатии на темную область.

Ячейка подсвечивается светлым, путем изменения свойства transform scale.


## Таблица
Заполняется даннымы из объектов имитирующих ответ от сервера.  

Основная таблице не стилизована, ***pop-up стилизован в соответствии с макетом***.
