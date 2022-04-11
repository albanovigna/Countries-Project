const { Router } = require("express");
const { Activity, Country } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const infoDb = await Activity.findAll({
      attibute: ["id"],
    });
    res.status(200).send(infoDb);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countriesInActivity } =
      req.body;
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });
    countriesInActivity.map(async (countryId) => {
      const foundCountry = await Country.findAll({
        where: { idName: countryId },
      });
      if (foundCountry) newActivity.addCountries(foundCountry);
    });
    res.status(200).send("Activity added correctly");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error at creating activity ");
  }
});

module.exports = router;
