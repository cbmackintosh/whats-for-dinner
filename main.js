
var sides = ['Miso Glazed Carrots', 'Coleslaw', 'Garden Salad', 'Crispy Potatoes', 'Sweet Potato Tots', 'Coconut Rice', 'Caeser Salad', 'Shrimp Summer Rolls', 'Garlic Butter Mushrooms', 'Hush Puppies'];
var mains = ['Spaghetti and Meatballs', 'Pineapple Chicken', 'Shakshuka', 'Thai Yellow Curry', 'Bibimbap', 'Chicken Parmesean', 'Butternut Squash Soup', 'BBQ Chicken Burgers', 'Ramen', 'Empanadas', 'Chicken Fried Rice', 'Sheet Pan Fajitas', 'Margarita Pizza'];
var desserts = ['Apple Pie', 'Lemon Meringue Pie', 'Black Forest Cake', 'Banana Bread', 'Peach Cobbler', 'Cheesecake', 'Funfetti Cake', 'Baklava', 'Flan', 'Macarons', 'Macaroons', 'Chocolate Cupcakes', 'Pavlova', 'Pumpkin Pie', 'Key Lime Pie', 'Tart Tatin', 'Croissants', 'Eclairs'];

var findSideDish = document.querySelector('#side-button');
var findMainDish = document.querySelector('#mains-button');
var findDessert = document.querySelector('#desserts-button');
var findEntireMeal = document.querySelector('#entire-meal-button');

var letsCook = document.querySelector('.lets-cook');
var cookpot = document.querySelector('.cookpot')
var foodLog = document.querySelector('.food-log')
var foodMessage = document.querySelector('.food-message');
var clearButton = document.querySelector('.clear-button');

letsCook.addEventListener('click', displayMeal);
clearButton.addEventListener('click', resetDefaultView)

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
}

function resetDefaultView() {
  resetRadioButtons()
  showElement(cookpot)
  hideElement(foodMessage)
  hideElement(foodLog)
  hideElement(clearButton)
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
