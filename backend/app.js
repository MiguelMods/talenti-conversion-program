const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const Convertion = require("./models/Convertions");
const Monedas = require("./models/Monedas");
const MonedasFactores = require("./models/MonedaFactores");

app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Hello World!"));

mongoose
  .connect("mongodb://localhost:27017/convertions", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/doconvertion", async (req, res) => {
  const newConvertion = new Convertion(req.body);
  try {
    const monedaFactores = MonedasFactores.findOne(
      (moneda) =>
        moneda.monedaOrigen === newConvertion.monedaOrigen &&
        moneda.monedaDestino === newConvertion.monedaDestino
    );

    if (monedaFactores === null || monedaFactores === undefined)
      res.status(400).json({
        message:
          "No Existen Factores/Tasas de Conversion para la moneda origen: " +
          newConvertion.monedaDestino,
      });

    const convertionResult =
      monedaFactores.operacion === "*"
        ? monto * monedaFactores.FactorTasaCambio
        : monto / monedaFactores.FactorTasaCambio;

    newConvertion.resultado = convertionResult;

    const saveConvertion = await newConvertion.save();
    res.status(201).json(saveConvertion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/getConvertion/:convertionid,", (req, res) => {
  const { convertionid } = req.params;
  res.status(200).json({
    convertionid: convertionid,
    monto: 100,
    monedaOrigen: 5,
    monedaDestino: 5,
    resultado: 1,
  });
});

app.put("/api/updateConvertion", (req, res) => {
  const { convertionid, monto, monedaOrigen, monedaDestino } = req.body;
  res.status(200).json({
    convertionid: convertionid,
    monto: monto,
    monedaOrigen: monedaOrigen,
    monedaDestino: monedaDestino,
    resultado: "resultado",
  });
});

app.get("/api/monedas/getall", (req, res) => {
  Monedas.find().then((monedas) => res.json(monedas));
});

app.get("/api/monedas/:id", (req, res) => {
  Monedas.findById(req.params.id).then((moneda) => res.json(moneda));
});

app.post("/api/moneda", async (req, res) => {
  const newMoneda = new Monedas(req.body);
  try {
    const saveMoneda = await newMoneda.save();
    res.status(201).json(saveMoneda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/moneda/:idMoneda", async (req, res) => {
  try {
    const { idMoneda } = req.params;

    const { codigo, descripcion, estatus } = req.body;

    if (codigo === null || codigo === "" || codigo === undefined)
      return res.status(400).json({ message: "El campo codigo es requerido" });

    if (descripcion === null || descripcion === "" || descripcion === undefined)
      return res
        .status(400)
        .json({ message: "El campo descripcion es requerido" });

    if (estatus === null || estatus === "" || estatus === undefined)
      return res.status(400).json({ message: "El campo estatus es requerido" });

    const result = await Monedas.updateOne(
      { id: idMoneda },
      {
        $set: {
          codigo: codigo,
          descripcion: descripcion,
          estatus: estatus,
        },
      }
    );

    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! http://localhost:${port}/`
  )
);
