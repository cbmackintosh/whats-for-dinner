
var sides = ['Miso Glazed Carrots', 'Coleslaw', 'Garden Salad', 'Crispy Potatoes', 'Sweet Potato', 'Tots', 'Coconut Rice', 'Caeser Salad', 'Shrimp Summer Rolls', 'Garlic Butter Mushrooms', 'Hush Puppies'];
var mains = ['Spaghetti and Meatballs', 'Pineapple Chicken', 'Shakshuka', 'Thai Yellow Curry', 'Bibimbap', 'Chicken Parmesean', 'Butternut Squash Soup', 'BBQ Chicken Burgers', 'Ramen', 'Empanadas', 'Chicken Fried Rice', 'Sheet Pan Fajitas', 'Margarita Pizza'];
var desserts = ['Apple Pie', 'Lemon Meringue Pie', 'Black Forest Cake', 'Banana Bread', 'Peach Cobbler', 'Cheesecake', 'Funfetti Cake', 'Baklava', 'Flan', 'Macarons', 'Macaroons', 'Chocolate', 'Cupcakes', 'Pavlova', 'Pumpkin Pie', 'Key Lime Pie', 'Tart Tatin', 'Croissants', 'Eclairs'];
var favorites = []

var findSideDish = document.querySelector('#side-button');
var findMainDish = document.querySelector('#mains-button');
var findDessert = document.querySelector('#desserts-button');
var findEntireMeal = document.querySelector('#entire-meal-button');

var homeMenu = document.querySelector('.home-menu')
var mealDisplay = document.querySelector('.meal-display')
var favoritesMenu = document.querySelector('.favorites-menu')

var letsCook = document.querySelector('.lets-cook');
var cookpot = document.querySelector('.cookpot');
var foodLog = document.querySelector('.food-log');
var foodMessage = document.querySelector('.food-message');
var clearButton = document.querySelector('.clear-button');
var removeRecipeButton = document.querySelector('.remove-recipe');
var addARecipeButton = document.querySelector('.add-a-recipe');

var navBarButtons = document.querySelector('.nav-bar-buttons');
var viewFavorites = document.querySelector('.view-favorites');
var addFavoriteButton = document.querySelector('.add-favorite');

var recipeSubmissionMenu = document.querySelector('.recipe-submission-menu-container');
var recipeSubmissionField = document.querySelector('.recipe-submission-field');
var submitNewRecipeButton = document.querySelector('.submit-new-recipe-button');
var submitNewSide = document.querySelector('.submit-side');
var submitNewMain = document.querySelector('.submit-main');
var submitNewDessert = document.querySelector('.submit-dessert');
var submitMealErrorMessage = document.querySelector('.error-message')
var exitSubmitMenu = document.querySelector('.exit-submit-menu');

var exitFavsMenu = document.querySelector('.exit-favs-menu')
var favoritesList = document.querySelector('.favorites-list')

letsCook.addEventListener('click', displayMeal);
clearButton.addEventListener('click', resetDefaultView);
addARecipeButton.addEventListener('click', displayRecipeSubmissionForm);
submitNewRecipeButton.addEventListener('click', pushUserRecipe);
addFavoriteButton.addEventListener('click', pushRecipeToFavs);
viewFavorites.addEventListener('click', displayFavoritesView);
exitFavsMenu.addEventListener('click', resetDefaultView);
exitSubmitMenu.addEventListener('click', resetDefaultView);
removeRecipeButton.addEventListener('click', removeRecipeFunc);

function displayMeal() {
  var meal;
  if (findSideDish.checked === true) {
    meal = findRandomSingleDish(sides);
  } else if (findMainDish.checked === true) {
    meal = findRandomSingleDish(mains);
  } else if (findDessert.checked === true) {
    meal = findRandomSingleDish(desserts);
  } else if (findEntireMeal.checked === true) {
    meal = `${findRandomSingleDish(mains)} with a side of ${findRandomSingleDish(sides)} and ${findRandomSingleDish(desserts)} for dessert!`
  } else {
    return;
  }
  foodLog.innerText = meal;
  displayMealView()
  resetRadioButtons([findSideDish, findMainDish, findDessert, findEntireMeal])
}

function findRandomSingleDish(course) {
  return course[Math.floor(Math.random() * course.length)];
}

function displayMealView() {
  hideElement([cookpot])
  showElement([foodLog, foodMessage, clearButton, addFavoriteButton, removeRecipeButton])
}

function hideMealDisplay() {
  hideElement([foodMessage, foodLog, clearButton, removeRecipeButton]);
}

function resetDefaultView() {
  showElement([homeMenu, mealDisplay, cookpot, navBarButtons]);
  hideElement([addFavoriteButton,favoritesMenu,recipeSubmissionMenu]);
  resetRadioButtons([findSideDish, findMainDish, findDessert, findEntireMeal]);
  hideMealDisplay();
  resetForm();
  favoritesList.innerHTML = '';
}

function removeRecipeFunc() {
  spliceElementFromArray(sides, foodLog.innerText);
  spliceElementFromArray(mains, foodLog.innerText);
  spliceElementFromArray(desserts, foodLog.innerText);
  foodLog.innerText = 'RECIPE REMOVED'
  hideElement([foodMessage, addFavoriteButton]);
}

//USER SUBMITTED RECIPE FORM

function displayRecipeSubmissionForm() {
  showElement([recipeSubmissionMenu]);
}

function pushUserRecipe() {
  // declare variable set to user input in field
  // call new function
  // check for dups, if not {}
  // array.push((recipeSubmissionField.value.toUpperCase())
  // display meal view func
  // foodLog.innerText =
  if (submitNewSide.checked === true && checkArrayForDups(sides, recipeSubmissionField.value) === false) {
    sides.push(convertToTitleCase(recipeSubmissionField.value));
    foodLog.innerText = convertToTitleCase(recipeSubmissionField.value);
    displayMealView()
  } else if (submitNewMain.checked === true && checkArrayForDups(mains, recipeSubmissionField.value) === false) {
    mains.push(convertToTitleCase(recipeSubmissionField.value));
    foodLog.innerText = convertToTitleCase(recipeSubmissionField.value);
    displayMealView()
  } else if (submitNewDessert.checked === true && checkArrayForDups(desserts, recipeSubmissionField.value) === false) {
    desserts.push(convertToTitleCase(recipeSubmissionField.value));
    foodLog.innerText = convertToTitleCase(recipeSubmissionField.value);
    displayMealView()
  } else {
    return;
  }
}

// function to access the array of selected radio button

function resetForm() {
  resetRadioButtons([submitNewSide, submitNewMain,submitNewDessert]);
  recipeSubmissionField.value = '';
}

//FAVORITES MENU

function displayFavoritesView() {
  hideElement([homeMenu, recipeSubmissionMenu, mealDisplay, navBarButtons])
  showElement([favoritesMenu]);
  listFavorites();
}

function listFavorites() {
  for (i = 0; i < favorites.length; i++) {
    favoritesList.innerHTML += `<li>${favorites[i]}<button class= 'delete-fav' id=${[i]}>DELETE</button></li>`
  }
  var listItems = document.querySelectorAll('.delete-fav');
  for (i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', deleteFavRecipe);
  }
}

function deleteFavRecipe() {
  favorites.splice(event.target.closest('.delete-fav').id, 1);
  favoritesList.innerHTML = '';
  displayFavoritesView();
}

function pushRecipeToFavs() {
  if (checkArrayForDups(favorites, foodLog.innerText) === false) {
    favorites.push(foodLog.innerText);
  } else {
    foodLog.innerText = 'This recipe is already in your favorites.';
  }
}

// HELPER FUNCTIONS:

function convertToTitleCase(string) {
  string = string.toLowerCase().split(' ');
  for (i = 0; i < string.length; i++) {
    string[i] = string[i][0].toUpperCase() + string[i].slice(1);
  }
  return string.join(' ');
}

function checkArrayForDups(array, string) {
  if (array.includes(convertToTitleCase(string))) {
    return true;
  } else {
    return false;
  }
}

function spliceElementFromArray(array, string) {
  if (array.includes(string)) {
    array.splice(array.indexOf(string), 1);
  }
}

function hideElement(elements) {
  for (i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  }
}

function showElement(elements) {
  for (i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  }
}

function resetRadioButtons(buttons) {
  for (i = 0; i < buttons.length; i++) {
    buttons[i].checked = false;
  }
}
