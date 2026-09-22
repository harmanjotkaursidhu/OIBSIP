const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convert-btn");
const errorMessage = document.getElementById("error-message");
const results = document.getElementById("results");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

convertButton.addEventListener("click", convertTemperature);

// Allow Enter key to convert
temperatureInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});

function convertTemperature() {

    const input = temperatureInput.value.trim();
    const unit = unitSelect.value;

    errorMessage.textContent = "";
    results.classList.add("hidden");

    // Check if input is empty
    if (input === "") {
        showError("Please enter a temperature.");
        return;
    }

    // Check if input is a valid number
    const temperature = Number(input);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }

    let celsius;
    let fahrenheit;
    let kelvin;

    // Convert input temperature to all units
    if (unit === "celsius") {

        if (temperature < -273.15) {
            showError("Temperature cannot be below absolute zero (-273.15°C).");
            return;
        }

        celsius = temperature;
        fahrenheit = (temperature * 9 / 5) + 32;
        kelvin = temperature + 273.15;

    } else if (unit === "fahrenheit") {

        if (temperature < -459.67) {
            showError("Temperature cannot be below absolute zero (-459.67°F).");
            return;
        }

        fahrenheit = temperature;
        celsius = (temperature - 32) * 5 / 9;
        kelvin = celsius + 273.15;

    } else if (unit === "kelvin") {

        if (temperature < 0) {
            showError("Temperature cannot be below absolute zero (0 K).");
            return;
        }

        kelvin = temperature;
        celsius = temperature - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
    }

    // Display results
    celsiusResult.textContent = formatNumber(celsius);
    fahrenheitResult.textContent = formatNumber(fahrenheit);
    kelvinResult.textContent = formatNumber(kelvin);

    results.classList.remove("hidden");
}

function showError(message) {
    errorMessage.textContent = message;
}

function formatNumber(number) {
    return Number(number.toFixed(2));
}