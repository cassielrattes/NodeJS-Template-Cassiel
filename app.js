require("dotenv").config();
const app = require("./config/express");

const PORT = process.env.PORT || 5000;

app().listen(PORT, "0.0.0.0", () => {
  console.log(`Server ON: http://localhost:${PORT}`);
});
