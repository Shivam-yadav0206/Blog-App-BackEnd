import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import Router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(express.json());
connectDb();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);


app.get("/", (req, res) => {
  res.send("Hello on Blog-App Backend");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
