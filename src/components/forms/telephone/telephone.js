/**
 * @version 1.0alpha
 * @author Kelnik Studios {http://kelnik.ru}
 * @link https://kelnik.gitbooks.io/kelnik-documentation/content/front-end/components/forms/input-tel.html documentation
 */

/**
 * Dependencies
 */
import './telephone.scss';
import inputmask from 'inputmask';

/**
 * Модуль ввешает маску на input типом tel
 */
class InputTelephone {
    constructor(options) {
        this.input = options.input;
        this.mask = options.mask || '+7(999) 999-99-99';

        this.setMask();
    }

    /**
     * Устанавливаем маску на инпут
     */
    setMask() {
        inputmask({mask: this.mask}).mask(this.input);
    }
}

export default InputTelephone;
