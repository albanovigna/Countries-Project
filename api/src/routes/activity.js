const { Router } = require("express");
const { Activity, Country } = require("../db");
const router = Router();
const axios = require("axios");

router.post("/activity", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });
    countries.map(async (countryId) => {
      const foundCountry = await Country.findAll({
        where: { id: countryId },
      });
      if (foundCountry) newActivity.addCountries(foundCountry);
    });
    res.status(200).send("Activity added correctly");
  } catch {
    res.status(400).send("Error at creating activity ");
  }
});

module.exports = router;
