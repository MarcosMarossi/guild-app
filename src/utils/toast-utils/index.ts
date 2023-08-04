import Toast from "react-native-tiny-toast";

export const toastSuccess = (msg: string) => Toast.showSuccess(msg,{
    position: Toast.position.BOTTOM,
    containerStyle:{
     backgroundColor: '#448aff',
     borderRadius: 15,
     margin: 20
    },
    textStyle:{
     color:'#fff',
    },
    mask:false,
    maskStyle:{},
    duration: 3000,
    animation: true,
});

export const toastValidation = (msg: string) => Toast.show(msg,{
    position: Toast.position.BOTTOM,
    containerStyle:{
     backgroundColor: '#ffc107',
     borderRadius: 15,
     margin: 20
    },
    textStyle:{
     color:'#fff',
    },
    imgStyle:{},
    mask:false,
    maskStyle:{},
    duration: 3000,
    animation: true,
});

export const toastError = (msg: string) => Toast.show(msg, {
    position: Toast.position.BOTTOM,
    containerStyle:{
        backgroundColor: '#e53935',
        borderRadius: 15,
        margin: 20
    },
    textStyle:{},
    imgStyle:{},
    mask:false,
    maskStyle:{},
    duration: 2000,
    animation: true,
});