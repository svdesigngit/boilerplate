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

      // Закрываем другие акардеоны если нужно
      if (this.defaultOptions.closeOthers) {
        this.closeOthers(item);
      }

      // Получаем контент
      const body = item.querySelector(
        `[data-${this.defaultOptions.selectorBodyData}='${
          btn.dataset[this.defaultOptions.selectorBtnData]
        }']`
      );

      // Получаем родителя
      const parent = event.target.closest(`[data-${this.defaultOptions.selectorParentData}]`);

      // Переключаем классыы
      this.activeToggler(btn, this.defaultOptions.activeClassBtn);

      if (parent) {
        this.activeToggler(parent, this.defaultOptions.activeClassParent);
      }
      if (body) {
        this.activeToggler(body, this.defaultOptions.activeClassBody);
      }
    });
  }

  /**
   * Переключает класс элемента аккардиона
   * @param {object} element - текущий элемент
   * @param {object} elementClass -  перключаемый класс
   */
  activeToggler(element, elementClass) {
    element.classList.toggle(elementClass);
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
    if (this.defaultOptions.closeOthers === true) {
      const itemActivies = item.querySelectorAll(`
        .${this.defaultOptions.activeClassParent},
        .${this.defaultOptions.activeClassBtn},
        .${this.defaultOptions.activeClassBody}`);

      // console.log(itemActivies);
      //
      if (itemActivies.length) {
        // itemActivies.forEach(el => {
        //   el.classList.remove(`${this.defaultOptions.activeClassParent}`);
        //   el.classList.remove(`${this.defaultOptions.activeClassBtn}`);
        //   el.classList.remove(`${this.defaultOptions.activeClassBody}`);
        // });
      }
    }
  }
}

export default Accordion;
