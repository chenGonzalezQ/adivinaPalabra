import "../App.css";

import PreguntaIcono from "./iconos/Iconos";
export default function Tarjeta(props: TarjetaProps) {
  return (
    <>
      <div className="form-group border p-3 rounded d-inline-block">
        <span
          style={{ color: "black" }}
          className={`letra ${props.visible ? "visible" : ""}`}
        >
          {props.visible ? props.letra : <PreguntaIcono />}
        </span>
      </div>
    </>
  );
}

interface TarjetaProps {
  letra: string;
  visible: boolean;
}
