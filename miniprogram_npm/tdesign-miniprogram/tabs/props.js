const props = {
    animation: {
        type: Object,
    },
    customStyle: {
        type: String,
        value: '',
    },
    externalClasses: {
        type: Array,
    },
    placement: {
        type: String,
        value: 'top',
    },
    showBottomLine: {
        type: Boolean,
        value: true,
    },
    spaceEvenly: {
        type: Boolean,
        value: true,
    },
    sticky: {
        type: Boolean,
        value: false,
    },
    stickyProps: {
        type: Object,
    },
    swipeable: {
        type: Boolean,
        value: true,
    },
    theme: {
        type: String,
        value: 'line',
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
export default props;
