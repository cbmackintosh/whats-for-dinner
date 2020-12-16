
var sides = ['Miso Glazed Carrots', 'Coleslaw', 'Garden Salad', 'Crispy Potatoes', 'Sweet Potato Tots', 'Coconut Rice', 'Caeser Salad', 'Shrimp Summer Rolls', 'Garlic Butter Mushrooms', 'Hush Puppies'];
var mains = ['Spaghetti and Meatballs', 'Pineapple Chicken', 'Shakshuka', 'Thai Yellow Curry', 'Bibimbap', 'Chicken Parmesean', 'Butternut Squash Soup', 'BBQ Chicken Burgers', 'Ramen', 'Empanadas', 'Chicken Fried Rice', 'Sheet Pan Fajitas', 'Margarita Pizza'];
var desserts = ['Apple Pie', 'Lemon Meringue Pie', 'Black Forest Cake', 'Banana Bread', 'Peach Cobbler', 'Cheesecake', 'Funfetti Cake', 'Baklava', 'Flan', 'Macarons', 'Macaroons', 'Chocolate Cupcakes', 'Pavlova', 'Pumpkin Pie', 'Key Lime Pie', 'Tart Tatin', 'Croissants', 'Eclairs'];

var findSideDish = document.querySelector('.side-button');
var findMainDish = document.querySelector('.mains-button');
var findDessert = document.querySelector('.desserts-button');
var findEntireMeal = document.querySelector('.entire-meal-button');

var letsCook = document.querySelector('.lets-cook');
var cookpot = document.querySelector('.cookpot')
var foodLog = document.querySelector('.food-log')

letsCook.addEventListener('click', findRandomDish);

function findRandomDish() {
  hideCookpot()
  if (findSideDish.checked === true) {
    foodLog.innerText = sides[Math.floor(Math.random() * sides.length)];
  } else if (findMainDish.checked === true) {
    foodLog.innerText = mains[Math.floor(Math.random() * mains.length)];
  } else if (findDessert.checked === true) {
    foodLog.innerText = desserts[Math.floor(Math.random() * desserts.length)];
  }
  resetRadioButtons()
}

// HELPER FUNCTIONS:

function hideCookpot() {
  cookpot.classList.add('hidden');
}

function resetRadioButtons() {
  findSideDish.checked = false;
  findSideDish.checked = false;
  findSideDish.checked = false;
}
