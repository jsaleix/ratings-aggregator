import { toast, type ToastOptions } from "react-toastify";

export function displayMsg(msg: string, type: "success" | "error" = "success") {
    const settings = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    } satisfies ToastOptions;

    switch (type) {
        case "success":
            toast.success(msg, settings);
            break;
        case "error":
            toast.error(msg, settings);
            break;
        default:
            toast(msg, settings);
    }
}

export function notify(msg: string) {
    toast.info(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
