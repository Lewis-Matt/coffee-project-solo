"use strict"

// Inserts div table (that will contain coffees) into html
function renderCoffee(coffee) {
    let html = '<div class="hidden">' + coffee.id + '</div>';
    html += '<div class="coffee-name col-6">' + coffee.name + '</div>';
    html += '<div class="col-6">' + coffee.roast + '</div>';
    return html;
}

// Adds the actual coffees to the table body created by renderCoffee()
function renderCoffees(coffees) {
    let html = '';
    // ORIGINAL LOOP
    // for(let i = coffees.length - 1; i >= 0; i--) {
    //     html += renderCoffee(coffees[i]);
    // }
    // This version puts the coffees in ID order, since the 'coffees' array is already sorted
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
            // Select all roasts
        } else if (roastSelection.value === "all") {
            filteredCoffees.push(coffee);
        }
    });
    // tbody declared in the global scope, id = "coffees"
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// LIVE SEARCH FUNCTION
let searchInput = document.querySelector('#coffee-search');

function searchCoffee() {
    let filter = searchInput.value.toUpperCase();
    let filteredCoffees = [];
    console.log(filter); // TEST LOG
    coffees.forEach(function (coffee) {
        if (coffee.name.toUpperCase().includes(filter)) {
            filteredCoffees.push(coffee);
            console.log(filteredCoffees);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// ADD NEW COFFEE
let newCoffeeName = document.querySelector('#new-coffee');
let newCoffeeRoast = document.querySelector('#which-roast');
let submitCoffee = document.getElementById("submitNewCoffee");
submitCoffee.addEventListener("click", addNewCoffee);

function addNewCoffee(newCoffeeProduct) {
    newCoffeeProduct.preventDefault();
    let addNewID = coffees.length + 1;
    let addNewName = newCoffeeName.value.toString();
    let addNewRoast = newCoffeeRoast.value.toString();
    newCoffeeProduct = {id: addNewID, name: addNewName, roast: addNewRoast,};
    coffees.push(newCoffeeProduct);
    // Adds a key: 'newCoffee' with the value of the newCoffeeProduct object as a string, to local storage.
    // At the moment, only stores the last coffee added...
    localStorage.setItem('newCoffee', JSON.stringify(newCoffeeProduct));
    tbody.innerHTML = renderCoffees(coffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// The first div of the body of the table
let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');

// NOT SURE ABOUT LOCAL STORAGE AND WHY I COULDN'T SET newCoffeeProduct INTO LOCAL STORAGE IN addNewCoffee FUNCTION, AND THEN JUST coffees.push(JSON.parse(localStorage.getItem('newCoffeeProduct');
// Gets 'newCoffee' key from local and parses the value (since it was an object and local storage only stores strings)
let addedCoffees = JSON.parse(localStorage.getItem('newCoffee'));
// Combined the below into the variable above
// let addedCoffees2 = JSON.parse(addedCoffees)
coffees.push(addedCoffees);


// Changes the body of the table to have the divs created by renderCoffee() and the coffees created by renderCoffees()
tbody.innerHTML = renderCoffees(coffees);
// Updates coffees when the form is submitted
submitButton.addEventListener('click', updateCoffees);
