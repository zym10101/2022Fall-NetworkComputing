import { SuperComponent } from '../common/src/index';
export default class Progress extends SuperComponent {
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    properties: import("./type").TdProgressProps;
    data: {
        prefix: string;
        classPrefix: string;
        colorBar: string;
        heightBar: string;
        computedStatus: string;
        computedProgress: number;
    };
    observers: {
        percentage(percentage: any): void;
        color(color: any): void;
        strokeWidth(strokeWidth: any): string;
    };
}
