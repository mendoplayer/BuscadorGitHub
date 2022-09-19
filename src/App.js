import React, { useEffect } from 'react'
import {motion, useAnimation} from 'framer-motion' 


const estilo = {
  cajaGral :{
    backgroundColor: "#000000",
    height: '100vh',
  },
  header:{
    height: '70vh',
  },
titulo:{
  padding: 20,
  fontFamily: 'Bungee Spice', 
  fontSize: '10vh',
},
input:{
border: '1px solid',
borderRadius: 10,
padding:5
},
label:{  
paddingLeft: 10,
}
}

function App() {

  const letrasAnimation = useAnimation();

  useEffect(() => {
   letrasAnimation.start({
    x: 50,
    transition: {duration: 4},     
   });
  }, [])
  

  return (
    <div style={estilo.cajaGral}>
      <header className="center row"  style={estilo.header}>
         <motion.h1 
            className="white-text container " 
            style={estilo.titulo}
            animate={letrasAnimation} 
            initial={{x: -1000}}        
            >
              ¡ Bienvenidos 
              </motion.h1>
         <motion.h2 
         className="white-text container" 
         style={estilo.titulo}
         animate={letrasAnimation} 
         initial={{x: -2000}}  
         >
          al buscador de
          </motion.h2>
         <motion.h2 
         className="white-text container" 
         style={estilo.titulo}
         animate={letrasAnimation} 
         initial={{x: -3000}}  
         > 
         GitHub !
         </motion.h2>  
     </header>
         <body >
         <motion.form 
         className="container row valign-wrapper"
         animate={letrasAnimation} 
         initial={{x: -4000}}  
         >   
        <div className="input-field col s6 offset-s1" >
          <input  id="repositorio" type="text" className=" white-text"  style={estilo.input}/>
          <label for="repositorio " style={estilo.label}>Repositorio</label>
        </div>             
        <button class="btn green darken-3  waves-effect waves-light col s2 offset-s1" type="submit" name="action">Buscar</button>
    </motion.form>
         </body>
    </div>
  );
}

export default App;

