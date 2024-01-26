import {toast} from "react-toastify";

export const Library = {
    showToast :  (message , type , position , closeTime , bgColor = undefined)=>
    {
        return (
            toast(message, {
                type : type,
                position: position,
                autoClose : closeTime,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: bgColor, // Change the background color here
                    position : "absolute"
                },
            })
        )
    }

}

