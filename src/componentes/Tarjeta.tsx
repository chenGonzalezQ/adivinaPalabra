
import '../App.css'

export default function Tarjeta(props:TarjetaProps){

    

    return(
        <>
       
        <div style={{ display: "flex", gap: "8px" }} className="form-group border p-3 rounded d-inline-block">
           <span className={`letra ${props.visible ? "visible" : ""}`} >{props.visible? props.letra: '_'}</span>
        </div>
       
        
        </>
    )
}

interface TarjetaProps{
    letra:string;
    visible:boolean
}