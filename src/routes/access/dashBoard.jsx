import AuthProvider from "./authProvider";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";
import VerbDb from "./verbDb";
import ButtonDelete from '../verbs/buttonDeleteType'

import {
  getLinks,
  insertVerb,
  deleteVerb,
  updateVerb,
  deleteType,
} from "../../firebase/firebase";

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

  const [mainVerbs, setMainVerbs] = useState([]);

  const [currentTypesVerbs, setCurrentTypesVerbs] = useState([]);

  const [verbsMode, setVerbsMode] = useState("past");
  // 1 past
  // 2 phrasal



  const navigate = useNavigate();

  const refNombre = useRef(null);
  const refSignificado = useRef(null);
  const refType = useRef(null);

  const refCrearTipo = useRef(null);

  async function handleUserLoggedIn(user) {
    // navigate("/");
    setCurrentState(2);

    // console.log("sesion iniciada")
    // console.log(user)
    setCurrentUser(user);

    // para obtener tipos
    const types = await getLinks("types");

    // console.log(types)

    setCurrentTypesVerbs(types);

    // console.log(types)

    // obtener verbos
    const verbsAll = await getLinks("verbs");

    let arrMain = [];
    for (let i = 0; i < types.length; i++) {
      // console.log(tmp)
      // const tmp = await getLinks(types[i].type);

      const tmp = verbsAll.filter((verb) => verb.type == types[i].type);

      const obj = {
        type: types[i].type,
        verbs: tmp,
      };
      arrMain[i] = obj;
      // ordena alfabeticamente
      ordenarAlf(arrMain[i].verbs);
    }
    console.log(arrMain);

    // console.log(arrMain)

    setMainVerbs(arrMain);
    // console.log(arrMain)
    setVerbs(arrMain[0].verbs);
  }

  // console.log(mainVerbs)

  function ordenarAlf(arr) {
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

  async function handleType(type) {
    let tmp = await mainVerbs.filter((verbs) => verbs.type == type);

    // console.log(type);
    // console.log(tmp);

    setVerbsMode(tmp[0].type);
    setVerbs([...tmp[0].verbs]);
  }

  // enviar verbo
  function handleSubmit(e) {
    e.preventDefault();
    const nombre = e.target["nombre"].value;
    const significado = e.target["significado"].value;

    const newVerb = {
      name: nombre,
      verb: significado,
      docId: uuidv4(),
      type: verbsMode,
    };

    try {
      insertVerb(newVerb, "verbs");

      console.log("se envio el verbo");

      refNombre.current.value = "";
      refSignificado.current.value = "";

      for (let i = 0; i < mainVerbs.length; i++) {
        if (mainVerbs[i].type == verbsMode) {
          // console.log(mainVerbs[i])
          mainVerbs[i].verbs.push(newVerb);
          ordenarAlf(mainVerbs[i].verbs);
          setVerbs([...mainVerbs[i].verbs]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(docId) {
    await deleteVerb(docId, "verbs");
    // await deleteVerb(docId, verbsMode);

    for (let i = 0; i < mainVerbs.length; i++) {
      if (mainVerbs[i].type == verbsMode) {
        const tmp = mainVerbs[i].verbs.filter((verb) => verb.docId !== docId);
        mainVerbs[i].verbs = tmp;
        // console.log(mainVerbs[i].verbs)
        setVerbs([...mainVerbs[i].verbs]);
      }
    }
    // }
  }

  async function handleUpdateVerb(docId, name, verb) {
    const newVerb = verbs.find((verb) => verb.docId === docId);
    newVerb.name = name;
    newVerb.verb = verb;

    // console.log(newVerb);

    // aqui el error, se ejecuta infinitas veces
    await updateVerb(docId, newVerb, "verbs");
  }

  // console.log(verbs[0]?.name)
  // verbs?.map((verb) =>{
  //   console.log(verb.name)
  // })

  function handleCrearTipo(e) {
    e.preventDefault();

    const tipo = e.target["type"].value;
    // console.log(tipo);

    const newType = {
      type: tipo,
      docId: uuidv4(),
    };
    // console.log(currentTypesVerbs);

    const newMainVerb = {
      type: tipo,
      verbs: [{ name: "Sin verbos aun", verb: "" }],
    };

    try {
      // para crear tipo
      insertVerb(newType, "types");

      console.log("se envio el tipo");
      // console.log(newType);

      refCrearTipo.current.value = "";

      setCurrentTypesVerbs([...currentTypesVerbs, newType]);

      setMainVerbs([...mainVerbs, newMainVerb]);

      // console.log(mainVerbs);

      // setVerbsMode()

      // for (let i = 0; i < currentTypesVerbs.length; i++) {
      //   if (currentTypesVerbs[i].type == verbsMode) {
      //     // console.log(mainVerbs[i])
      //     mainVerbs[i].verbs.push(newVerb);
      //     ordenarAlf(mainVerbs[i].verbs);
      //     setVerbs([...mainVerbs[i].verbs]);
      //   }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(mainVerbs);

  async function handleDeleteType(docId, type) {
    await deleteVerb(docId, "types");

    // console.log(currentTypesVerbs)

    const tmp = currentTypesVerbs.filter(
      (typeVerb) => typeVerb.docId !== docId
    );

    // console.log(tmp)

    setCurrentTypesVerbs([...tmp]);

    const verbVacio = [{ name: "vacio", verb: "" }];
    setVerbs(verbVacio);

    

    for (let i = 0; i < mainVerbs.length; i++) {
      if (mainVerbs[i].type == type) {
        // await deleteVerb(mainVerbs[i].docId, "verbs");
        // console.log(mainVerbs[i].verbs)
        for (let i2 = 0; i2 < mainVerbs[i].verbs.length; i2++) {
          console.log(mainVerbs[i].verbs[i2].docId)
          await deleteVerb(mainVerbs[i].verbs[i2].docId, "verbs");
        }
      }
    }

    // for (let i = 0; i < currentTypesVerbs.length; i++) {
    //   if (currentTypesVerbs[i].type == type) {
    //     const tmp = mainVerbs[i].verbs.filter((verb) => verb.docId == docId);
    //     // currentTypesVerbs[i].verbs = tmp;
    //     // console.log(mainVerbs[i].verbs)
    //     console.log(tmp)
    //     setCurrentTypesVerbs([...tmp]);
    //     // setCurrentTypesVerbs(tmp)
    //   }
    // }

    // setCurrentTypesVerbs([...currentTypesVerbs, newType]);

    // setMainVerbs([...mainVerbs, newMainVerb]);
  }

  // console.log(verbs)



  return (
    <Navbar>
      <div>
        <div>
          <button>Crear tipo de verbos</button>
        </div>
        <form action="" onSubmit={handleCrearTipo}>
          <label htmlFor="">Nombre:</label>
          <input ref={refCrearTipo} name="type" type="text" />
          <button type="submit">Crear</button>
        </form>
        <br />
        <br />
      </div>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Nombre</label>
        <input ref={refNombre} type="text" name="nombre" />

        <label htmlFor="">Significado</label>
        <input ref={refSignificado} type="text" name="significado" />

        <button type="submit">Enviar</button>
      </form>
      <div>
        <nav>
          {currentTypesVerbs.map((type) => (
            <div key={type.docId}>
              <button
                onClick={() => {
                  handleType(type.type);
                }}
              >
                {type.type}
              </button>
              <ButtonDelete type={type} handleDeleteType={handleDeleteType}>
               
              </ButtonDelete>
            </div>
          ))}
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


