import { useState } from "react";
import Tarjeta from "./componentes/Tarjeta";
import "./App.css";
import { palabras } from "./assets/datos/palabrasArray";
import acierto from "./assets/sonidos/aciertoPalabra.mp3";
import fallo from "./assets/sonidos/incorrectaPalabra.mp3";
import victoriia from "./assets/sonidos/victoria.mp3";
import { ReinicioIcono } from "./componentes/iconos/Iconos";
import ahorca from "./assets/sonidos/ahorcado.mp3";
import horca00 from "./assets/imagenes/horca00.png";
import horca0 from "./assets/imagenes/horca0.jpeg";
import horca1 from "./assets/imagenes/horca1.jpeg";
import horca2 from "./assets/imagenes/horca2.jpeg";
import horca3 from "./assets/imagenes/horca3.jpeg";
import horca4 from "./assets/imagenes/horca4.jpeg";
import horca5 from "./assets/imagenes/horca5.jpeg";
import horca6 from "./assets/imagenes/horca6.jpeg";
import ganar from "./assets/imagenes/ganar.png";
function App() {
  const sonidoAcierto = new Audio(acierto);
  const sonidoFallo = new Audio(fallo);
  const victoria = new Audio(victoriia);
  const ahorcado = new Audio(ahorca);
  const imagenHorca: string[] = [
    horca00,
    horca0,
    horca1,
    horca2,
    horca3,
    horca4,
    horca5,
    horca6,
  ];

  const [contadoravancehorca, setContadorAvanceHorca] = useState(0);
  const [aciertos, setAciertos] = useState<string[]>([]);
  const [desaciertos, setDesAciertos] = useState<string[]>([]);
  const [deshabilitado, setDeshabilitado] = useState(false);

  const [palabra, setPalabra] = useState<string[]>(() => {
    const indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice].split("");
  });
  const [intentos, setIntentos] = useState(7);
  const [mensajevictoria, setMensajeVictoria] = useState("");
  const [estado, setEstado] = useState(false);
  const [palabraoculta, setPalabraOculta] = useState(palabra);
  const [revelarpalabra, setRevelarPalabra] = useState(true);
  const [deshabilitarboton, setDeshabilitarBoton] = useState(true);

  const verificarLetra = (letra: string) => {
    //console.log(palabra)
    const letraIngresada = letra.toLowerCase();
    if (!palabra.includes(letraIngresada)) {
      if (!desaciertos.includes(letraIngresada)) {
        sonidoFallo.play();
        setContadorAvanceHorca(
          (contadoravancehorca) => contadoravancehorca + 1
        );
        setDesAciertos([...desaciertos, letraIngresada]);
        setIntentos((intentos) => intentos - 1);
      }

      if (intentos <= 1) {
        setTimeout(() => {
          ahorcado.play();
        }, 1000);

        setDeshabilitado(true);
        setRevelarPalabra(false);
        setDeshabilitarBoton(false);
        setPalabraOculta(palabra);
      }
    } else {
      sonidoAcierto.play();
      const nuevos = [...aciertos, letraIngresada];
      setAciertos(nuevos);

      if (palabra.every((letra) => nuevos.includes(letra))) {
        victoria.play();
        setEstado(true);
        setDeshabilitado(true);
        setMensajeVictoria("GANASTE!!!!");
        setDeshabilitarBoton(false);
      }
    }
  };

  const reiniciar = () => {
    const indice = Math.floor(Math.random() * palabras.length);
    setPalabra(palabras[indice].split(""));

    setContadorAvanceHorca(0);
    setAciertos([]);
    setIntentos(7);
    setDesAciertos([]);
    setDeshabilitado(false);
    setMensajeVictoria("");
    setDeshabilitarBoton(true);
    setPalabraOculta([]);
    setRevelarPalabra(true);
    setEstado(false);
  };

  return (
    <div className="contenedor-palabra">
      <h1>Juego del ahorcado</h1>
      <h3>{mensajevictoria}</h3>
      <div className="palabra-oculta">
        {palabra.map((letra, index) => (
          <Tarjeta
            key={index}
            letra={letra}
            visible={aciertos.includes(letra)}
          />
        ))}
      </div>

      <input
        placeholder="Ingresa letra a adivinar..."
        disabled={deshabilitado}
        type="text"
        maxLength={1}
        onChange={(e) => {
          verificarLetra(e.target.value);
          e.target.value = ""; // ← limpia el input
        }}
      />
      <span>Intentos restantes : {intentos}</span>
      <span style={{ backgroundColor: "" }}>
        {" "}
        Letras equivocadas : {desaciertos}
      </span>

      <span hidden={revelarpalabra}>
        La palabra oculta era : {palabraoculta}
      </span>
      <button
        className="btn btn-primary rounded-pill px-4 py-2"
        disabled={deshabilitarboton}
        onClick={reiniciar}
      >
        <ReinicioIcono /> Reinicio
      </button>
      <div>
        <img
          src={estado ? ganar : imagenHorca[contadoravancehorca]}
          alt="estado-ahorcado"
          style={{ width: "250px" }}
        />
      </div>
    </div>
  );
}

export default App;
