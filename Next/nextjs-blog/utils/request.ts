import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// http错误信息
const codeMessage: Record<number, string> = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const request = axios.create({
  baseURL: '/',
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: any) => {
    Promise.reject(error);
  },
);
request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const { data } = response;
    if (data.code !== 0 && data.statusCode !== '000000') {
      return Promise.reject(data.msg || data.statusMsg);
    }
    return data;
  },
  (error: any) => {
    const { status, data } = error.response;
    if (status !== 200) {
      const errorText = data.msg || codeMessage[status];
      return errorText;
    }
  },
);
export default request;
