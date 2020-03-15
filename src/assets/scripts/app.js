import numberFormater from '@utils/numberFormater.js';
import Accordion from '../../components/accordion';

numberFormater();

/**
 * Аккордион
 */
const accordion = new Accordion();
accordion.init({
  selector: '.j-accordion',
  selectorParentData: 'data-item',
  selectorBtnData: 'data-btn',
  selectorBodyData: 'data-body',
  activeClassParent: 'accordion__item_active',
  activeClassBtn: 'accordion__btn_active',
  activeClassBody: 'accordion__body_active',
  closeOthers: true
});
