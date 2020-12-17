
var sides = ['MISO GLAZED CARROTS', 'COLESLAW', 'GARDEN SALAD', 'CRISPY POTATOES', 'SWEET POTATO TOTS', 'COCONUT RICE', 'CAESER SALAD', 'SHRIMP SUMMER ROLLS', 'GARLIC BUTTER MUSHROOMS', 'HUSH PUPPIES'];
var mains = ['SPAGHETTI AND MEATBALLS', 'PINEAPPLE CHICKEN', 'SHAKSHUKA', 'THAI YELLOW CURRY', 'BIBIMBAP', 'CHICKEN PARMESEAN', 'BUTTERNUT SQUASH SOUP', 'BBQ CHICKEN BURGERS', 'RAMEN', 'EMPANADAS', 'CHICKEN FRIED RICE', 'SHEET PAN FAJITAS', 'MARGARITA PIZZA'];
var desserts = ['APPLE PIE', 'LEMON MERINGUE PIE', 'BLACK FOREST CAKE', 'BANANA BREAD', 'PEACH COBBLER', 'CHEESECAKE', 'FUNFETTI CAKE', 'BAKLAVA', 'FLAN', 'MACARONS', 'MACAROONS', 'CHOCOLATE CUPCAKES', 'PAVLOVA', 'PUMPKIN PIE', 'KEY LIME PIE', 'TART TATIN', 'CROISSANTS', 'ECLAIRS'];
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
  if (findSideDish.checked === true) {
    findRandomSingleDish(sides);
  } else if (findMainDish.checked === true) {
    findRandomSingleDish(mains);
  } else if (findDessert.checked === true) {
    findRandomSingleDish(desserts);
  } else if (findEntireMeal.checked === true) {
    foodLog.innerText = `${mains[Math.floor(Math.random() * mains.length)]} with a side of ${sides[Math.floor(Math.random() * sides.length)]} and ${desserts[Math.floor(Math.random() * desserts.length)]} for dessert!`
    displayMealView()
  } else {
    return;
  }
  resetRadioButtons()
}

function findRandomSingleDish(course) {
  foodLog.innerText = course[Math.floor(Math.random() * course.length)];
  displayMealView()
}

function displayMealView() {
  hideElement(cookpot)
  showElement(foodLog)
  showElement(foodMessage)
  showElement(clearButton)
  showElement(addFavoriteButton)
  showElement(removeRecipeButton)
}

function hideMealDisplay() {
  hideElement(foodMessage)
  hideElement(foodLog)
  hideElement(clearButton)
  hideElement(removeRecipeButton);
}

function resetDefaultView() {
  showElement(homeMenu);
  showElement(mealDisplay);
  resetRadioButtons();
  showElement(cookpot);
  hideMealDisplay();
  hideElement(addFavoriteButton);
  hideElement(favoritesMenu);
  hideElement(recipeSubmissionMenu);
  showElement(navBarButtons);
  resetForm();
  favoritesList.innerHTML = '';
}

function removeRecipeFunc() {
  spliceElementFromArray(sides, foodLog.innerText);
  spliceElementFromArray(mains, foodLog.innerText);
  spliceElementFromArray(desserts, foodLog.innerText);
  foodLog.innerText = 'RECIPE REMOVED'
  hideElement(foodMessage);
}

//USER SUBMITTED RECIPE FORM

function displayRecipeSubmissionForm() {
  showElement(recipeSubmissionMenu);
}

function pushUserRecipe() {
  if (submitNewSide.checked === true && checkArrayForDups(sides, recipeSubmissionField.value) === false) {
    sides.push(recipeSubmissionField.value.toUpperCase());
    foodLog.innerText = recipeSubmissionField.value.toUpperCase();
    displayMealView()
  } else if (submitNewMain.checked === true && checkArrayForDups(mains, recipeSubmissionField.value) === false) {
    mains.push(recipeSubmissionField.value.toUpperCase());
    foodLog.innerText = recipeSubmissionField.value.toUpperCase();
    displayMealView()
  } else if (submitNewDessert.checked === true && checkArrayForDups(desserts, recipeSubmissionField.value) === false) {
    desserts.push(recipeSubmissionField.value.toUpperCase());
    foodLog.innerText = recipeSubmissionField.value.toUpperCase();
    displayMealView()
  } else {
    return;
  }
}

function resetForm() {
  submitNewSide.checked = false;
  submitNewMain.checked = false;
  submitNewDessert.checked = false;
  recipeSubmissionField.value = '';
}

//FAVORITES MENU

function displayFavoritesView() {
  hideElement(homeMenu);
  hideElement(recipeSubmissionMenu);
  hideElement(mealDisplay);
  showElement(favoritesMenu);
  hideElement(navBarButtons)
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
  displayFavoritesView()
}

function pushRecipeToFavs() {
  if (checkArrayForDups(favorites, foodLog.innerText) === false) {
    favorites.push(foodLog.innerText);
  }
}

// HELPER FUNCTIONS:

function checkArrayForDups(array, string) {
  for (i = 0; i < array.length; i++) {
    if (array[i] == string.toUpperCase()) {
      return true;
    }
  }
  return false;
}

function spliceElementFromArray(array, string) {
  for (i = 0; i < array.length; i++) {
    if (array[i] === string) {
      array.splice(i, 1);
      return;
    }
  }
}

function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function resetRadioButtons() {
  findSideDish.checked = false;
  findMainDish.checked = false;
  findDessert.checked = false;
  findEntireMeal.checked = false;
}
