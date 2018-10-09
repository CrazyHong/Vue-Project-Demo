const $ls = {};
$ls.get = function (e) {
  let storageValue = localStorage.getItem(e);
  if(null === storageValue || "undefined" == storageValue || "undefined" == typeof storageValue){
    return null;
  }
  return JSON.parse(localStorage.getItem(e))
}, $ls.set = function (e, t) {
  localStorage.setItem(e, JSON.stringify(t))
}, $ls.isSet = function (e) {
  var t = $ls.get(e);
  return null === t || "undefined" == typeof t ? !1 : !0
}, $ls.remove = function (e) {
  localStorage.removeItem(e)
}, $ls.clear =  function(){
  localStorage.clear();
};

export default $ls;
