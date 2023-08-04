export const formatNumberUtil = (phone: string) => {   
    if(typeof phone == 'undefined')
        return;
     
    const whatsapp = phone.replace(/(\d{2})(\d{5})(\d{4})/,
        function( regex, arg1, arg2, arg3) {
            return `(${arg1}) ${arg2}-${arg3}`;
        }
    );    

    return whatsapp;
}