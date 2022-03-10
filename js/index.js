// 'use strict';

const optionBtnOrder = document.querySelector('.option__btn_order');
const optionBtnPeriod = document.querySelector('.option__btn_period');
const optionListOrder = document.querySelector('.option__list_order');
const optionListPeriod = document.querySelector('.option__list_period');

optionBtnOrder.addEventListener('click', (e) => {
  e.preventDefault();
  optionListOrder.classList.toggle('option__list_active');
  optionListPeriod.classList.remove('option__list_active');
});

optionBtnPeriod.addEventListener('click', (e) => {
  e.preventDefault();
  optionListPeriod.classList.toggle('option__list_active');
  optionListOrder.classList.remove('option__list_active');
});

optionListOrder.addEventListener('click', (e) => {
  if (e.target.classList.contains('option__item')) {
    optionBtnOrder.textContent = e.target.textContent;
    optionListOrder.classList.remove('option__list_active');
    for (const elem of optionListOrder.querySelectorAll('.option__item')) {
      if (elem === e.target) {
        elem.classList.add('option__item_active');
      } else {
        elem.classList.remove('option__item_active');
      }
    }
    e.target.classList.add('option__item_active');
  }
})

optionListPeriod.addEventListener('click', (e) => {
  if (e.target.classList.contains('option__item')) {
    optionBtnPeriod.textContent = e.target.textContent;
    optionListPeriod.classList.remove('option__list_active');
    for (const elem of optionListPeriod.querySelectorAll('.option__item')) {
      if (elem === e.target) {
        elem.classList.add('option__item_active');
      } else {
        elem.classList.remove('option__item_active');
      }
    }
    e.target.classList.add('option__item_active');
  }
})

// выбор города
const topCityBtn = document.querySelector('.top__city');
const city = document.querySelector('.city');
const cityClose = document.querySelector('.city__close');
const cityRegionList = document.querySelector('.city__region-list');

topCityBtn.addEventListener('click', () => {
  city.classList.toggle('city_active');
});

cityRegionList.addEventListener('click', (e) => {
  if (e.target.classList.contains('city__link')) {
    topCityBtn.textContent = e.target.textContent;
    city.classList.remove('city_active');
  }
});

cityClose.addEventListener('click', () => {
  city.classList.remove('city_active');
})

const overlayVacancy = document.querySelector('.overlay_vacancy');
const resultList = document.querySelector('.result__list');

resultList.addEventListener('click', (e) => {
  if (e.target.dataset.vacancy) {
    e.preventDefault();
    overlayVacancy.classList.add('overlay_active');
  }
});

overlayVacancy.addEventListener('click', (e) => {
  if (e.target === overlayVacancy || e.target.classList.contains('modal__close')) {
    overlayVacancy.classList.remove('overlay_active');
  }
});

// вывод карточек
const createCard = (vacancy) => {

  const {
    title,
    id,
    compensation,
    workSchedule,
    employer,
    address,
    description,
    date,
  } = vacancy;

  const card = document.createElement('li');
  card.classList.add('result__item');

  card.insertAdjacentHTML('afterbegin', `
    
    <article class="vacancy">
      <h2 class="vacancy__title">
        <a class="vacancy__open-modal" href="#" data-vacancy="${id}">${title}</a>
      </h2>
      <p class="vacancy__compensation">${compensation}</p>
      <p class="vacancy__work-schedule">${workSchedule}</p>
      <div class="vacancy__employer">
        <p class="vacancy__employer-title">${employer}</p>
        <p class="vacancy__employer-address">${address}</p>
      </div>
      <p class="vacancy__description">${description}</p>
      <p class="vacancy__date">
        <time datetime="${date}">${date}</time>
      </p>
      <div class="vacancy__wrapper-btn">
        <a class="vacancy__response vacancy__open-modal" href="#" data-vacancy="${id}">Откликнуться</a>
        <button class="vacancy__contacts">Показать контакты</button>
      </div>
    </article>
    
  `);

  return card;
};

const renderCards = (data) => {

  resultList.textContent = '';

  const cards = data.map(createCard);

  resultList.append(...cards);

};

const getData = ({ search } = {}) => {
  if (search) {
    return fetch(`http://localhost:3000/api/vacancy?search=${search}`).then(response => response.json());
  }
  return fetch('http://localhost:3000/api/vacancy').then(response => response.json());
};

const formSearch = document.querySelector('.bottom__search');

formSearch.addEventListener('submit', async (e) => {
  e.preventDefault();

  const textSearch = formSearch.search.value;

  if (textSearch.length > 2) {
    formSearch.search.style.borderColor = '';
    const data = await getData({ search: textSearch });
    renderCards(data);
    formSearch.reset();
  } else {
    formSearch.search.style.borderColor = 'red';
    setTimeout(() => { formSearch.search.style.borderColor = '' }, 2000)
  }
  console.log(textSearch.length);
});

const init = async () => {
  const data = await getData();
  renderCards(data);
}

init();






