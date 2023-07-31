const cleanButton = document.getElementById("filter_clean_btn");

const countriesSelect = document.getElementById("filter_countries");
const dateFromInput = document.getElementById("date-from");
const dateToInput = document.getElementById("date-to");
const pricesSelect = document.getElementById("filter-prices");
const sizesSelect = document.getElementById("filter-sizes");

cleanButton.addEventListener("click", function (){
    countriesSelect.value = "all";
    dateFromInput.value = "";
    dateToInput.value = "";
    pricesSelect.value = "all";
    sizesSelect.value = "all";
});