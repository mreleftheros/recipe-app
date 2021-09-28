import recipe from "./recipe";
import localStorage from "./localStorage";

class UI {
  constructor() {
    this.searchForm = document.getElementById("searchForm");
    this.searchInput = document.getElementById("searchInput");
    this.recommendedList = document.getElementById("recommendedList");
    this.recipesList = document.getElementById("recipesList");
    this.favoritesList = document.getElementById("favoritesList");
  }
  init() {
    this.searchInput.addEventListener("focus", e => this.toggleForm(e));
    this.searchInput.addEventListener("blur", e => this.toggleForm(e));
    this.searchInput.addEventListener("input", e => recipe.find(e));
    this.searchForm.addEventListener("submit", e => recipe.find(e));
    this.recipesList.addEventListener("click", e => this.handleRecipeClick(e));
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

    this.searchInput.blur();
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

      let iconText = localStorage.checkRecipe(meal.idMeal) ? "&#x1F499;" : "&#x1F90D;";
      let classText = localStorage.checkRecipe(meal.idMeal) ? "main__container__recipes-list__item__body__icon active" : "main__container__recipes-list__item__body__icon";
      
      let html = `
        <div class="main__container__recipes-list__item__header">
          <img class="main__container__recipes-list__item__header__img" src=${meal.strMealThumb}>
        </div>
        <div class="main__container__recipes-list__item__body">
          <h2 class="main__container__recipes-list__item__body__title">${meal.strMeal}</h2>
          <button type="button" class=${classText}>${iconText}</button>
        </div>
      `;

      liElement.innerHTML = html;

      fragment.appendChild(liElement);
    })

    this.recipesList.appendChild(fragment);
  }
  handleRecipeClick(e) {
    if (e.target.tagName === "BUTTON" && e.target.className.includes("icon")) {
      e.stopPropagation();

      const id = e.target.parentElement.parentElement.getAttribute("data-id");
      const imgSrc = e.target.parentElement.parentElement.firstElementChild.firstElementChild.src;

      this.toggleIcon(e, id, imgSrc);
    }
    else if (e.target.tagName === "LI") {
      console.log("hey")
    }
  }
  toggleIcon(e, id, imgSrc) {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      e.target.innerHTML = "&#x1F90D;";
      return localStorage.deleteRecipe(id);
    } 
    else if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      e.target.innerHTML = "&#x1F499";
      return localStorage.saveRecipe(id, imgSrc);
    }
  }
  updateFavoritesList() {
    const recipes = localStorage.getRecipes();
    const fragment = new DocumentFragment();

    recipes.forEach(recipe => {
      const liElement = document.createElement("li");
      liElement.className = "main__container__favorites__favorites-list__item";
      liElement.setAttribute("data-id", recipe.id);
  
      const imgElement = new Image();
      imgElement.className = "main__container__favorites__favorites-list__item__img";
      imgElement.src = recipe.imgSrc; 

      const spanElement = document.createElement("span");
      spanElement.className = "main__container__favorites__favorites-list__item__delete";
      spanElement.textContent = "X";

      liElement.appendChild(imgElement);
      liElement.appendChild(spanElement);
      fragment.appendChild(liElement);
    })

    this.favoritesList.appendChild(fragment);
  }
}

export default new UI();