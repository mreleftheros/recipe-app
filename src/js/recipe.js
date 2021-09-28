import ui from "./ui";

class Recipe {
  constructor() {
    this.base = "https://www.themealdb.com/api/json/v1/1/";
    this.params = {
      searchByString: "search.php?s=",
      searchById: "lookup.php?i="
    };
  }
  async search(e) {
    if (e.target.value === "") {  // check
      return ui.resetSearchForm();
    } 
    
    // check if event type is input event
    if (e.type === "input") {
      const url = this.base + this.params.searchByString + e.target.value;
      const res = await fetch(url);
      const data = await res.json();

      return ui.updateRecommendedList(data.meals);
    }

    // check if event type is form submit event
    if (e.type === "submit") {
      e.preventDefault();

      const url = this.base + this.params.searchByString + e.currentTarget.searchInput.value;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.updateRecipesList(data.meals);
    }

    // else e.target is the li element in recommended list which was clicked
    if (e.target.tagName === "LI" && e.target.className.includes("recommended-list")) {
      const url = this.base + this.params.searchByString + e.target.innerText;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.updateRecipesList(data.meals);
    }

    // else e.target is the li element in recommended list which was clicked
    if (e.target.tagName === "LI" && e.target.className.includes("recipes-list")) {
      const str = e.target.lastElementChild.firstElementChild.innerText;
      const url = this.base + this.params.searchByString + str;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.createPopup(data.meals[0]);
    }

    if (e.target.tagName === "IMG" && e.target.className.includes("favorites-list")) {
      const id = e.target.parentElement.getAttribute("data-id");

      const url = this.base + this.params.searchById + id;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.createPopup(data.meals[0]);
    }
  }
}

export default new Recipe();