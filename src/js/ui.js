import recipe from "./recipe";

class UI {
  constructor() {
    this.searchForm = document.getElementById("searchForm");
    this.searchInput = document.getElementById("searchInput");
    this.recommendedList = document.getElementById("recommendedList");
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
  updateRecommendedList(meals) {
    const fragment = new DocumentFragment();
    this.recommendedList.innerHTML = "";

    if(meals.length === 0) {
      this.recommendedList.classList.remove("active");
      return;
    }

    this.recommendedList.classList.add("active");

    meals.forEach(meal => {
      const liElement = document.createElement("li");
      liElement.classList.add("main__container__form__recommended-list__item");
      liElement.textContent = meal.strMeal;

      liElement.addEventListener("click", e => recipe.find(e))

      fragment.appendChild(liElement);
    })

    this.recommendedList.appendChild(fragment);
  }
  resetSearchForm() {
    this.recommendedList.innerHTML = "";
    this.recommendedList.classList.remove("active");

    this.searchForm.reset();
  }
}

export default new UI();