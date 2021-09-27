class LocalStorage {
  constructor() {

  }
  getRecipes = () => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  }
  saveRecipe(id) {
    const recipes = this.getRecipes();

    recipes.push({id});
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
}

export default new LocalStorage();