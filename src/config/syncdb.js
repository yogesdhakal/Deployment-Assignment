const admins = require("../models/admin");
const participants = require("../models/participant");

const syncTablesToDb = async () => {
  try {
    await admins.truncate();
    await admins.sync({ alter: true });
    console.log("The admins table has been synced.");
  } catch (err) {
    console.error("Unable to sync the admins table:", err);
  }
  try {
    await participants.truncate();
    await participants.sync({ alter: true });
    console.log("The participants table has been synced.");
  } catch (err) {
    console.error("Unable to sync the participants table:", err);
  }
};

module.exports = { syncTablesToDb };
