const { fetchCountryProfile } = require("../services/api/country.service");

async function test() {
  console.log("Fetching Germany...");
  const data = await fetchCountryProfile("Germany");
  console.log(data);
}

test();