// const searchFood = food => {
//   fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + food)
//     .then(res => res.json())
//     .then(data => data.meals.forEach(meal => getfoodDetails(meal.idMeal)));
// };

// const getfoodDetails = id => {
//   fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
//     .then(res => res.json())
//     .then(data => console.log(data.meals[0]))
// }

// searchFood("lentils");

import ui from "./ui";

const init = () => {
  ui.init();
};

document.addEventListener("DOMContentLoaded", init);