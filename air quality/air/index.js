const form = document.getElementById("form");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const resultContainer = document.getElementById("result");
const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;

  const url = `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?lat=${latitude}&lon=${longitude}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '32e64602b8msh314d755b65994c4p18031djsn8dae54180452',
      'x-rapidapi-host': 'air-quality-by-api-ninjas.p.rapidapi.com'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);

      // Try to get concentration values first, then fall back to aqi
      aqiResult.textContent = result.overall_aqi ?? 'N/A';
      coResult.textContent = result.CO?.concentration ?? result.CO?.aqi ?? 'N/A';
      no2Result.textContent = result.NO2?.concentration ?? result.NO2?.aqi ?? 'N/A';
      o3Result.textContent = result.O3?.concentration ?? result.O3?.aqi ?? 'N/A';
      pm2Result.textContent = result["PM2.5"]?.concentration ?? result["PM2.5"]?.aqi ?? 'N/A';
      pm10Result.textContent = result.PM10?.concentration ?? result.PM10?.aqi ?? 'N/A';
      so2Result.textContent = result.SO2?.concentration ?? result.SO2?.aqi ?? 'N/A';

      resultContainer.style.display = 'flex';
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      alert("Failed to load data.");
    });
});