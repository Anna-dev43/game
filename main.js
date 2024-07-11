(() => {
  const game = document.getElementById('game');

  function cardsCount(count) {
      let form = document.createElement('form');
      let input = document.createElement('input');
      let btn = document.createElement('button');
      let button = document.getElementById('button');

      form.classList.add('form');
      input.classList.add('form__input');
      input.type = 'number';
      input.min = '2';
      input.max = '10';
      input.placeholder = 'Количество карточек по вертикали/горизонтали'
      btn.classList.add('btn-reset', 'btn');
      btn.textContent = 'Начать игру';
      btn.disabled = true;
      button.classList.add('hidden');

      input.addEventListener('input', () => {
          if (input.value !== "") {
              btn.disabled = false;
          }
      });

      form.addEventListener('submit', (event) => {
          event.preventDefault();

          count = Number(input.value);
          if (count % 2 !== 0) count++;
          startGame(game, count);

          input.value = '';
          btn.disabled = true;
          form.remove();
      });

      container.append(form);
      form.append(input);
      form.append(btn);
  }

  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
  function createNumbersArray(count) {
      let countArr = [];
      for (i = 1; i <= count; i++) {
        countArr.push(i, i);
      }
      return countArr;
  }

  //Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
  function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
  function startGame(game, count) {
      const cardsNumberArray = shuffle(createNumbersArray(count));
      let firstCard = null;
      let secondCard = null;

      let button = document.getElementById('button');

      //Настройка сетки
      let columns = 2;
      if (count === 4) {
          columns = 4;
      }
      if (count === 6) {
          columns = 4;
      }
      if (count === 8) {
          columns = 4;
      }
      if (count === 10) {
          columns = 5;
      }
      game.style = `grid-template-columns: repeat(${columns}, 1fr);`;

      // Создание карточек
      for (const cardNumder of cardsNumberArray) {
          let card = document.createElement('div');
          card.textContent = cardNumder;
          card.classList.add('card');

          //Клик по карточке
          card.addEventListener('click', () => {
              if (card.classList.contains('open') || card.classList.contains('success')) {
                  return;
              }

              if (firstCard !== null && secondCard !== null) {
                  firstCard.classList.remove('open');
                  secondCard.classList.remove('open');
                  firstCard = null;
                  secondCard = null;
              }

              card.classList.add('open');

              if (firstCard === null) {
                  firstCard = card;
              } else {
                  secondCard = card;
              }

              if (firstCard !== null && secondCard !== null) {
                  let firstCardNumber = firstCard.textContent;
                  let secondCardNumber = secondCard.textContent;

                  if (firstCardNumber === secondCardNumber) {
                      firstCard.classList.add('success');
                      secondCard.classList.add('success');
                  }
              }
          });

          game.append(card);
      }

      button.classList.remove('hidden');
      button.addEventListener('click', () => {
          game.innerHTML = '';
          cardsCount();
      });
  }

  cardsCount();

})();



