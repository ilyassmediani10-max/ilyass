/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB || process.env.MONGODB_DB || "renovation_manager";

if (!MONGO_URI) {
  console.error("Missing MONGO_URI or MONGODB_URI environment variable.");
  process.exit(1);
}

const connectionString = MONGO_URI.includes("?") ? MONGO_URI : `${MONGO_URI}/${MONGO_DB}`;

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: false },
);

const Material = mongoose.models.Material || mongoose.model("Material", materialSchema);

const materials = [
  {
    name: "Interior Paint",
    unit: "gallon",
    price: 32.5,
    description: "Standard wall paint for interior rooms.",
  },
  {
    name: "Drywall Panel",
    unit: "sheet",
    price: 12.0,
    description: "4x8 gypsum board for walls and ceilings.",
  },
  {
    name: "Cement Mix",
    unit: "bag",
    price: 8.5,
    description: "Ready-mix cement for small concrete jobs.",
  },
  {
    name: "Wood Flooring",
    unit: "sq ft",
    price: 7.2,
    description: "Engineered wood flooring planks.",
  },
];

async function seed() {
  await mongoose.connect(connectionString, {
    bufferCommands: false,
    dbName: MONGO_DB,
  });

  await Material.deleteMany({});
  await Material.insertMany(materials);

  console.log("Inserted 4 simple materials into MongoDB.");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
