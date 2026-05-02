import axios from "axios";

export const fetchNotifications = async () => {
  const res = await axios.get("http://localhost:3001/notifications");
  return res.data;
};