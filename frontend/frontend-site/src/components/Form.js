import { useState } from "react";
import SelectOption from "./SelectOption";

export default function Form() {
  const [monto, setMonto] = useState(0);
  const [monedaOrigen, setMonedaOrigen] = useState("");
  const [monedaDestino, setMonedaDestino] = useState("");
  const [resultado, setResultado] = useState(0);

  const datosMonedas = [
    { value: "", description: "Debe Seleccionar Una Moneda", default: true },
    { value: "DOP", description: "Peso Dominicano", default: false },
    { value: "USD", description: "Dólar Americano", default: false },
    { value: "EUR", description: "Euros", default: false },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultado(doConvertion(parseFloat(monto), monedaOrigen, monedaDestino));
  };

  const handleCoinsChange = () => {
    setMonedaOrigen(monedaDestino);
    setMonedaDestino(monedaOrigen);
    setResultado(doConvertion(parseFloat(monto), monedaDestino, monedaOrigen));
  };

  const doConvertion = (monto, origen, destino) => {
    let operacionResultado = 0;
    switch (origen) {
      case "DOP":
        if (destino === "USD") {
          operacionResultado = monto / 60;
        } else if (destino === "EUR") {
          operacionResultado = monto / 70;
        }
        break;
      case "USD":
        if (destino === "DOP") {
          operacionResultado = monto * 60;
        } else if (destino === "EUR") {
          operacionResultado = monto * 0.9;
        }
        break;
      case "EUR":
        if (destino === "DOP") {
          operacionResultado = monto * 70;
        } else if (destino === "USD") {
          operacionResultado = monto / 0.9;
        }
        break;
      default:
        operacionResultado = 0;
    }
    return operacionResultado;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Monto a Convertir:
            <input
              type="number"
              onChange={(e) => setMonto(e.target.value)}
              value={monto}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>Moneda Origen:</label>
          <SelectOption
            value={monedaOrigen}
            setValue={setMonedaOrigen}
            data={datosMonedas}
          />
        </div>
        <div className="form-group">
          <label>Moneda Destino:</label>
          <SelectOption
            value={monedaDestino}
            setValue={setMonedaDestino}
            data={datosMonedas}
          />
        </div>
        <div className="form-group">
          <label>Resultado de Conversión</label>
          <input value={resultado} readOnly />
        </div>
        <div id="button-section" className="form-group">
          <button type="submit">Convertir</button>
          <button type="button" onClick={handleCoinsChange}>
            Intercambiar Monedas
          </button>
        </div>
      </form>
    </>
  );
}
