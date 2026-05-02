const axios = require("axios");

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";

async function Log(stack, level, pkg, message, token) {
  try {
    await axios.post(
      LOG_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(" Logging failed:", err.response?.data || err.message);
  }
}

module.exports = Log;