
import '../App.css'

import PreguntaIcono from './iconos/Iconos'
export default function Tarjeta(props:TarjetaProps){

    

    return(
        <>
       
        <div style={{backgroundColor:"red", display: "flex", gap: "8px" }} className="form-group border p-3 rounded d-inline-block">
           <span style={{color:"white"}}className={`letra ${props.visible ? "visible" : ""}`} >{props.visible? props.letra: <PreguntaIcono/>}</span>
        </div>
       
        
        </>
    )
}

interface TarjetaProps{
    letra:string;
    visible:boolean
}