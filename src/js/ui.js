import recipe from "./recipe";
import localStorage from "./localStorage";

class UI {
  constructor() {
    this.searchForm = document.getElementById("searchForm");
    this.searchInput = document.getElementById("searchInput");
    this.recommendedList = document.getElementById("recommendedList");
    this.recipesList = document.getElementById("recipesList");
  }
  init() {
    this.searchInput.addEventListener("focus", e => this.toggleForm(e));
    this.searchInput.addEventListener("blur", e => this.toggleForm(e));
    this.searchInput.addEventListener("input", e => recipe.find(e));
    this.searchForm.addEventListener("submit", e => recipe.find(e));
    this.recipesList.addEventListener("click", e => this.handleClick(e));
  }
  toggleForm(e) {
    if (e.type === "focus") {
      e.currentTarget.parentElement.classList.add("active");
      e.currentTarget.placeholder = "";

      if (this.searchInput.value.length > 0)
        this.recommendedList.classList.add("active");
    } 
    else if (e.type === "blur") {
      e.currentTarget.parentElement.classList.remove("active");
      e.currentTarget.placeholder = "Search for a recipe...";
    }
  }
  updateRecommendedList(meals) {
    const fragment = new DocumentFragment();
    this.recommendedList.innerHTML = "";

    if(!meals) { // check
      this.recommendedList.classList.remove("active");
      return;
    }

    this.recommendedList.classList.add("active");

    meals.forEach(meal => {
      const liElement = document.createElement("li");
      liElement.classList.add("main__container__form__recommended-list__item");
      liElement.textContent = meal.strMeal;

      liElement.addEventListener("click", e => recipe.find(e));

      fragment.appendChild(liElement);
    })

    this.recommendedList.appendChild(fragment);
  }
  resetSearchForm() {
    this.recommendedList.innerHTML = "";
    this.recommendedList.classList.remove("active");

    this.searchForm.reset();
  }
  updateRecipesList(meals) {
    this.recipesList.innerHTML = "";
    this.recipesList.classList.add("active");
    this.resetSearchForm();

    const fragment = new DocumentFragment();

    meals.forEach(meal => {
      // create item
      const liElement = document.createElement("li");
      liElement.classList.add("main__container__recipes-list__item");
      liElement.setAttribute("data-id", meal.idMeal);

      let iconText = localStorage.checkRecipe(meal.idMeal) ? "&#x1F499;" : "&#x2661;";
      let classText = localStorage.checkRecipe(meal.idMeal) ? "main__container__recipes-list__item__body__icon active" : "main__container__recipes-list__item__body__icon";
      
      let html = `
        <div class="main__container__recipes-list__item__header">
          <img class="main__container__recipes-list__item__header__img" src=${meal.strMealThumb}>
        </div>
        <div class="main__container__recipes-list__item__body">
          <h2 class="main__container__recipes-list__item__body__title">${meal.strMeal}</h2>
          <span class=${classText}>${iconText}</span>
        </div>
      `;

      liElement.innerHTML = html;

      fragment.appendChild(liElement);
    })

    this.recipesList.appendChild(fragment);
  }
  handleClick(e) {
    if (e.target.tagName === "SPAN" && e.target.className.includes("icon")) {
      e.stopPropagation();

      const id = e.target.parentElement.parentElement.getAttribute("data-id");

      this.toggleIcon(e, id);
    }
  }
  toggleIcon(e, id) {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      e.target.innerText = "&#x2661;";
      return localStorage.deleteRecipe(id);
    } 
    else if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      e.target.innerText = "&#x1F499;";
      return localStorage.saveRecipe(id);
    }
  }
}

export default new UI();