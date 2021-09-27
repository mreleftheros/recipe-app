import recipe from "./recipe";

class UI {
  constructor() {
    this.searchForm = document.getElementById("searchForm");
    this.searchInput = document.getElementById("searchInput");
  }
  init() {
    this.searchInput.addEventListener("focus", this.toggleForm);
    this.searchInput.addEventListener("blur", this.toggleForm);
    this.searchInput.addEventListener("input", e => recipe.find(e));
  }
  toggleForm(e) {
    if (e.type === "focus") {
      e.currentTarget.parentElement.classList.add("active");
      e.currentTarget.placeholder = "";
    } 
    else if (e.type === "blur") {
      e.currentTarget.parentElement.classList.remove("active");
      e.currentTarget.placeholder = "Search for a recipe...";
    }
  }
}

export default new UI();