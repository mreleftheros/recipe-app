import ui from "./ui";

class Recipe {
  constructor() {
    this.base = "https://www.themealdb.com/api/json/v1/1/";
    this.params = "search.php?s=";
  }
  async search(e) {
    if (e.target.value === "") {  // check
      return ui.resetSearchForm();
    } 
    
    // check if event type is input event
    if (e.type === "input") {
      const url = this.base + this.params + e.target.value;
      const res = await fetch(url);
      const data = await res.json();

      return ui.updateRecommendedList(data.meals);
    }

    // check if event type is form submit event
    if (e.type === "submit") {
      e.preventDefault();

      const url = this.base + this.params + e.currentTarget.searchInput.value;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.updateRecipesList(data.meals);
    }

    // else e.target is the li element in recommended list which was clicked
    if (e.target.tagName === "LI" && e.target.className.includes("recommended-list")) {
      const url = this.base + this.params+ e.target.innerText;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.updateRecipesList(data.meals);
    }

    // else e.target is the li element in recommended list which was clicked
    if (e.target.tagName === "LI" && e.target.className.includes("recipes-list")) {
      const url = this.base + this.params+ e.target.innerText;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.createPopup();
    }
  }
}

export default new Recipe();