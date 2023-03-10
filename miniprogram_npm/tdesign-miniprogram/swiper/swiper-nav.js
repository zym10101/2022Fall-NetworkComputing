var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import { DIRECTION } from './common/constants';
const { prefix } = config;
const name = `${prefix}-swiper-nav`;
let SwiperNav = class SwiperNav extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = {
            type: {
                type: String,
                value: "dots",
            },
            minShowNum: {
                type: Number,
                value: 2,
            },
            hasNavBtn: {
                type: Boolean,
                value: false,
            },
        };
        this.relations = {
            './swiper': {
                type: 'parent',
            },
        };
        this.data = {
            index: 0,
            total: 0,
            direction: DIRECTION.HOR,
            prefix,
            classPrefix: name,
        };
    }
    ready() {
        var _a;
        this.$swiper = (_a = this.getRelationNodes('./swiper')) === null || _a === void 0 ? void 0 : _a[0];
    }
    onChange(opt) {
        this.setData(Object.assign({}, opt));
    }
    nav(e) {
        var _a, _b;
        const { dir } = e.target.dataset;
        const opt = { source: 'nav', cycle: true };
        this.triggerEvent('navBtnChange', Object.assign(Object.assign({}, opt), { dir }));
        if (this.$swiper) {
            (_a = this.$swiper) === null || _a === void 0 ? void 0 : _a.pause();
            (_b = this.$swiper) === null || _b === void 0 ? void 0 : _b[dir](opt);
        }
    }
};
SwiperNav = __decorate([
    wxComponent()
], SwiperNav);
export default SwiperNav;
