class LocalStorage {
  constructor() {

  }
  checkRecipe(id) {
    return this.getRecipes().filter(recipe => recipe.id === id.toString()).length > 0;
  }
  getRecipes = () => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  }
  saveRecipe(id) {
    const recipes = this.getRecipes();

    recipes.push({id});
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
  deleteRecipe(id) {
    const recipes = this.getRecipes();

    let index = recipes.indexOf(id);

    recipes.splice(index, 1);

    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
}

export default new LocalStorage();