import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (response) => {

    const toastConfig = { autoClose: 3000 };


    if (response.success) {
        toast.success(response.msg, toastConfig);
    } else {
        toast.error(response.msg, toastConfig);
    }
};
