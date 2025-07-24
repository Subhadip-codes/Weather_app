import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Replace this with your actual API key from OpenWeatherMap
const API_KEY = "fa5e1c5c478fee57c6255e8a2463295d";

app.get("/", (req, res) => {
  res.render("index.ejs", { error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    const result = {
      city: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    };

    res.render("result.ejs", { weather: result });
  } catch (error) {
    res.render("result.ejs", { error: "City not found. Try again!", weather: null });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
