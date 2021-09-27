import ui from "./ui";

class Recipe {
  constructor() {
    this.base = "https://www.themealdb.com/api/json/v1/1/";
  }
  async find(e) {
    if (e.target.value === "") return; // check

    const url = this.base + "search.php?s=" + e.target.value;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data.meals)
  }
}

export default new Recipe();