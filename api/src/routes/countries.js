const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db");
const axios = require("axios");
const { preLoadedActivities } = require("./data");

const getCountriesFromDb = async () => {
  const infoDb = await Country.findAll({
    include: {
      model: Activity,
    },
  });
  return infoDb;
};

const getActivityData = async () => {
  try {
    const dbData = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    return dbData;
  } catch (error) {
    console.log(error);
  }
};

const chargeActivitiesData = async () => {
  const dbData = await getActivityData();
  if (dbData.length < 1) {
    try {
      for (let i = 0; i < preLoadedActivities.length; i++) {
        const newActivity = await Activity.create({
          name: preLoadedActivities[i].name,
          difficulty: preLoadedActivities[i].difficulty,
          duration: preLoadedActivities[i].duration,
          season: preLoadedActivities[i].season,
        });

        preLoadedActivities[i].countriesInActivity.map(async (countryId) => {
          const foundCountry = await Country.findAll({
            where: { idName: countryId },
          });
          if (foundCountry) newActivity.addCountries(foundCountry);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};

router.get("/", async (req, res) => {
  try {
    const dbData = await getCountriesFromDb();
    if (dbData.length < 1) {
      const getAll = await axios.get("https://restcountries.com/v3/all");
      const infoAPI = await getAll.data?.map((element) => {
        return {
          idName: element.cca3,
          name: element.name.common,
          flagImg: element.flags[0],
          continent: element.continents[0],
          capital: element.capital ? element.capital[0] : "Not found",
          subregion: element.subregion ? element.subregion : "Not Found",
          area: Math.round(element.area),
          population: element.population,
          mapLocation: element.maps.googleMaps,
        };
      });
      infoAPI.forEach(async (element) => {
        try {
          await Country.create({
            idName: element.idName,
            name: element.name,
            flagImg: element.flagImg,
            continent: element.continent,
            capital: element.capital,
            subregion: element.subregion,
            area: element.area,
            population: element.population,
            mapLocation: element.mapLocation,
          });
        } catch (e) {
          console.log(e);
        }
      });
      await chargeActivitiesData();
      res.status(200).send(dbData);
    } else {
      try {
        const { name } = req.query;
        if (name) {
          const countryName = await dbData.filter((element) =>
            element.name.toLowerCase().includes(name.toLowerCase())
          );
          countryName.length
            ? res.status(200).send(countryName)
            : res.status(404).send("Country not found");
        } else {
          res.status(200).send(dbData);
        }
      } catch {
        res.status(500).send("Server error");
      }
    }
  } catch {
    console.log("Error loading DB");
  }
});

router.get("/:idCountry", async (req, res) => {
  try {
    const dbData = await getCountriesFromDb();
    const { idCountry } = req.params;
    const id = await dbData.filter((element) => element.idName === idCountry);
    id.length
      ? res.send(id)
      : res.status(400).json({ msg: "Country does not exist" });
  } catch {
    res.status(500).send("Error found ID");
  }
});

module.exports = router;
