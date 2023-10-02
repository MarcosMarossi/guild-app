import Toast from "react-native-tiny-toast";

export const success = (msg: string) => Toast.showSuccess(msg, {
    position: Toast.position.BOTTOM,
    containerStyle: {
        backgroundColor: '#4caf50',
        borderRadius: 24,
        margin: 48
    },
    textStyle: {
        color: '#fff',
    },
    mask: false,
    maskStyle: {},
    imgStyle: {
        height: 0,
        width: 0
    },
    duration: 3000,
    animation: true,
});

export const warn = (msg: string) => Toast.show(msg, {
    position: Toast.position.BOTTOM,
    containerStyle: {
        backgroundColor: '#ffc107',
        borderRadius: 15,
        margin: 20
    },
    textStyle: {
        color: '#fff',
    },
    imgStyle: {
        height: 0,
        width: 0
    },
    mask: false,
    maskStyle: {},
    duration: 3000,
    animation: true,
});

export const error = (msg: string) => Toast.show(msg, {
    position: Toast.position.BOTTOM,
    containerStyle: {
        backgroundColor: '#e53935',
        borderRadius: 15,
        margin: 20
    },
    textStyle: {},
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
});