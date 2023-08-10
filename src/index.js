import { requestingHotels } from "./hotels.js";

let data = [];

const cleanButton = document.getElementById("filter_clean_btn");

const countriesSelect = document.getElementById("filter_countries");
const dateFromInput = document.getElementById("date-from");
const dateToInput = document.getElementById("date-to");
const pricesSelect = document.getElementById("filter-prices");
const sizesSelect = document.getElementById("filter-sizes");

const main = document.querySelector("main");
const hotelsContainer = document.createElement("div");
hotelsContainer.className = "hotelsContainer";

cleanButton.addEventListener("click", function (){
    countriesSelect.value = "all";
    dateFromInput.value = "";
    dateToInput.value = "";
    pricesSelect.value = "all"; 
    sizesSelect.value = "all";
});

//Listar todas las cards de hoteles cuando cargue la página
window.addEventListener('load', async () => {
    const response = await requestingHotels();
    const data = await response.json();
    console.log(data);

    data.forEach(hotel => {
        const cardHotel = document.createElement("div");
        cardHotel.className = "card";
        hotelsContainer.appendChild(cardHotel);

        const imageHotel = document.createElement("img");
        imageHotel.setAttribute("src", hotel.photo);
        imageHotel.setAttribute("alt", "hotel Image");
        cardHotel.appendChild(imageHotel);

        const hotelName = document.createElement("h2");
        hotelName.className = "hotel-name";
        hotelName.textContent = hotel.name;
        cardHotel.appendChild(hotelName);

        const hotelCountry = document.createElement("p");
        hotelCountry.textContent = hotel.country;
        cardHotel.appendChild(hotelCountry);

        const hotelPrice = document.createElement("p");
        hotelPrice.textContent = "Price" + hotel.price;
        cardHotel.appendChild(hotelPrice);

        const hotelRooms = document.createElement("p");
        hotelRooms.textContent = "Rooms" + hotel.rooms;
        cardHotel.appendChild(hotelRooms);
    });

    main.appendChild(hotelsContainer);
});

window.addEventListener('load', async () => {
    const response = await requestingHotels();
    const data = await response.json();
    console.log(data);

countriesSelect.addEventListener("change", function() {
    const selectedCountry = countriesSelect.options[countriesSelect.selectedIndex].value;

    const filteredHotels = data.filter(hotel => {
        const match = selectedCountry === "all" || hotel.country === selectedCountry;
        return match;
    });

    console.log(filteredHotels);

    // Crear las cards del pais seleccionado
    hotelsContainer.innerHTML = '';

    filteredHotels.forEach(hotel => {
        const cardHotel = document.createElement("div");
        cardHotel.className = "card";
        hotelsContainer.appendChild(cardHotel);

        const imageHotel = document.createElement("img");
        imageHotel.setAttribute("src", hotel.photo);
        imageHotel.setAttribute("alt", "hotel Image");
        cardHotel.appendChild(imageHotel);

        const hotelName = document.createElement("h2");
        hotelName.className = "hotel-name";
        hotelName.textContent = hotel.name;
        cardHotel.appendChild(hotelName);

        const hotelCountry = document.createElement("p");
        hotelCountry.textContent = hotel.country;
        cardHotel.appendChild(hotelCountry);

        const hotelPrice = document.createElement("p");
        hotelPrice.textContent = "Price" + hotel.price;
        cardHotel.appendChild(hotelPrice);

        const hotelRooms = document.createElement("p");
        hotelRooms.textContent = "Rooms" + hotel.rooms;
        cardHotel.appendChild(hotelRooms);

        hotelsContainer.appendChild(cardHotel);
    });

    main.appendChild(hotelsContainer);
});
});

