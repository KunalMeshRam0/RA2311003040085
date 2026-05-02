const axios = require("axios");
const config = require("./config");
const Log = require("../logging_middleware/logger");

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    await Log("backend", "info", "service", "Fetching notifications", config.ACCESS_TOKEN);

    const res = await axios.get(`${config.BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${config.ACCESS_TOKEN}`,
      },
    });

    let notifications = res.data.notifications;

    await Log("backend", "info", "service", "Sorting notifications", config.ACCESS_TOKEN);

    notifications.sort((a, b) => {
      const w1 = weights[a.type] || 0;
      const w2 = weights[b.type] || 0;

      if (w2 !== w1) return w2 - w1;

      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return notifications.slice(0, 10);
  } catch (err) {
    await Log("backend", "error", "service", err.message, config.ACCESS_TOKEN);
    throw err;
  }
}

module.exports = { getTopNotifications };