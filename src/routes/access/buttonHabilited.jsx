import {useState} from 'react'

import {updateVerb} from '../../firebase/firebase'

const buttonHabilited = ({type}) => {
    // console.log(type)

  const [habilited, setHabilited] = useState(type.habilited)


//   if(type?.habilited){
//     setHabilited(false)
//   }else{
//     setHabilited(true)
//   }

  async function handleHabilitarVerbos(){
    setHabilited(true)

    let tmpType={
        docId:type.docId,
        type:type.type,
        habilited:true,
        descripcion:type.descripcion
    }


    await updateVerb(type.docId, tmpType, "types");
  }

  async function handleQuitarVerbos(){
    setHabilited(false)

    let tmpType={
        docId:type.docId,
        type:type.type,
        habilited:false,
        descripcion:type.descripcion
        
    }


    await updateVerb(type.docId, tmpType, "types");
  }

  return (
    <div style={{ display: "inline" }}>
      {habilited ? (
        <button onClick={handleQuitarVerbos}>Quitar Grupos</button>
        ) : (
            
            <button onClick={handleHabilitarVerbos}>Habilitar Grupos</button>
      )}
    </div>
  );
};

export default buttonHabilited;
