const express = require("express");

const app = express();

require("dotenv").config();
app.use(express.json());
app.use(require("./routes/router"));

const PORT = process.env.PORT || 8080;



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));