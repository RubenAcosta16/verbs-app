import AuthProvider from "./authProvider";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { showMessage } from "../../app/showMessage";

import Navbar from "./navbar";
import VerbDb from "./verbDb";
import ButtonDelete from "../verbs/buttonDeleteType";

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
  // 3 recargar

  const [currentUser, setCurrentUser] = useState({});

  const [verbs, setVerbs] = useState([]);
  const [verbsAllGot, setVerbsAllGot] = useState([])

  const [mainVerbs, setMainVerbs] = useState([]);

  const [currentTypesVerbs, setCurrentTypesVerbs] = useState([]);

  const [verbsMode, setVerbsMode] = useState("past");
  // 1 past
  // 2 phrasal

  const navigate = useNavigate();

  const refNombre = useRef(null);
  const refSignificado = useRef(null);
  const refGrupo = useRef(null);
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
    console.log(verbsAll)
    setVerbsAllGot(verbsAll)

    recibirArray(verbsAll,types)


  }

  function recibirArray(verbsAll,types){
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
    // console.log(arrMain);

    // console.log(arrMain)


    for (let i = 0; i < arrMain.length; i++) {
      const sortedArray = arrMain[i].verbs.sort((a, b) =>
        a.group > b.group ? 1 : -1
      );

      const groupedArray = sortedArray.reduce((acc, obj) => {
        if (!acc[obj.group]) {
          acc[obj.group] = [];
        }
        acc[obj.group].push(obj);
        return acc;
      }, {});

      const resultArray = Object.values(groupedArray);
      // console.log(resultArray)

      arrMain[i].verbs = resultArray;

      // console.log(arrMain[i].verbs)
      // // console.log(arrMain[i].verbs)

      // arrMain[i].verbs.sort(compararPorClasificacion);

      // // Crear varios arreglos con cada clasificación
      // const arreglosClasificados = [];
      // arrMain[i].verbs.forEach((verb) => {
      //   if (!arreglosClasificados[verb.group]) {
      //     arreglosClasificados[verb.group] = [];
      //   }
      //   arreglosClasificados[verb.group].push(verb);
      // });

      // // Imprimir los arreglos clasificados
      // console.log(arreglosClasificados);
      // arrClasificados[i]=arreglosClasificados
      // arrMain[i].verbs=arreglosClasificados
    }

    console.log(arrMain);
    // console.log(arrMain[0].verbs.length)

    // for (let i = 0; i < arrMain[0].verbs.length; i++) {

    // }

    setMainVerbs(arrMain);
    console.log(arrMain)
    setVerbs(arrMain[0].verbs);
    console.log(arrMain[0].verbs);
  }

  // console.log(mainVerbs)

  // const array = [
  //   { id: 1, clasificacion: "A" },
  //   { id: 2, clasificacion: "B" },
  //   { id: 3, clasificacion: "A" },
  //   { id: 4, clasificacion: "C" },
  //   { id: 5, clasificacion: "B" },
  //   { id: 6, clasificacion: "C" }
  // ];

  // const sortedArray = array.sort((a, b) => (a.clasificacion > b.clasificacion) ? 1 : -1);

  // const groupedArray = sortedArray.reduce((acc, obj) => {
  //   if (!acc[obj.clasificacion]) {
  //     acc[obj.clasificacion] = [];
  //   }
  //   acc[obj.clasificacion].push(obj);
  //   return acc;
  // }, {});

  // const resultArray = Object.values(groupedArray);
  // console.log(resultArray)

  // Definir la función de comparación
  function compararPorClasificacion(a, b) {
    if (a.group < b.group) {
      return -1;
    } else if (a.group > b.group) {
      return 1;
    } else {
      return 0;
    }
  }

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

    // console.log(mainVerbs);
    // console.log(tmp);

    setVerbsMode(type);
    // console.log(tmp)
    // console.log(mainVerbs)
    // console.log(currentTypesVerbs)

    setVerbs([...tmp[0].verbs]);
  }

  // enviar verbo
  function handleSubmit(e) {
    e.preventDefault();
    const nombre = e.target["nombre"].value;
    const significado = e.target["significado"].value;
    let grupo = e.target["grupo"].value;

    if (!grupo) {
      grupo = "Sin grupo";
    }

    if (nombre !== "" || significado !== "") {
      const newDocId = uuidv4();

      const newVerb = {
        name: nombre,
        verb: significado,
        docId: newDocId,
        type: verbsMode,
        group: grupo,
      };

      try {
        insertVerb(newVerb, "verbs", newDocId);

        showMessage("se envio el verbo");

        refNombre.current.value = "";
        refSignificado.current.value = "";
        refGrupo.current.value = "";

        // for (let i = 0; i < mainVerbs.length; i++) {
        //   if (mainVerbs[i].type == verbsMode) {
        //     // console.log(mainVerbs[i])
        //     mainVerbs[i].verbs.push(newVerb);
        //     ordenarAlf(mainVerbs[i].verbs);
        //     setVerbs([...mainVerbs[i].verbs]);
        //   }
        // }



        setVerbsAllGot([...verbsAllGot,newVerb])

        console.log(verbsAllGot)


        recibirArray(verbsAllGot,currentTypesVerbs)

        
      } catch (error) {
        console.log(error);
      }
    } else {
      showMessage("No pueden haber campos vacios", "e");
    }
  }

  async function remove(docId) {
    await deleteVerb(docId, "verbs");

    // for (let i = 0; i < mainVerbs.length; i++) {
    //   if (mainVerbs[i].type == verbsMode) {
    //     const tmp = mainVerbs[i].verbs.filter((verb) => verb.docId !== docId);
    //     mainVerbs[i].verbs = tmp;
    //     // console.log(mainVerbs[i].verbs)
    //     setVerbs([...mainVerbs[i].verbs]);
    //   }
    // }
    // }
    const tmp=verbsAllGot.filter((verb) => verb.docId !== docId);

    recibirArray(tmp,currentTypesVerbs)

//     let newVerb = {};
//     for (let i = 0; i < verbs.length; i++) {

//       newVerb = verbs[i].filter((verb) => verb.docId !== docId);

//       console.log(newVerb)

// // setVerbsAllGot([...verbsAllGot,newVerb])

//     //     console.log(verbsAllGot)


//     //     recibirArray(verbsAllGot,currentTypesVerbs)

//       // if (newVerb) {
//       //   console.log(verbs);
//       //   // console.log(docId, name, verb,group)
//       //   newVerb.name = name;
//       //   newVerb.verb = verb;
//       //   newVerb.group = group;

//       //   // console.log(newVerb);

//       //   // aqui el error, se ejecuta infinitas veces
//       //   await updateVerb(docId, newVerb, "verbs");

//       //   // setVerbsAllGot([...verbsAllGot,newVerb])

//       //   // console.log(verbsAllGot)


//       //   // recibirArray(verbsAllGot,currentTypesVerbs)
//       // }
//     }


    
  }

  async function handleUpdateVerb(docId, name, verb, group) {
    // const newVerb = verbs.find((verb) => verb.docId === docId);

    let newVerb = {};
    for (let i = 0; i < verbs.length; i++) {

      newVerb = verbs[i].find((verb) => verb.docId === docId);


      if (newVerb) {
        console.log(verbs);
        // console.log(docId, name, verb,group)
        newVerb.name = name;
        newVerb.verb = verb;
        newVerb.group = group;

        // console.log(newVerb);

        // aqui el error, se ejecuta infinitas veces
        await updateVerb(docId, newVerb, "verbs");

        // setVerbsAllGot([...verbsAllGot,newVerb])

        // console.log(verbsAllGot)


        // recibirArray(verbsAllGot,currentTypesVerbs)
      }
    }


  }

  // console.log(verbs[0]?.name)
  // verbs?.map((verb) =>{
  //   console.log(verb.name)
  // })

  function handleCrearTipo(e) {
    e.preventDefault();

    const tipo = e.target["type"].value;
    // console.log(tipo);

    if (tipo !== "") {
      const newDocId = uuidv4();

      const newType = {
        type: tipo,
        docId: newDocId,
      };
      // console.log(currentTypesVerbs);

      const newMainVerb = {
        type: tipo,
        verbs: [{ name: "Sin verbos aun", verb: "", docId: newDocId }],
      };

      try {
        // para crear tipo
        insertVerb(newType, "types", newDocId);

        showMessage("se creo el tipo");
        // console.log(newType);

        refCrearTipo.current.value = "";

        setCurrentTypesVerbs([...currentTypesVerbs, newType]);

        // setMainVerbs([...mainVerbs, newMainVerb]);
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
    } else {
      showMessage("No pueden haber campos vacios", "e");
    }
  }
  // console.log(mainVerbs);

  if (currentState == 3) {
    navigate("/dashboard");
  }

  async function handleDeleteType(docId, type) {
    await deleteVerb(docId, "types");

    // console.log(currentTypesVerbs)

    const tmp = currentTypesVerbs.filter(
      (typeVerb) => typeVerb.docId !== docId
    );

    // console.log(tmp)

    setCurrentTypesVerbs([...tmp]);

    for (let i = 0; i < mainVerbs.length; i++) {
      if (mainVerbs[i].type == type) {
        // await deleteVerb(mainVerbs[i].docId, "verbs");
        // console.log(mainVerbs[i].verbs)
        for (let i2 = 0; i2 < mainVerbs[i].verbs.length; i2++) {
          // console.log(mainVerbs[i].verbs[i2].docId);
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

  // console.log(verbs)
  // verbs.forEach((verbGroup) => (
  //   // console.log(verbGroup)

  // ))

  return (
    <Navbar>
      <Link to="/">Pagina principal</Link>
      <div>
        <div>Crear tipo de verbos</div>

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

        <label htmlFor="">Grupo</label>
        <div>Si se queda vacio es porque no tiene grupo</div>
        <input ref={refGrupo} type="text" name="grupo" />

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
              <ButtonDelete
                type={type}
                handleDeleteType={handleDeleteType}
              ></ButtonDelete>
            </div>
          ))}
        </nav>

        {verbs?.map((verbGroup) => (
          // console.log(verbGroup)

          <div key={verbGroup[0].docId}>
            grupo-------------------------------------{verbGroup[0].group}
            {verbGroup.map((verb) => (
              <VerbDb
                key={verb.docId}
                name={verb.name}
                verb={verb.verb}
                docId={verb.docId}
                group={verb.group}
                onDelete={remove}
                onUpdate={handleUpdateVerb}
              ></VerbDb>
            ))}
          </div>
        ))}
      </div>
    </Navbar>
  );
};

export default dashBoard;

// poner opcion de habiltar verbos o algo asi al crear un tipo de verbo en un checbox, si esta habilitado hago todo mi desmadre, sino los imprimo asi tal cual sin separar, como ya estan separados solo los imprimo igual pero sin separador

// enseguida del delete verb poner el mismo check


