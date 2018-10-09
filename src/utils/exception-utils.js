const CONTENT_TYPE = {
  json: "application/json;charset=UTF-8;",
  form: "application/x-www-form-urlencoded;",
  html: "text/html;"
};

export class ExceptionUtils {
  static checkResponse(response) {
    let contentType = response.headers["content-type"];

    if (response.status === 200) {
      if (contentType.indexOf(CONTENT_TYPE.html) !== -1) {
        return response.text;
      }

      if (contentType.indexOf("application/json") !== -1) {
        let result = response.data ? response.data : JSON.parse(response.request.responseText);
        if (result.code != 0) {

          if(result.code == '302'){
            let redirectUrl = result.msg;
            location.href = redirectUrl;
            return false;
          }

          if (result.code == '00070004') {
            location.href = `/views/index.html#/shopgone?errormsg=${result.msg}`;
            return false;
          }
          else if (result.code == '00070011'){
            let redirectUrl = result.msg;
            location.href = redirectUrl;
            return false;
          }
          else {
            console.log(result.msg);
            return false;
          }
        } else {
          return result.result;
        }
      }
    } else {
      console.log(`错误信息:${response.status} ${response.statusText}`);
    }
  }
}
