
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
var addARecipeButton = document.querySelector('.add-a-recipe');
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

letsCook.addEventListener('click', displayMeal);
clearButton.addEventListener('click', resetDefaultView)
addARecipeButton.addEventListener('click', displayRecipeSubmissionForm)
submitNewRecipeButton.addEventListener('click', pushUserRecipe)
addFavoriteButton.addEventListener('click', pushRecipeToFavs)
viewFavorites.addEventListener('click', displayFavoritesView)
exitFavsMenu.addEventListener('click', resetDefaultView)
exitSubmitMenu.addEventListener('click', resetDefaultView)

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
}

function resetDefaultView() {
  showElement(homeMenu);
  showElement(mealDisplay);
  resetRadioButtons()
  showElement(cookpot)
  hideElement(foodMessage)
  hideElement(foodLog)
  hideElement(clearButton)
  hideElement(addFavoriteButton)
  hideElement(favoritesMenu)
  hideElement(recipeSubmissionMenu)
}

function displayFavoritesView() {
  hideElement(homeMenu);
  hideElement(mealDisplay);
  showElement(favoritesMenu);
}

function displayRecipeSubmissionForm() {
  showElement(recipeSubmissionMenu)
}

function pushUserRecipe() {
  if (submitNewSide.checked === true && checkArrayForDups(sides) === false) {
    sides.push(recipeSubmissionField.value.toUpperCase());
    foodLog.innerText = recipeSubmissionField.value.toUpperCase();
    displayMealView()
  } else if (submitNewMain.checked === true && checkArrayForDups(mains) === false) {
    mains.push(recipeSubmissionField.value.toUpperCase());
    foodLog.innerText = recipeSubmissionField.value.toUpperCase();
    displayMealView()
  } else if (submitNewDessert.checked === true && checkArrayForDups(desserts) === false) {
    desserts.push(recipeSubmissionField.value.toUpperCase());
    foodLog.innerText = recipeSubmissionField.value.toUpperCase();
    displayMealView()
  } else {
    return;
  }
}

function checkArrayForDups(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i] == recipeSubmissionField.value.toUpperCase()) {
      submitMealErrorMessage.innerText = 'duplicate found'
      return true;
    }
  }
  submitMealErrorMessage.innerText = ''
  return false;
}

function pushRecipeToFavs() {
  favorites.push(foodLog.innerText);
}

// HELPER FUNCTIONS:

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
