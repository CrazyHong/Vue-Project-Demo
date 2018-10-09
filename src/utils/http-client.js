import axios from "axios";
import "es6-promise/auto"
import {ExceptionUtils} from "./exception-utils";
import {querystring} from "vux";

const CONTENT_TYPE = {
  json: "application/json;charset=UTF-8;",
  form: "application/x-www-form-urlencoded;",
  html: "text/html;"
};
const CONTENT_TYPE_KEY = 'Content-Type';

const protocol = "https:";
export const API_URL = `${protocol}//domain/api_context`;

axios.defaults.headers.common['Accept'] = "*/*";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(ExceptionUtils.checkResponse, (error) => {
  // Do something with response error
  if (error.message == "Network Error") {
    console.log(error)
  }
  return Promise.reject(error);
});

export class HttpClient {

  static call(url, {method = 'get', headers = null, body = null, mask = true, postData = false, external = false} = {}) {
    url = external ? url : API_URL + url;
    if (url.indexOf("?") === -1) {
      url += "?";
    }
    else {
      url += "&";
    }

    url += `_t=${new Date().getTime()}`;
    // if (ENV.DEBUG) {
    //   url += "&" + ENV.DEBUG_STR;
    // }
    //alert(location);

    let params = {
      baseURL: API_URL,
      method: method,
      url: url,
      responseType: "json",
      headers: {}
    };

    if (headers) {
      Object.assign(params.headers, headers);
    }

    if (method === 'get') {
      params.params = body;
    }
    else {
      params.data = postData ? body : querystring.stringify(body);
    }

    if (mask) {
      Msg.loading();
    }

    return axios(params);
  }

  static get(url, {mask = true, external = false} = {}) {
    return HttpClient.call(url, {
      external,
      mask
    });
  }

  static post(url, {body = {}, method = "post", mask = true, postData = false, external = true} = {}) {
    return HttpClient.call(url, {
      method,
      headers: {
        [CONTENT_TYPE_KEY]: CONTENT_TYPE.form
      },
      body: body,
      external,
      postData,
      mask,
    });
  }

  static put(url, {body = {}, mask = true, postData = false, external = false} = {}) {
    return HttpClient.post(url, {body, method: "put", postData, external, mask});
  }

  static destroy(url, {body = {}, mask = true, postData = false, external = false} = {}) {
    return HttpClient.post(url, {body, method: "delete", postData, external, mask});
  }

  static postBody(url, {body = {}, method = "post", mask = true, postData = true, external = false}) {
    return HttpClient.call(url, {
      method,
      headers: {
        [CONTENT_TYPE_KEY]: CONTENT_TYPE.json
      },
      body: body,
      postData,
      external,
      mask
    });
  }
}
