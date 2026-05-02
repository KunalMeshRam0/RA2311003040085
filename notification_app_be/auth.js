require("dotenv").config();
const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

let cachedToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  try {
    const res = await axios.post(`${BASE_URL}/auth`, {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    cachedToken = res.data.access_token;
    tokenExpiry = now + 10 * 60 * 1000; // 10 minutes

    console.log("New token generated");

    return cachedToken;
  } catch (err) {
    console.error("Auth failed:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getAccessToken };