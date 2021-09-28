import ui from "./ui";
import recipe from "./recipe";
import localStorage from "./localStorage";

const init = () => {
  ui.init();
  ui.updateFavoritesList();
};

document.addEventListener("DOMContentLoaded", init);