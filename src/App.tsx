
import { useState } from 'react'
import Tarjeta from './componentes/Tarjeta'
import './App.css'
import { palabras } from './assets/datos/palabrasArray'
import acierto from './assets/sonidos/aciertoPalabra.mp3'
import fallo from './assets/sonidos/incorrectaPalabra.mp3'
import victoriia from './assets/sonidos/victoria.mp3'

function App() {

  const sonidoAcierto = new Audio(acierto);
  const sonidoFallo = new Audio(fallo);
 const victoria= new Audio(victoriia)
  const [aciertos,setAciertos]=useState<string[]>([])
  const [desaciertos,setDesAciertos]=useState<string[]>([])
  const [deshabilitado,setDeshabilitado]= useState(false)
 const [palabra, setPalabra] = useState<string[]>(() => {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice].split("");
});
  const [intentos,setIntentos]=useState(5)
  const [mensaje,setMensaje]=useState('')
  //const [palabrarevelada,setPalabraRevelada]=useState('')
  const[palabraoculta,setPalabraOculta]= useState(palabra)
const[revelarpalabra,setRevelarPalabra]=useState(true)
const[deshabilitarboton,setDeshabilitarBoton]=useState(true)

  const verificarLetra=(letra:string)=>{
    //console.log(palabra)
    const l= letra.toLowerCase();
     if(!palabra.includes(l)){
      if(!desaciertos.includes(l)){
        sonidoFallo.play();
       setDesAciertos([...desaciertos,l])
         setIntentos(intentos-1)
      }
       
                  if(intentos<=1){
                   setDeshabilitado(true)
                   setRevelarPalabra(false)
                   setDeshabilitarBoton(false)
                  setPalabraOculta(palabra)

                  }
          
}else{
  sonidoAcierto.play();
const nuevos=[...aciertos,l]
 setAciertos(nuevos)
 
 if (palabra.every(letra => nuevos.includes(letra))) {
   victoria.play();
    setDeshabilitado(true)
   setMensaje('GANASTE!!!!')
    setDeshabilitarBoton(false)
}
}
  }

  const reiniciar=()=>{
     const indice = Math.floor(Math.random() * palabras.length);
  setPalabra(palabras[indice].split(""));
  //setPalabraOculta(palabra)
    setAciertos([])
    setIntentos(5)
    setDesAciertos([])
    setDeshabilitado(false)
     setMensaje('')
       setDeshabilitarBoton(true)
     setPalabraOculta([])
     setRevelarPalabra(true)

    

  }

   
  return (
    
   
   <div className='contenedor-palabra'>
    <h3>{mensaje}</h3>
    <div className='palabra-oculta'>
    {palabra.map((letra,index)=>(
             <Tarjeta key={index} letra={letra} visible={aciertos.includes(letra)} />
    ))}
   
    </div>
  
      <input disabled={deshabilitado} type="text" maxLength={1} onChange={(e) => {
    verificarLetra(e.target.value);
    e.target.value = ""; // ← limpia el input
  }}
/>
    <span>Intentos restantes : {intentos}</span>
    <span style={{color:'red'}}> Letras equivocadas : {desaciertos}</span>

    <span hidden={revelarpalabra}>La palabra oculta era : {palabraoculta}</span>
    <button disabled={deshabilitarboton} onClick={reiniciar}>Reinicio</button>
  </div>
  )
}

export default App
