class UI {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
  }
  init() {
    this.searchInput.addEventListener("focus", e => {
      e.currentTarget.parentElement.classList.add("active");
      e.currentTarget.placeholder = "";
    });
    this.searchInput.addEventListener("blur", e => {
      e.currentTarget.parentElement.classList.remove("active");
      e.currentTarget.placeholder = "Search for a recipe...";
    });
  }
}

const ui = new UI();

export default ui;