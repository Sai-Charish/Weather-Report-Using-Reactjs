const API_KEY = "a848f67585474b37b6391410262302";
const BASE_URL = "http://api.weatherapi.com/v1";

export default async function getWeather(Location) {
  console.log(Location);
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${Location}`,
  );
  const data = await response.json();

  return data;
}

// location{
//     name
//     region
//     country
//     localtime
// }

// current{
//     last_updated
//     temp_c
//     temp_f
//     condtion{}
// }
