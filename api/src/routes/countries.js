const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db");
const axios = require("axios");

const getCountriesFromDb = async () => {
  const infoDb = await Country.findAll({
    include: {
      model: Activity,
      attibute: ["name"],
    },
  });
  return infoDb;
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
          continent: element.region,
          capital: element.capital ? element.capital[0] : "Not found",
          subregion: element.subregion,
          area: Math.round(element.area),
          population: element.population,
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
          });
        } catch {
          console.log("Error");
        }
      });
      res.status(200).send("Loading DB success");
    } else {
      res.send("DB already charged");
    }
  } catch {
    console.log("Error loading DB");
  }
});

router.get("/countries", async (req, res) => {
  try {
    const dbData = await getCountriesFromDb();
    const { name } = req.query;
    if (name) {
      const countryName = await dbData.filter((element) =>
        element.name.toLowerCase().includes(name.toLowerCase())
      );
      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("No se encontro el pais");
    } else {
      res.status(200).send(dbData);
    }
  } catch {
    res.status(500).send("Server error");
  }
});

router.get("/countries/:idPais", async (req, res) => {
  try {
    const dbData = await getCountriesFromDb();
    const { idPais } = req.params;
    const id = await dbData.filter((element) => element.idName === idPais);
    id.length
      ? res.send(id)
      : res.status(400).json({ msg: "El país no existe" });
  } catch {
    res.status(500).send("Error al encontrar país por ID");
  }
});

module.exports = router;
