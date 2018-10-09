class Msg {
  static loading() {
    try {
      document.querySelector(".loading-page.loading").style.display = "block";
    } catch (e) {
    }
  }

  static hideLoading() {
    try {
      document.querySelector(".loading-page.loading").style.display = "none";
    } catch (e) {
    }
  }
}
