var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import TCalendar from '../common/shared/calendar/index';
const { prefix } = config;
const name = `${prefix}-calendar`;
let Calendar = class Calendar extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.options = {
            multipleSlots: true,
            styleIsolation: 'apply-shared',
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            months: [],
            scrollIntoView: '',
        };
        this.controlledProps = [
            {
                key: 'value',
                event: 'confirm',
            },
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.lifetimes = {
            ready() {
                let { confirmBtn } = this.data;
                if (!confirmBtn && confirmBtn != null) {
                    confirmBtn = { content: '确认' };
                }
                this.base = new TCalendar(this.properties);
                this.initialValue();
                this.setData({
                    days: this.base.getDays(),
                    confirmBtn,
                });
                this.calcMonths();
            },
        };
        this.observers = {
            value(v) {
                if (this.base) {
                    this.base.value = v;
                }
            },
            visible(v) {
                if (v) {
                    this.scrollIntoView();
                    if (this.base) {
                        this.base.value = this.data.value;
                        this.calcMonths();
                    }
                }
            },
        };
        this.methods = {
            initialValue() {
                const { value, type, minDate } = this.data;
                if (!value) {
                    const today = new Date();
                    const now = minDate || new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
                    const initialValue = type === 'single' ? now : [now];
                    if (type === 'range') {
                        initialValue[1] = now + 24 * 3600 * 1000;
                    }
                    this.setData({
                        value: initialValue,
                    });
                    this.base.value = initialValue;
                }
            },
            scrollIntoView() {
                const { value } = this.data;
                if (!value)
                    return;
                const date = new Date(Array.isArray(value) ? value[0] : value);
                if (date) {
                    this.setData({
                        scrollIntoView: `year_${date.getFullYear()}_month_${date.getMonth()}`,
                    });
                }
            },
            calcMonths() {
                const months = this.base.getMonths();
                this.setData({
                    months,
                });
            },
            handleClose() {
                this.setData({ visible: false });
            },
            handleSelect(e) {
                const { date, year, month } = e.currentTarget.dataset;
                if (date.type === 'disabled')
                    return;
                const rawValue = this.base.select({ cellType: date.type, year, month, date: date.day });
                const value = this.toTime(rawValue);
                this.calcMonths();
                if (this.data.confirmBtn == null) {
                    if (this.data.type === 'single' || rawValue.length === 2) {
                        this.setData({ visible: false });
                        this._trigger('change', { value });
                    }
                }
                this.triggerEvent('select', { value });
            },
            onTplButtonTap() {
                const rawValue = this.base.getTrimValue();
                const value = this.toTime(rawValue);
                this._trigger('confirm', { value });
            },
            toTime(val) {
                if (Array.isArray(val)) {
                    return val.map((item) => item.getTime());
                }
                return val.getTime();
            },
        };
    }
};
Calendar = __decorate([
    wxComponent()
], Calendar);
export default Calendar;
