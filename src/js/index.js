import ui from "./ui";
import recipe from "./recipe";
import localStorage from "./localStorage";

const init = () => {
  ui.init();
  console.log(localStorage.checkRecipe(52869));
};

document.addEventListener("DOMContentLoaded", init);