import { RadioValue } from '../radio/type';
import { KeysType } from '../common/common';
export interface TdRadioGroupProps<T = RadioValue> {
    align?: {
        type: StringConstructor;
        value?: 'left' | 'right';
    };
    borderless?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    customStyle?: {
        type: StringConstructor;
        value?: string;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
        value?: 'fill-circle' | 'stroke-line' | Array<string>;
    };
    keys?: {
        type: ObjectConstructor;
        value?: KeysType;
    };
    name?: {
        type: StringConstructor;
        value?: string;
    };
    options?: {
        type: ArrayConstructor;
        value?: Array<RadioOption>;
    };
    value?: {
        type: null;
        value?: T;
    };
    defaultValue?: {
        type: null;
        value?: T;
    };
}
export declare type RadioOption = string | number | RadioOptionObj;
export interface RadioOptionObj {
    label?: string;
    value?: string | number;
    disabled?: boolean;
}
