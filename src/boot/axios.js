import { boot } from "quasar/wrappers";
import axios from "axios";
//import { userStore } from "src/stores/user";
//import { router } from "src/router";

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('app_toDo_token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  //const user_store = userStore();

  const responseInterceptor = (response) => {
    return response;
  };

  const errorInterceptor = (error) => {
    console.log(error)
    return Promise.reject(error);
  };

  api.interceptors.response.use(responseInterceptor, errorInterceptor);
});

/**
 * * Se esta usando Options Api, consegue acessar com this.$api ou this.$axios
 * * Se esta usando setup, tem que importar a api esse arquivo dentro do componente
 * import { api } from "boot/axios";
 */

export { api };
