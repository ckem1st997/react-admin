import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { Delay } from '../hepler/FunctionHelper';
import { isNullOrEmpty } from '../hepler/StringHelper';

class Repository {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    if (isNullOrEmpty(baseURL))
      throw Error("Lỗi base url env !");
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    await Delay(1000);
    try {
      var res = await this.axiosInstance.get<R>(url, config);
      if (res.status === 200)
        
      switch (res.status) {
        case 200:
          return res.data;      
        default:
          break;
      }
      throw new Error('');
    } catch (error) {
      console.log(error)
    }
    return undefined;
  }

  public async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return await this.axiosInstance.post<T, R>(url, data, config);
  }

  private HanderResponse() {

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
