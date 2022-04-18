const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

const countryTest = {
  name: "Neverland",
  idName: "NVL",
  flagImg: "dasdasdasd.png",
  continent: "America",
  capital: "Neverland",
  subregion: "North America",
  population: 10,
  area: 2,
};

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validaciones", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", async () => {
      it("Deberia devolver un error si no se le envia nombre", (done) => {
        Country.create({})
          .then(() => done(new Error("Requiere un nombre valido")))
          .catch(() => done());
      });
      it("Deberia crear un Country si solo se le pasa name, flagImg, continent and capital ", async () => {
        let pais = await Country.create({
          name: "Neverland",
          flagImg: "dasdada.jpg",
          continent: "America",
          capital: "Neverland",
        });
        expect(pais.dataValues.name).equal("Neverland");
      });
    });
    describe("create", () => {
      it("Deberia cargar los valores pasados al crear un Country", async () => {
        let pais = await Country.create(countryTest);
        let neverland = pais.dataValues;
        expect(neverland.name).to.equal(countryTest.name);
        expect(neverland.idName).to.equal(countryTest.idName);
        expect(neverland.flagImg).to.equal(countryTest.flagImg);
        expect(neverland.population).to.equal(countryTest.population);
        expect(neverland.subregion).to.equal(countryTest.subregion);
        expect(neverland.area).to.equal(countryTest.area);
        expect(neverland.continent).to.equal(countryTest.continent);
        expect(neverland.capital).to.equal(countryTest.capital);
      });
    });
  });
});
