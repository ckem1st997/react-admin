import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { Delay } from '../hepler/FunctionHelper';
import { isNullOrEmpty } from '../hepler/StringHelper';
import { ToastContent, ToastOptions, toast } from 'react-toastify';
function success(message: string) {
    toast.success(message);
}
function error(message: string) {
    toast.error(message);
}
function info(message: string) {
    toast.info(message);
}
function warn(message: string) {
    toast.warn(message);
}

// function loading(message: string) {
//     toast.loading(message);
// }
function customes(content: ToastContent<string>, options?: ToastOptions) {
    toast(content, options);
}

export const  ToastifyHelper={
    error,
    success,
    info,
    customes,
    warn,
   // loading
};
