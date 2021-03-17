var express = require("express");
var router = express.Router();

var logger = require("../middleware/logger");
var CarrierParser = require("../services/parser");

/* Return carriers that provide policy/policies in a given state */
router.get("/carriers", function (req, res) {
  const state = req.query.state;
  const coverage = req.query.coverage.split(",");
  const carrierParser = new CarrierParser();
  let matchingCarriers = [];

  // fetch and parse carrier data
  const carrierPromise = carrierParser.fetchCarriers();
  carrierPromise.then((carriers) => {
    // filter out all non-matching carriers
    const filteredCarriers = carriers
      .filter((carrier) => Object.keys(carrier.licenses).includes(state))
      .filter((carrier) =>
        coverage.every((type) => carrier.licenses[state].includes(type))
      );
    // flatten carrier data for client
    matchingCarriers = filteredCarriers.map((carrier) => {
      return {
        key: carrier.key,
        carrier: carrier.carrier,
        state: state,
        auto: carrier.licenses[state].includes("auto"),
        fire: carrier.licenses[state].includes("fire"),
        flood: carrier.licenses[state].includes("flood"),
      };
    });
    return res.json(matchingCarriers);
  });
});

module.exports = router;
