const carriers = [
  {
    key: "allstate",
    carrier: "Allstate",
    licenses: {
      il: ["auto", "fire", "flood"],
      in: ["auto", "fire", "flood"],
    },
  },
  {
    key: "founders",
    carrier: "Founders",
    licenses: {
      il: ["auto"],
    },
  },
  {
    key: "guard",
    carrier: "Guard",
    licenses: {
      il: ["fire"],
    },
  },
  {
    key: "hippo",
    carrier: "Hippo",
    licenses: {
      il: ["fire"],
      in: ["fire"],
    },
  },
  {
    key: "lemonade",
    carrier: "Lemonade",
    licenses: {
      il: ["fire"],
      in: ["fire"],
      mi: ["fire"],
    },
  },
  {
    key: "national_general",
    carrier: "National General",
    licenses: {
      il: ["auto", "fire", "flood"],
      in: ["auto", "fire", "flood"],
      mi: ["fire", "flood"],
    },
  },
  {
    key: "nationwide",
    carrier: "Nationwide",
    licenses: {
      il: ["auto", "fire"],
      in: ["auto", "fire"],
      mi: ["auto", "fire"],
    },
  },
  {
    key: "neptune",
    carrier: "Neptune",
    licenses: {
      in: ["flood"],
      mi: ["flood"],
    },
  },
  {
    key: "progressive",
    carrier: "Progressive",
    licenses: {
      il: ["auto", "fire"],
      in: ["auto", "fire"],
      mi: ["auto"],
    },
  },
  {
    key: "seneca",
    carrier: "Seneca",
    licenses: {
      il: ["auto", "fire", "flood"],
      in: ["fire", "flood"],
      mi: ["auto", "flood"],
    },
  },
  {
    key: "swyfft",
    carrier: "Swyfft",
    licenses: {
      il: ["fire"],
      in: ["fire"],
      mi: ["fire"],
    },
  },
  {
    key: "typtap",
    carrier: "TypTap",
    licenses: {},
  },
];

module.exports = carriers;
