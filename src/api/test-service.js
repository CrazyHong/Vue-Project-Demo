import {BaseService} from "./base-service";
import {HttpClient} from "../utils/http-client";

export class TestService extends BaseService{
  constructor(){
    super("interfaceFunction/");
  }

  getData() {  //接收数据
    return HttpClient.get(`${this.apiContext}get`);
  }

  postData(name,tel,countyId,addrDetail){  //提交数据
    return HttpClient.post(`${this.apiContext}add`,{
      body:{
        recipientName: name,
        mobile:tel,
        countyId:countyId,
        address:addrDetail
      }
    });
  }
}
