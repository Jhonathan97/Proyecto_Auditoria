const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    contenido: {
      type: String,
      default: "",
    },
    autor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const informeSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    items: [itemSchema],
    auditoria: {
      type: mongoose.Schema.ObjectId,
      ref: "Auditoria",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

var Informes = mongoose.model("Informe", informeSchema);

module.exports = Informes;
