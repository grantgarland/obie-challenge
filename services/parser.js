var logger = require("../middleware/logger");
var XLSX = require("xlsx");
var request = require("request");
var carrierSource =
  "https://docs.google.com/spreadsheets/d/14bEe8qFkJptV0stpkIrkBw3GCADte6XuZv9jXpRllWg";
// due to time constraints, importing flood data. Unable to dig into the xlsx package enough to dissect the API for importing multiple sheets from the same .xlsx document.
var floodCarriers = require("../data/flood");

class ParsingService {
  fetchCarriers() {
    return new Promise(function (resolve, reject) {
      // fetch data from hosting .xlsx file url
      var workbookPromise = new Promise(function (resolve, reject) {
        request(carrierSource, { encoding: null }, function (err, res, data) {
          if (err || res.statusCode !== 200) return reject(err);

          var data = XLSX.read(data, { type: "buffer" });

          resolve(data);
        });
      });
      // transform workbook data into JSON
      let sheet;
      workbookPromise
        .then((workbook) => {
          logger.info("Fetch xlsx data success");
          sheet = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          // filter and map JSON into consumable format
          var cleaned = sheet
            .filter((el) => {
              return Object.keys(el).length > 1 && el.A !== "Carrier";
            })
            .map((el) => {
              let illinois =
                el.B && el.B === "Both"
                  ? ["auto", "fire"]
                  : el.B === "AUTO"
                  ? ["auto"]
                  : el.B === "FIRE"
                  ? ["fire"]
                  : [];

              let indiana =
                el.C && el.C === "Both"
                  ? ["auto", "fire"]
                  : el.C === "AUTO"
                  ? ["auto"]
                  : el.C === "FIRE"
                  ? ["fire"]
                  : [];

              let michigan =
                el.D && el.D === "Both"
                  ? ["auto", "fire"]
                  : el.D === "AUTO"
                  ? ["auto"]
                  : el.D === "FIRE"
                  ? ["fire"]
                  : [];

              // manually injecting flood insurance due to time constraints
              const floodIndex = floodCarriers.findIndex(
                (obj) => obj.key === el.A
              );
              floodIndex > -1 &&
                floodCarriers[floodIndex].flood.il &&
                illinois.push("flood");
              floodIndex > -1 &&
                floodCarriers[floodIndex].flood.in &&
                indiana.push("flood");
              floodIndex > -1 &&
                floodCarriers[floodIndex].flood.mi &&
                michigan.push("flood");

              return {
                key: el.A,
                carrier: el.A,
                licenses: {
                  il: illinois,
                  in: indiana,
                  mi: michigan,
                },
              };
            });
          resolve(cleaned);
        })
        .catch((err) => {
          logger.error(err.message);
          reject(err);
        });
    });
  }
}

module.exports = ParsingService;
