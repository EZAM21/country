const rangeInput = document.getElementById("rangeInput");
const rangeDisplay = document.getElementById("rangeDisplay");
const countriesDisplay = document.querySelector("section");
const nameInput = document.getElementById("nameInput");
const buttons = document.querySelectorAll("button"); // Tableau de bouton []

let countries = [];
let sortMethod;

const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  countries = await res.json();
  displayCountries();
};

const displayCountries = () => {
  countriesDisplay.innerHTML = "";
  countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(nameInput.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "croissant") {
        return a.population - b.population;
      }
      if (sortMethod === "decroissant") {
        return b.population - a.population;
      }
      if (sortMethod === "alphabetique") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, rangeInput.value)
    .map((country) => {
      countriesDisplay.innerHTML += `<div class="card">
        <img src="${country.flags.svg}" alt="drapeau ${
        country.translations.fra.common
      }" />
        <div class="name">${country.translations.fra.common}</div>
        <div class="capital">${country.capital[0]}</div>
        <div class="population">Population : ${country.population.toLocaleString(
          "fr"
        )}</div>
      </div>`;
    });
};

fetchCountries();

nameInput.addEventListener("input", (e) => {
  displayCountries();
});

rangeInput.addEventListener("input", (e) => {
  rangeDisplay.textContent = rangeInput.value;
  displayCountries();
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    sortMethod = button.id;
    displayCountries();
  });
});
