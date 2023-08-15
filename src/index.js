import { requestingHotels } from "./hotels.js";

const cleanButton = document.getElementById("filter_clean_btn");
const countriesSelect = document.getElementById("filter_countries");
const dateFromInput = document.getElementById("date-from");
const dateToInput = document.getElementById("date-to");
const pricesSelect = document.getElementById("filter-prices");
const sizesSelect = document.getElementById("filter-sizes");
const main = document.querySelector("main");
const hotelsContainer = document.createElement("div");
hotelsContainer.className = "hotelsContainer";

let data = [];

// Función para limpiar y renderizar las cards de hoteles
function renderFilteredHotels(filteredHotels) {
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
}

// Función para cargar y renderizar los hoteles
async function loadAndRenderHotels() {
    const response = await requestingHotels();
    data = await response.json();
    console.log(data);

    renderFilteredHotels(data);
}

// Cargar y renderizar los hoteles al cargar la página
window.addEventListener('load', loadAndRenderHotels);

// Función para aplicar todos los filtros
function applyAllFilters() {
    const selectedCountry = countriesSelect.options[countriesSelect.selectedIndex].value;
    const selectedPrice = parseInt(pricesSelect.value);
    const selectedSize = sizesSelect.options[sizesSelect.selectedIndex].value;
    const selectedDateFrom = new Date(dateFromInput.value).getTime();
    const selectedDateTo = new Date(dateToInput.value).getTime();

    const filteredHotels = data.filter(hotel => {
        let matchCountry = true;
        if (selectedCountry !== "all") {
            matchCountry = hotel.country === selectedCountry;
        }

        let matchPrice = true;
        if (!!selectedPrice) {
            matchPrice = hotel.price === selectedPrice;
        }

        let matchSize = true;
        if (selectedSize === "small") {
            matchSize = hotel.rooms < 10;
        } else if (selectedSize === "medium") {
            matchSize = hotel.rooms >= 10 && hotel.rooms <= 20;
        } else if (selectedSize === "large") {
            matchSize = hotel.rooms > 20;
        }

        let matchDate = true;
        if (selectedDateFrom && selectedDateTo) {
            const timeDifferenceHotel = Math.abs(hotel.availabilityTo - hotel.availabilityFrom);
            const daysDifferenceHotel = Math.ceil(timeDifferenceHotel / (1000 * 60 * 60 * 24));
            console.log(daysDifferenceHotel,'diferencia hotel')

            const timeDifferenceSelected = Math.abs(selectedDateTo - selectedDateFrom);
            const daysDifferenceSelected = Math.ceil(timeDifferenceSelected / (1000 * 60 * 60 * 24));
            console.log(daysDifferenceSelected, 'diferencia seleccion')

            matchDate = daysDifferenceHotel === daysDifferenceSelected;
            console.log(matchDate)
        }

        return matchCountry && matchPrice && matchSize && matchDate;
    });

    if (filteredHotels.length === 0) {
        document.getElementById("no-results-message").style.display = "block";
    } else {
        document.getElementById("no-results-message").style.display = "none";
    }

    renderFilteredHotels(filteredHotels);
}

// Filtrar cards por país
countriesSelect.addEventListener("change", applyAllFilters);

// Filtrar cards por precio
pricesSelect.addEventListener("change", applyAllFilters);

// Filtrar cards por tamaño
sizesSelect.addEventListener("change", applyAllFilters);

//Filtrar cards por fechas
dateFromInput.addEventListener("change", applyAllFilters);
dateToInput.addEventListener("change", applyAllFilters);

// Funcionalidad del botón clear
cleanButton.addEventListener("click", async function () {
    countriesSelect.value = "all";
    dateFromInput.value = "";
    dateToInput.value = "";
    pricesSelect.value = "all"; 
    sizesSelect.value = "all";

    // Cargar y renderizar hoteles
    await loadAndRenderHotels();
});

