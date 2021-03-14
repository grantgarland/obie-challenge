var express = require("express");
var router = express.Router();

var carriers = require("../data/carriers");

/* Return carriers that provide policy/policies in a given state */
router.get("/carriers", function (req, res) {
  let state = req.query.state;
  let coverage = req.query.coverage.split(",");

  // filter out all non-matching carriers
  const filteredCarriers = carriers
    .filter((carrier) => Object.keys(carrier.licenses).includes(state))
    .filter((carrier) =>
      coverage.every((type) => carrier.licenses[state].includes(type))
    );
  // flatten carrier data for client
  const flattenedCarriers = filteredCarriers.map((carrier) => {
    return {
      key: carrier.key,
      carrier: carrier.carrier,
      state: state,
      auto: carrier.licenses[state].includes("auto"),
      fire: carrier.licenses[state].includes("fire"),
      flood: carrier.licenses[state].includes("flood"),
    };
  });
  res.json(flattenedCarriers);
});

module.exports = router;
