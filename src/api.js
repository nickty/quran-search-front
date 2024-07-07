const axios = require("axios");

const BASE_URL = "http://api.alquran.cloud/v1/search";

async function searchQuran(keyword, language = "en") {
  try {
    const response = await axios.get(`${BASE_URL}/${keyword}/all/${language}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from Quran API");
  }
}

module.exports = {
  searchQuran,
};
