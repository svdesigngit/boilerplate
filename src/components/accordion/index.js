class Accordion {

  constructor() {
    // Опции по умолчанию
    this.defaultOptions = {
      selector: '.j-accordion',
      selectorParentData: 'data-item',
      selectorBtnData: 'data-btn',
      selectorBodyData: 'data-body',
      activeClassParent: 'accordion__item_active',
      activeClassBtn: 'accordion__btn_active',
      activeClassBody: 'accordion__body_active',
      closeOthers: true
    };
  }

  /**
   * Иницализирует модуль
   * @param {object} options - опции аккордиона
   */
  init(options) {
    // применение опций из настроек
    this.optionsUpdate(options);
    this.accordionList(this.defaultOptions.selector);
  }

  /**
   * Получает список аккордионов
   * @param {object} wrapper - обёртка аккордиона
   */
  accordionList(wrapper) {
    this.accordionList = Array.from(document.querySelectorAll(wrapper));

    if (!this.accordionList.length) {
      return;
    }

    this.accordionList.forEach(item => {
      this.bindEvents(item);
    });
  }

  /**
   * Навешивает обработчик событий
   * @param {object} item - аккордион
   */
  bindEvents(item) {
    item.addEventListener('click', event => {
      const btn = event.target.closest(`[data-${this.defaultOptions.selectorBtnData}]`);

      if (!btn) {
        return;
      }

      // Получаем контент
      const body = item.querySelector(
        `[data-${this.defaultOptions.selectorBodyData}='${
          btn.dataset[this.defaultOptions.selectorBtnData]
        }']`
      );

      // Получаем родителя
      const parent = event.target.closest(`[data-${this.defaultOptions.selectorParentData}]`);
      
      const isActive = btn.classList.contains(this.defaultOptions.activeClassBtn);

      if (isActive) {
        // Закрываем аккардеон
        this.close(btn, this.defaultOptions.activeClassBtn);

        if (parent) {
          this.close(parent, this.defaultOptions.activeClassParent);
        }
        if (body) {
          this.close(body, this.defaultOptions.activeClassBody);
        }
      } else {
        // Закрываем другие аккардеоны если нужно
        if (this.defaultOptions.closeOthers) {
          this.closeOthers(parent);
        }

        // Открываем аккардеон
        this.open(btn, this.defaultOptions.activeClassBtn);

        if (parent) {
          this.open(parent, this.defaultOptions.activeClassParent);
        }
        if (body) {
          this.open(body, this.defaultOptions.activeClassBody);
        }
      }
    });
  }

  nextItems(element, elementsList = []) {
    const nextElement = element.nextElementSibling;

    if (nextElement) {
      elementsList.push(nextElement);
      this.nextItems(nextElement, elementsList);
    }
    return elementsList;
  }

  prevItems(element, elementsList = []) {
    const prevElement = element.previousElementSibling;

    if (prevElement) {
      elementsList.push(prevElement);
      this.prevItems(prevElement, elementsList);
    }
    return elementsList;
  }

  nighboursItems(element) {
    return [...this.prevItems(element), ...this.nextItems(element)];
  }

  /**
   * Переключает класс элемента аккардиона
   * @param {object} element - текущий элемент
   * @param {object} elementClass -  перключаемый класс
   */
  open(element, elementClass) {
    element.classList.add(elementClass);
  }

  /**
   * Переключает класс элемента аккардиона
   * @param {object} element - текущий элемент
   * @param {object} elementClass -  перключаемый класс
   */
  close(element, elementClass) {
    element.classList.remove(elementClass);
  }

  /**
   * Применяет пользовательские опции
   * @param {object} options - текущий элемент аккардиона
   */
  optionsUpdate(options) {
    if (options) {
      for (const key in options) {
        if (this.defaultOptions[key]) {
          this.defaultOptions[key] = options[key];
        } else {
          console.log(`Опции: ${key}, нет для аккордиона`);
        }

        if (
          key === 'selectorParentData' ||
          key === 'selectorBtnData' ||
          key === 'selectorBodyData'
        ) {
          this.defaultOptions[key] = this.defaultOptions[key].replace(/data-{1}/i, '');
        }
      }
    }
  }

  /**
   * Если изначально установлен активный класс, то метод откроет аккордион.
   * @private
   */
  checkActiveState() {
    const isActive = this.wrapper.classList.contains(this.defaultOptions.activeClassParent);

    if (isActive) {
      this.contentWrapper.style.height = `${this.height}px`;
      this.state = 'open';
    }
  }

  /**
   * Если при открытии аккардеона другие нужно закрывать
   * @private
   */
  closeOthers(item) {
  
    const nightboursList = this.nighboursItems(item);
    
    console.log(nightboursList);
    
    // if (this.defaultOptions.closeOthers === true) {
    //   const itemActivies = item.querySelectorAll(`
    //     .${this.defaultOptions.activeClassParent},
    //     .${this.defaultOptions.activeClassBtn},
    //     .${this.defaultOptions.activeClassBody}`);

      // console.log(itemActivies);
      //
      if (nightboursList.length) {
        nightboursList.forEach(el => {
          el.classList.remove(`${this.defaultOptions.activeClassParent}`);
          el.classList.remove(`${this.defaultOptions.activeClassBtn}`);
          el.classList.remove(`${this.defaultOptions.activeClassBody}`);
        });
      }
    // }
  }
}

export default Accordion;
