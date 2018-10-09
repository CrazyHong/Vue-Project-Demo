import $ls from "./local-storage";

class Tools {
  static setLoc(key, val) {
    return $ls.set(key, val);
  }

  static getLoc(key) {
    return $ls.get(key);
  }

  static clearLoc() {
    $ls.clear();
  }

  static clearCookie() {
    let cookies = document.cookie.split(";");
    _.each(cookies, cookie => {
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
  }
}

export {
  Tools
}
