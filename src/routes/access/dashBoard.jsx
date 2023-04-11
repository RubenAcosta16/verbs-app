import AuthProvider from "./authProvider";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";
import VerbDb from "./verbDb";

import { getLinks,insertVerb,deleteVerb,updateVerb } from "../../firebase/firebase";

import { v4 as uuidv4 } from "uuid";
// install npm install uuidv4

// let ar=["Alo","Ruben","Esta morra","Ya no quiero trabajar aaaaaaaaaaa"]

// ar.sort(function(a, b) {

//   if (b < a) {
//     return 1;
//   } else if (b > a) {
//     return -1;
//   } else {
//     return 0;
//   }
// });

// console.log(ar)

const dashBoard = () => {
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const [verbs, setVerbs] = useState([]);

  const [pastVerbs, setPastVerbs] = useState([]);
  const [phrasalVerbs, setPhrasalVerbs] = useState([]);

  const [verbsMode, setVerbsMode] = useState("past");
  // 1 past
  // 2 phrasal

  const navigate = useNavigate();

  const refNombre = useRef(null)
  const refSignificado = useRef(null)
  const refType = useRef(null)

  async function handleUserLoggedIn(user) {
    // navigate("/");
    setCurrentState(2);

    // console.log("sesion iniciada")
    // console.log(user)
    setCurrentUser(user);

    const resPastVerbs = await getLinks("past");

    // ordena alfabeticamente
    ordenarAlf(resPastVerbs)
    

    setPastVerbs([...resPastVerbs]);

    const resPrhasalVerbs = await getLinks("phrasal");

    ordenarAlf(resPrhasalVerbs)
    

    setPhrasalVerbs([...resPrhasalVerbs]);

    setVerbs([...resPastVerbs]);
  }

  function ordenarAlf(arr){
    arr.sort(function (a, b) {
      if (b.name < a.name) {
        return 1;
      } else if (b.name > a.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  // console.log(currentUser)

  if (currentState == 0) {
    return (
      <AuthProvider
        userLoggedIn={handleUserLoggedIn}
        userNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading...
      </AuthProvider>
    );
  }

  function handlePast() {
    setVerbsMode("past");

    setVerbs([...pastVerbs]);
  }

  function handlePhrasal() {
    setVerbsMode("phrasal");

    setVerbs([...phrasalVerbs]);
  }



  // enviar verbo
  function handleSubmit(e){
    e.preventDefault()
    const nombre=e.target["nombre"].value
    const significado=e.target["significado"].value

    const newVerb={
      name:nombre,
      verb:significado,
      docId:uuidv4()
    }

    try {
      insertVerb(newVerb,verbsMode)

      console.log("se envio el verbo")

      refNombre.current.value=""
      refSignificado.current.value=""

      // por ahora navigate para recargar
      if(verbsMode=="past"){

        const tmp=[...pastVerbs,newVerb]

        ordenarAlf(tmp)
        
        setPastVerbs([...tmp])
        setVerbs([...tmp])

         
      }else if(verbsMode=="phrasal"){
        const tmp=[...phrasalVerbs,newVerb]

        ordenarAlf(tmp)

        setPhrasalVerbs([...tmp])
        setVerbs([...tmp])
  
      }

    } catch (error) {
      console.log(error)
    }

  }

  async function remove(docId){
    await deleteVerb(docId,verbsMode)

    if(verbsMode=="past"){
      const tmp = pastVerbs.filter((verb) => verb.docId !== docId);
      setPastVerbs([...tmp])
      setVerbs([...tmp])
    }else if(verbsMode=="phrasal"){
      const tmp = phrasalVerbs.filter((verb) => verb.docId !== docId);
      setPhrasalVerbs([...tmp])
      setVerbs([...tmp])

    }
  }

  async function handleUpdateVerb(docId,name,verb){

    const newVerb = verbs.find((verb) => verb.docId === docId);
    newVerb.name = name;
    newVerb.verb = verb;
    
    // console.log(newVerb);

    // aqui el error, se ejecuta infinitas veces
    await updateVerb(docId,newVerb,verbsMode)

  }

  // console.log(verbs[0]?.name)
  // verbs?.map((verb) =>{
  //   console.log(verb.name)
  // })
  return (
    <Navbar>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Nombre</label>
        <input ref={refNombre} type="text" name="nombre"/>

        <label htmlFor="">Significado</label>
        <input ref={refSignificado} type="text" name="significado"/>



        <button type="submit">Enviar</button>
        
      </form>
      <div>
        <nav>
          <button onClick={handlePast}>Past</button>
          <button onClick={handlePhrasal}>Phrasal</button>
        </nav>

        {verbs?.map((verb) => (
          <VerbDb
            key={verb.docId}
            name={verb.name}
            verb={verb.verb}
            docId={verb.docId}
            onDelete={remove}
            onUpdate={handleUpdateVerb}
          ></VerbDb>
        ))}
      </div>
    </Navbar>
  );
};

export default dashBoard;
