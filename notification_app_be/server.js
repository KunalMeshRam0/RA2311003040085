require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { getAccessToken } = require("./auth");
const Log = require("../logging_middleware/logger");

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "http://20.207.122.201/evaluation-service";

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

app.get("/notifications", async (req, res) => {
  try {
    const token = await getAccessToken();

    await Log("backend", "info", "service", "Fetching notifications", token);

    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let notifications = response.data.notifications || response.data;

    const { type, page = 1, limit = 10 } = req.query;

    if (type) {
      notifications = notifications.filter((n) => n.Type === type);
    }

    notifications.sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const start = (page - 1) * limit;
    const result = notifications.slice(start, start + Number(limit));

    res.json(result);

  } catch (err) {
    console.error("Notification error:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});