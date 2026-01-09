const apiKey = "ed8770f7f04dfac462a74994d4621875";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.getElementById("search-btn");

async function checkWeather(city) {
    console.log("Arama başlatıldı: " + city);
    
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            alert("Şehir bulunamadı! Lütfen doğru yazdığınızdan emin olun.");
            return;
        }

        const data = await response.json();
        console.log("Gelen Veri:", data);

        // HTML elemanlarını güncelleme
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/s";

    } catch (error) {
        console.error("Bir hata oluştu:", error);
    }
}

// Butona tıklama olayı
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Enter tuşuna basma olayı
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
