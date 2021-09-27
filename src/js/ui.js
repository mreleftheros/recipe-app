import recipe from "./recipe";

class UI {
  constructor() {
    this.searchForm = document.getElementById("searchForm");
    this.searchInput = document.getElementById("searchInput");
    this.recommendList = document.getElementById("recommendList");
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
  updateRecommendList(meals) {
    const fragment = new DocumentFragment();
    this.recommendList.innerHTML = "";

    if(meals.length === 0) {
      this.recommendList.classList.remove("active");
      return;
    }

    this.recommendList.classList.add("active");

    meals.forEach(meal => {
      const liElement = document.createElement("li");
      liElement.classList.add("main__container__form__recommend-list__item");
      liElement.textContent = meal.strMeal;

      fragment.appendChild(liElement);
    })

    this.recommendList.appendChild(fragment);
  }
}

export default new UI();