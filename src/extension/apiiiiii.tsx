import axios from 'axios';

const axiosInstance = axios.create({
  // Cấu hình Axios theo ý muốn
});

// Hàm xử lý API chung
const callApi = async (endpoint:any, options:any) => {
  try {
    const response = await axiosInstance(endpoint, options);
    return response.data;
  } catch (error:any) {
    debugger
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Xử lý khi status code là 401 (chuyển sang trang đăng nhập)
        // Ví dụ: redirect đến trang đăng nhập
        throw new Response("Bạn chưa đăng nhập !", { status: 401 });
      } else if (status === 403) {
        // Xử lý khi status code là 403 (thông báo quyền)
        // Ví dụ: hiển thị thông báo
        console.log('Bạn không có quyền thực hiện chức năng này');
      } else {
        // Xử lý các status code khác ở đây (nếu cần)
        // Ví dụ: hiển thị thông báo lỗi khác
        console.log('Có lỗi xảy ra: ' + status);
      }
    } else {
      // Xử lý lỗi không liên quan đến response status (nếu cần)
      console.log('Lỗi không xác định: ' + error.message);
    }
    throw error; // Để cho phép các thành phần gọi xử lý lỗi dưới dạng thông báo
  }
};

export default callApi;
