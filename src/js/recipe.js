import ui from "./ui";

class Recipe {
  constructor() {
    this.base = "https://www.themealdb.com/api/json/v1/1/";
  }
  async find(e) {
    if (e.target.value === "") {  // check
      ui.updateRecommendList([]);
      return;
    } 

    const url = this.base + "search.php?s=" + e.target.value;

    const res = await fetch(url);
    const data = await res.json();

    ui.updateRecommendList(data.meals);
  }
}

export default new Recipe();