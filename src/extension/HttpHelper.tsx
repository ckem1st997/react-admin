import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { Delay } from '../hepler/FunctionHelper';
import { isNullOrEmpty } from '../hepler/StringHelper';
import { start } from 'repl';
import { MessageHelper } from '../hepler/MessageHelper';
import { json, useNavigate } from 'react-router-dom';

class Repository {
  private axiosInstance: AxiosInstance;
  constructor(baseURL?: string) {
    if (isNullOrEmpty(baseURL))
      throw Error("Lỗi base url env !");
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig) {
    await Delay(1000);
    try {
      var res = await this.axiosInstance.get<T>(url, config);
      return res.data;
    } catch (error: any) {
      await this.HanderResponse(error)
    }
  }

  public async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return await this.axiosInstance.post<T, R>(url, data, config);
  }

  private async HanderResponse(res: AxiosError) {
    const currentURL = window.location.pathname;
    switch (res.response?.status) {
      case 401:
        MessageHelper.Fails('Xin vui lòng đăng nhập lại !');
        await Delay(500);
        window.location.href = '/auth/login?callback=' + currentURL;
        break;
      case 404:
        throw new Response("Trang web không tồn tại !", { status: res.response?.status });
      case 403:
        MessageHelper.Fails('Bạn không có quyền thực hiện chức năng này !');
        break;
      case 500:
        MessageHelper.Fails('Có lỗi xảy ra ở máy chủ, xin vui lòng thử lại ! !');
        break;
      default:
        break
    }
  }
}

export default Repository;








// axios.get<MessageResponse<T>>('http://localhost:5005/api/v1/WareHouses/get-list?Skip=1&Take=11') // Thay URL bằng URL API thực tế
//   .then(response => {
//     console.log(response.data); // Xử lý dữ liệu ở đây
//   })
//   .catch(error => {
//     console.error('There was a problem with the request:', error);
//   });
