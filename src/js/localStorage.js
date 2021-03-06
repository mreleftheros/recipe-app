class LocalStorage {
  constructor() {

  }
  checkRecipe(id) {
    return this.getRecipes().filter(recipe => recipe.id === id.toString()).length > 0;
  }
  getRecipes = () => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  }
  saveRecipe(id, imgSrc) {
    const recipes = this.getRecipes();

    let index = recipes.findIndex(recipe => {
      recipe.id === id;
    });

    if (index === -1) {
      recipes.push({id, imgSrc});
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }
  deleteRecipe(id) {
    const recipes = this.getRecipes();

    let index = recipes.indexOf(id);

    recipes.splice(index, 1);

    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
}

export default new LocalStorage();