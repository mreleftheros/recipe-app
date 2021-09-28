import recipe from "./recipe";
import localStorage from "./localStorage";

class UI {
  constructor() {
    this.searchForm = document.getElementById("searchForm");
    this.searchInput = document.getElementById("searchInput");
    this.recommendedList = document.getElementById("recommendedList");
    this.recipesList = document.getElementById("recipesList");
    this.favoritesList = document.getElementById("favoritesList");
    this.popupContainer;
    this.popupCloseBtn;
  }
  init() {
    this.searchInput.addEventListener("focus", e => this.toggleForm(e));
    this.searchInput.addEventListener("blur", e => this.toggleForm(e));
    this.searchInput.addEventListener("input", e => recipe.search(e));
    this.searchForm.addEventListener("submit", e => recipe.search(e));
    this.recommendedList.addEventListener("click", e => recipe.search(e));
    this.recipesList.addEventListener("click", e => this.handleRecipeClick(e));
    this.favoritesList.addEventListener("click", e => this.handleFavoritesClick(e));
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

      // this.recommendedList.classList.remove("active");
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

      fragment.appendChild(liElement);
    })

    this.recommendedList.appendChild(fragment);
  }
  resetSearchForm() {
    this.recommendedList.innerHTML = "";
    this.recommendedList.classList.remove("active");

    // this.searchInput.blur();
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
          <button type="button" class="${classText}">${iconText}</button>
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
      return recipe.search(e);
    }
  }
  toggleIcon(e, id, imgSrc) {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      e.target.innerHTML = "&#x1F90D;";

      localStorage.deleteRecipe(id);
      return this.updateFavoritesList();
    } 
    else if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      e.target.innerHTML = "&#x1F499";

      localStorage.saveRecipe(id, imgSrc);
      return this.updateFavoritesList();
    }
  }
  updateFavoritesList() {
    this.favoritesList.innerHTML = "";

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
  createPopup(meal) {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");
    popupContainer.id = "popupContainer";

    const popupElement= document.createElement("div");
    popupElement.classList.add("popup-container__popup"); 

    let ingredientsListHtml = ""; 

    for (let i = 1; i <= 20; i++) {
      if (!meal[`strIngredient${i}`]) continue;

      let html = `
        <li class="popup-container__popup__ingredients__list__item">
          ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        </li>
      `;

      ingredientsListHtml += html;
    }

    let html = `
      <figure class="popup-container__popup__figure">
        <figcaption class="popup-container__popup__figure__title">${meal.strMeal}</figcaption>
        <img class="popup-container__popup__figure__img" src=${meal.strMealThumb}>
      </figure>
      <div class="popup-container__popup__ingredients">
        <h3 class="popup-container__popup__ingredients__title">Ingredients</h3>
        <ul class="popup-container__popup__ingredients__list">${ingredientsListHtml}</ul>
      </div>
      <div class="popup-container__popup__instructions">
        <p class="popup-container__popup__instructions__text">${meal.strInstructions}</p>
      </div>
      <button type="button" id="popupCloseBtn" class="popup-container__popup__close">X</button>
    `;

    popupElement.innerHTML = html;

    popupContainer.appendChild(popupElement);

    document.body.appendChild(popupContainer);
    
    this.popupCloseBtn = document.getElementById("popupCloseBtn");
    this.popupCloseBtn.addEventListener("click", this.closePopup);
  }
  closePopup() {
    this.popupContainer = document.getElementById("popupContainer");
    this.popupContainer.remove();
  }
  handleFavoritesClick(e) {
    if (e.target.tagName === "LI") return; // check

    if (e.target.tagName === "IMG") {
      return recipe.search(e);
    }
    else if (e.target.tagName === "SPAN") {
      return this.deleteFromFavorites(e);
    }
  }
  deleteFromFavorites(e) {
    const id = e.target.parentElement.getAttribute("data-id");
    const favorite = document.querySelector(`[data-id="${id}"]`);

    localStorage.deleteRecipe(id);
    favorite.remove();
  }
}

export default new UI();