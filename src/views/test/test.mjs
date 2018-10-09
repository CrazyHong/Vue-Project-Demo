import Vue from 'vue'
import router from './router';
// import spinner from "comps/spinner";
// import FastClick from 'fastclick';
// FastClick.attach(document.body);

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #index 匹配的元素上。
new Vue({
  el: '#app',
  router: router,
  // components:{
  //   spinner
  // }
})
