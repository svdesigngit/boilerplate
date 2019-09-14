/**
 * @version 1.5
 * @author Kelnik Studios {http://kelnik.ru}
 * @link https://kelnik.gitbooks.io/kelnik-documentation/content/front-end/form/select.html documentation
 */

/* eslint-disable no-invalid-this */

/**
 * Dependencies
 */
import 'chosen-js/chosen.jquery';
import Mediator from 'common/scripts/mediator';

const mediator = new Mediator();

class Index {
    /**
     * Initialisation
     * @param {object} options - настройки из app.js
     */
    init(options) {
        this.setOptions(options);

        // Инициализация селекта
        $(this.select)
            .chosen({
                /* eslint-disable camelcase */
                disable_search           : this.search,
                placeholder_text_single  : this.placeholder,
                placeholder_text_multiple: this.placeholderMulti,
                width                    : '100%',
                hide_results_on_select   : false,
                display_selected_options : this.showSelected,
                no_results_text          : this.noResultsText
                /* eslint-enable camelcase */
            });

        this.bindEvents();
    }

    /**
     * Установка опций
     * @param {object} options - настройки из app.js
     */
    setOptions(options) {
        this.select = options.element;
        this.search = options.disableSearch;
        this.placeholder = options.placeholderTextSingle;
        this.placeholderMulti = options.placeholderTextMultiple;
        this.hasLinks = options.hasLinks;
        this.showSelected = options.displaySelectedOptions;
        this.noResultsText = options.noResultsText;
        this.hasCustomScroll = options.hasCustomScroll;
        this.deselectFromList = options.deselectFromList;
        this.keepListOpenOnDeselect = options.keepListOpenOnDeselect;
        this.connectedSelects = options.connectedSelects;
        this.firstConnectedSelectId = $(options.firstConnectedSelectId);
        this.secondConnectedSelectId = $(options.secondConnectedSelectId);
    }

    /**
     * Events
     */
    bindEvents() {
        this.resultsList = $('.chosen-results');
        const that = this;

        // this.initScroll();
        this.linksRedirect();
        this.connectSelects();

        $(this.select)
            .on('change', (event) => {
                mediator.publish('selectChange', event.target.value);
                that.deselect();
                that.keepListOpen();
            });
    }

    /**
     * Init Custom Scroll
     */
    // initScroll() {
    //     // Подключение кастомного скролла
    //     if (this.hasCustomScroll) {
    //         this.resultsList.each(function initScroll() {
    //             /* eslint-disable no-new */
    //             new PerfectScrollbar(this, {
    //                 maxScrollbarLength: 50,
    //                 minScrollbarLength: 50
    //             });
    //             /* eslint-enable no-new */
    //         });
    //     }
    // }

    /**
     * Redirect to links in options
     */
    linksRedirect() {
        // Переход по ссылкам в селекте
        if (this.hasLinks) {
            $(this.select)
                .on('change', function onChange() {
                    location.href = $(this)
                        .val();
                });
        }
    }

    /**
     * Deselect from list
     */
    deselect() {
        // Удаление выбранного значения прямо из выпадающего списка
        if (this.deselectFromList) {
            $(document)
                .on('click', '.result-selected', function deselect() {
                    const $selectedOption = $(this);
                    const optionIndex = $selectedOption.data('option-array-index');

                    $selectedOption
                        .closest('.chosen-drop')
                        .prev()
                        .find(`[data-option-array-index="${optionIndex}"]`)
                        .trigger('click');
                });
        }
    }

    /**
     * Keep dropdown open on deselect from list
     */
    keepListOpen() {
        // Оставлять выпадающий список открытым после удаления значения
        if (this.keepListOpenOnDeselect) {
            this.resultsList.on('click', (event) => {
                setTimeout(() => {
                    $(event.currentTarget)
                        .parent()
                        .siblings('.chosen-choices')
                        .click();
                });
            });
        }
    }

    /**
     * Connected selects
     */
    connectSelects() {
        if (this.connectedSelects) {
            const that = this;
            const $options = this.secondConnectedSelectId.find('option');

            this.firstConnectedSelectId.on('change', function selectChange() {
                const currentValue = parseInt(this.value, 10);
                const indexShift = 1;
                const indexValue = currentValue - indexShift;
                const firstSelectLength = that.firstConnectedSelectId.find('option').length;

                // Если в первом селекте выбран последний пункт, то во втором подставляем его же
                if (firstSelectLength === currentValue) {
                    that.secondConnectedSelectId.html($options.filter((index) => {
                        return index > indexValue - indexShift;
                    }));
                } else {
                    // В остальных случаях показываем опции, начиная со следующей после выбранной
                    that.secondConnectedSelectId.html($options.filter((index) => {
                        return index > indexValue;
                    }));
                }
                // Во втором селекте ставим выбранной новую опцию, что идет первой
                that.secondConnectedSelectId
                    .val(that.secondConnectedSelectId.find('option:first')
                        .val())
                    .trigger('chosen:updated');
            });
        }
    }
}

export default Index;
/* eslint-enable no-invalid-this */
