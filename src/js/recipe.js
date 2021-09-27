import ui from "./ui";

class Recipe {
  constructor() {
    this.base = "https://www.themealdb.com/api/json/v1/1/";
  }
  async find(e) {
    if (e.target.value === "") {  // check
      return ui.resetSearchForm();
    } 
    
    // check if event type is input event
    if (e.type === "input") {
      const url = this.base + "search.php?s=" + e.target.value;
      const res = await fetch(url);
      const data = await res.json();

      return ui.updateRecommendedList(data.meals);
    }

    // check if event type is form submit event
    if (e.type === "submit") {
      e.preventDefault();

      const url = this.base + "search.php?s=" + e.currentTarget.searchInput.value;
      const res = await fetch(url);
      const data = await res.json();
      
      return ui.updateRecipesList(data.meals);
    }

    // else e.target is the li element in recommended list which was clicked
    const url = this.base + "search.php?s=" + e.currentTarget.innerText;
    const res = await fetch(url);
    const data = await res.json();
    
    return ui.updateRecipesList(data.meals);
  }
}

export default new Recipe();