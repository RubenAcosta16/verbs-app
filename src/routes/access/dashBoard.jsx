import AuthProvider from "./authProvider";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { showMessage } from "../../app/showMessage";

import Navbar from "./navbar";
import VerbDb from "./verbDb";
import ButtonDelete from "../verbs/buttonDeleteType";
import GroupVerb from "./groupVerb";
import ButtonHabilited from "./buttonHabilited";
import DescripcionEdit from "./descriptionEdit";
import DeleteGroup from "./deleteGroup";
import EditTypeName from "./editTypeName";

import "./css/main.css";
import "./css/inputs.css";

import {
  getLinks,
  insertVerb,
  deleteVerb,
  updateVerb,
  deleteType,
} from "../../firebase/firebase";

import { v4 as uuidv4 } from "uuid";
// install npm install uuidv4

const dashBoard = () => {
  const [currentState, setCurrentState] = useState(0);
  // 3 recargar

  const [currentUser, setCurrentUser] = useState({});

  const [verbs, setVerbs] = useState([]);
  //lista de verbos que se imprimen y muestran, estos se agrupan o lo que sea
  const [verbsAllGot, setVerbsAllGot] = useState([]);
  //todos los recibidos asi sin manipular

  const [mainVerbs, setMainVerbs] = useState([]);
  //contiene los tipos de verbos, solo descripcion, nombre y los verbos
  const [currentTypesVerbs, setCurrentTypesVerbs] = useState([]);
  //los tipos de verbos, con sus atributos, docId y eso, sin verbos

  const [typeVerbMain, setTypeVerbMain] = useState({});
  //el tipo de verbo que se esta usando, tipo, descripcion y sus verbos

  //para conservar el grupo
  const [inputGrupo, setInputGrupo] = useState(false);

  const navigate = useNavigate();

  const refNombre = useRef(null);
  const refSignificado = useRef(null);
  const refGrupo = useRef(null);
  const refType = useRef(null);

  const refCrearTipo = useRef(null);
  const refTipoDescripcion = useRef(null);

  const buttonsState0 = useRef(null);
  const buttonsState1 = useRef(null);
  const buttonsState2 = useRef(null);

  // css----------------------
  const [buttonsState, setButtonsState] = useState(0);
  //0 crear tipos
  //1 crear verbos
  //2 editar verbos

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
    // console.log(verbsAll)
    setVerbsAllGot(verbsAll);

    recibirArray(verbsAll, types, types[0].type);
  }

  // console.log(verbsAllGot)
  // verbsAllGot.map((verb) =>{
  //     // console.log(verb)
  //     const tmp={
  //       docId: uuidv4(),
  //     group: verb.group,
  //     name: verb.name,
  //     type: verb.type,
  //     verb: verb.verb
  //     }
  //     console.log(tmp)
  //     updateVerb(verb.docId,tmp,"verbs")
  //   })
  // // const de=verbsAllGot.filter((verb) => verb.name == "Drive ");
  // // console.log(de)

  //esto le mantas los verbos, tipos y el tipo de verbo actual y los ordena en grupos ya todo listo para mandarselo a verbs
  function recibirArray(verbsAll, types, typeMode) {
    // console.log(verbsAll)
    let arrMain = [];
    for (let i = 0; i < types.length; i++) {
      // console.log(tmp)
      // const tmp = await getLinks(types[i].type);

      const tmp = verbsAll.filter((verb) => verb.type == types[i].type);

      const obj = {
        type: types[i].type,
        descripcion: types[i]?.descripcion,
        verbs: tmp,
      };
      // console.log(types[i]?.descripcion)
      arrMain[i] = obj;
      // ordena alfabeticamente
      ordenarAlf(arrMain[i].verbs);
    }
    // console.log(arrMain);
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

    // console.log(arrMain);
    // console.log(arrMain[0].verbs.length)

    // for (let i = 0; i < arrMain[0].verbs.length; i++) {

    // }
    // console.log(typeMode)
    // console.log(arrMain);
    const tmp = arrMain.filter((verbsArr) => verbsArr.type == typeMode);
    // console.log(tmp[0]);

    if (tmp[0].descripcion) {
      setTypeVerbMain(tmp[0]);
      // setDescripcionMode(tmp[0]?.descripcion)
    } else {
      let newType = {
        type: tmp[0].type,
        descripcion: "Sin descripcion",
        verbs: tmp[0].verbs,
      };

      // setDescripcionMode("Sin descripcion")
      setTypeVerbMain(newType);
    }

    // if (tmp[0].descripcion) {
    //   setDescripcionMode(tmp[0]?.descripcion)
    // }else{
    //   setDescripcionMode("Sin descripcion")
    // }
    // setDescripcionMode()

    setMainVerbs(arrMain);
    // console.log(arrMain)
    setVerbs(tmp[0].verbs);
    // console.log(arrMain[0].verbs);
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
    if (buttonsState != 1) {
      setButtonsState(2);
      buttonsState2.current.classList.add("buttonStateOn");
      buttonsState1.current.classList.remove("buttonStateOn");
      buttonsState0.current.classList.remove("buttonStateOn");
    }

    console.log(type);
    let tmp = await mainVerbs.filter((verbs) => verbs.type == type);

    // console.log(tmp[0]?.descripcion);
    // console.log(tmp);

    // setVerbsMode(type);
    // setTypeVerbMain(tmp[0])
    // console.log(tmp)
    // console.log(mainVerbs)
    // console.log(currentTypesVerbs)

    setVerbs([...tmp[0].verbs]);

    if (tmp[0].descripcion) {
      setTypeVerbMain(tmp[0]);
      // setDescripcionMode(tmp[0]?.descripcion)
    } else {
      let newType = {
        type: tmp[0].type,
        descripcion: "Sin descripcion",
        verbs: tmp[0].verbs,
      };

      // setDescripcionMode("Sin descripcion")
      setTypeVerbMain(newType);
    }
  }

  // console.log(verbsMode)

  // enviar verbo
  // console.log(verbsAllGot)
  function handleSubmitVerb(e) {
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
        type: typeVerbMain.type,
        group: grupo,
      };
      // console.log(newVerb)

      //solo valida si hay uno con el mismo nombre en el mismo grupo
      const verbsFound = verbsAllGot.find(
        (verb) => verb.name.toLowerCase() === nombre.toLowerCase()
      );
      if (verbsFound) {
        // console.log(verbsFound)
        showMessage("Hay otro verbo igual, no se puede agregar", "e");
      } else {
        try {
          insertVerb(newVerb, "verbs", newDocId);

          showMessage("se envio el verbo");

          refNombre.current.value = "";
          refSignificado.current.value = "";

          if (!inputGrupo) {
            refGrupo.current.value = "";
          }

          // for (let i = 0; i < mainVerbs.length; i++) {
          //   if (mainVerbs[i].type == verbsMode) {
          //     // console.log(mainVerbs[i])
          //     mainVerbs[i].verbs.push(newVerb);
          //     ordenarAlf(mainVerbs[i].verbs);
          //     setVerbs([...mainVerbs[i].verbs]);
          //   }
          // }

          setVerbsAllGot([...verbsAllGot, newVerb]);
          const tmp = [...verbsAllGot, newVerb];

          // console.log(tmp)

          recibirArray(tmp, currentTypesVerbs, typeVerbMain.type);

          // console.log(arr)
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      showMessage("No pueden haber campos vacios", "e");
    }
  }
  // console.log(verbsAllGot)
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
    const tmp = verbsAllGot.filter((verb) => verb.docId !== docId);
    setVerbsAllGot([...tmp]);

    recibirArray(tmp, currentTypesVerbs, typeVerbMain.type);

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

  async function handleUpdateVerb(docId, name, verb, group, groupCall = false) {
    // const newVerb = verbs.find((verb) => verb.docId === docId);

    let newVerb = {};
    for (let i = 0; i < verbs.length; i++) {
      newVerb = verbs[i].find((verb) => verb.docId === docId);

      if (newVerb) {
        // console.log(verbs);
        // console.log(docId, name, verb,group)
        newVerb.name = name;
        newVerb.verb = verb;
        newVerb.group = group;

        // console.log(newVerb);

        // aqui el error, se ejecuta infinitas veces
        await updateVerb(docId, newVerb, "verbs");

        if (groupCall) {
          const tmp = verbsAllGot.filter((verb) => verb.docId !== docId);
          setVerbsAllGot([...tmp, newVerb]);

          recibirArray([...tmp, newVerb], currentTypesVerbs, typeVerbMain.type);
        }

        // setVerbsAllGot([...verbsAllGot,newVerb])

        // console.log(verbsAllGot)

        // recibirArray(verbsAllGot,currentTypesVerbs)

        // const tmp=[...verbsAllGot,newVerb]

        // console.log(tmp)

        // recibirArray(tmp,currentTypesVerbs,verbsMode)
      }
    }
  }

  // console.log(verbs[0]?.name)
  // verbs?.map((verb) =>{
  //   console.log(verb.name)
  // })

  // console.log(currentTypesVerbs)

  function handleCrearTipo(e) {
    e.preventDefault();

    const tipo = e.target["type"].value;
    let descripcion = e.target["tipoDescripcion"].value;

    if (descripcion == "") {
      descripcion = "Sin descripcion";
    }

    const tmp = currentTypesVerbs.find(
      (type) => type.type.toLowerCase() == tipo.toLowerCase()
    );

    // console.log(tipo);

    if (tipo !== "") {
      if (tmp) {
        console.log("ya existe");
      } else {
        const newDocId = uuidv4();

        const newType = {
          type: tipo,
          descripcion: descripcion,
          docId: newDocId,
        };
        // console.log(currentTypesVerbs);

        const newMainVerb = {
          type: tipo,
          descripcion: descripcion,
          verbs: [[{ name: "Sin verbos aun", verb: "", docId: newDocId }]],
        };

        try {
          // para crear tipo
          insertVerb(newType, "types", newDocId);

          showMessage("se creo el tipo");
          // console.log(newType);

          refCrearTipo.current.value = "";
          refTipoDescripcion.current.value = "";

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

  // console.log(verbs)

  async function handleUpdateGroup(group, groupArr) {
    console.log(group);
    console.log(groupArr);

    // groupArr.map((verb) =>{
    //   verb.group=group

    // })

    let tmp = verbsAllGot;
    let objs = [];
    for (let i = 0; i < groupArr.length; i++) {
      console.log(groupArr[i]);
      tmp = tmp.filter((verb) => verb.docId !== groupArr[i].docId);

      groupArr[i].group = group;
      objs[i] = groupArr[i];

      await handleUpdateVerb(
        groupArr[i].docId,
        groupArr[i].name,
        groupArr[i].verb,
        groupArr[i].group
      );
    }

    // console.log(verbsAllGot)
    // console.log(tmp)

    // console.log(objs)

    // tmp

    // const tmp=verbsAllGot
    // .filter((verb) => verb.docId !== docId);
    setVerbsAllGot([...tmp, ...objs]);

    recibirArray([...tmp, ...objs], currentTypesVerbs, typeVerbMain.type);
  }
  // console.log(mainVerbs)

  async function handleUpdateDescription(docId, newType) {
    await updateVerb(docId, newType, "types");
    // console.log("se cambio");
    showMessage("Se cambio la descripcion");

    const tmp = currentTypesVerbs.filter(
      (type) => type.docId !== newType.docId
    );

    // console.log(tmp);

    setCurrentTypesVerbs([...tmp, newType]);
  }

  // console.log(verbsAllGot.length);

  async function handleDeleteGroup(group) {
    let tmp = verbsAllGot;

    for (let i = 0; i < group.length; i++) {
      deleteVerb(group[i].docId, "verbs");

      console.log(group[i]);

      tmp = tmp.filter((verb) => verb.docId !== group[i].docId);
    }
    setVerbsAllGot([...tmp]);
    recibirArray(tmp, currentTypesVerbs, typeVerbMain.type);

    // const tmp = currentTypesVerbs.filter(
    //   (typeVerb) => typeVerb.docId !== docId
    // );

    // // console.log(tmp)

    // setCurrentTypesVerbs([...tmp]);

    // for (let i = 0; i < mainVerbs.length; i++) {
    //   if (mainVerbs[i].type == type) {
    //     // await deleteVerb(mainVerbs[i].docId, "verbs");
    //     // console.log(mainVerbs[i].verbs)
    //     for (let i2 = 0; i2 < mainVerbs[i].verbs.length; i2++) {
    //       // console.log(mainVerbs[i].verbs[i2].docId);
    //       await deleteVerb(mainVerbs[i].verbs[i2].docId, "verbs");
    //     }
    //   }
    // }

    // const tmp = verbsAllGot.filter((verb) => verb.docId !== docId);
    // setVerbsAllGot([...tmp]);

    // recibirArray(tmp, currentTypesVerbs, typeVerbMain.type);
  }

  // console.log(verbsAllGot);
  // console.log(currentTypesVerbs);

  async function handleUpdateTypeName(docId, newType, newTypeMainVerbs) {
    // console.log(docId);
    // console.log(newType);
    // console.log(newTypeMainVerbs);

    const tmp = currentTypesVerbs.find(
      (type) => type.type.toLowerCase() == newTypeMainVerbs.type.toLowerCase()
    );

    // console.log(tipo);

    if (newTypeMainVerbs.type !== "") {
      if (tmp) {
        console.log("ya existe");
      } else {
        try {
          await updateVerb(docId, newType, "types");
          // console.log(newTypeMainVerbs.verbs.length)

          for (let i = 0; i < newTypeMainVerbs.verbs.length; i++) {
            console.log(newTypeMainVerbs.verbs[i]);
            // if (mainVerbs[i].type == newType.type) {

            // console.log(mainVerbs[i].verbs)
            for (let i2 = 0; i2 < newTypeMainVerbs.verbs[i].length; i2++) {
              const tmp = {
                docId: newTypeMainVerbs.verbs[i][i2].docId,
                group: newTypeMainVerbs.verbs[i][i2].group,
                name: newTypeMainVerbs.verbs[i][i2].name,
                type: newTypeMainVerbs.type,
                verb: newTypeMainVerbs.verbs[i][i2].verb,
              };
              console.log(newTypeMainVerbs.verbs[i][i2].group);
              // console.log(mainVerbs[i].verbs[i2].docId);
              await updateVerb(
                newTypeMainVerbs.verbs[i][i2].docId,
                tmp,
                "verbs"
              );
              // console.log(newTypeMainVerbs.verbs[i][i2])
            }
            // }
          }

          // console.log("se cambio");
          showMessage("Se cambio el Nombre");

          const tmp = currentTypesVerbs.filter(
            (type) => type.docId !== newType.docId
          );

          const tmp2 = mainVerbs.filter(
            (type) => type.type !== newTypeMainVerbs.type
          );

          // console.log(tmp);

          setTypeVerbMain(newTypeMainVerbs);
          setCurrentTypesVerbs([...tmp, newType]);
          setMainVerbs([...tmp2, newTypeMainVerbs]);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      showMessage("No pueden haber campos vacios", "e");
    }
  }

  // console.log(typeVerbMain)
  // console.log(currentTypesVerbs)
  // console.log(mainVerbs)

  let timer;

  document.addEventListener("input", (e) => {
    const el = e.target;

    if (el.matches("[data-color]")) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.documentElement.style.setProperty(
          `--color-${el.dataset.color}`,
          el.value
        );
      }, 100);
    }
  });

  // console.log(currentTypesVerbs);

  return (
    <div className="bg-white eq-body">
      <Navbar></Navbar>
      {/* <h1 className="fs-1 my-5">Dashboard</h1> */}

      <div className="container-main">
        <nav className="container-aside d-flex flex-column gap-3 pb-3">
          <div className="container-aside-title w-100">
            <p className="fs-4 fw-semibold">Edit Verbs</p>
          </div>
          <nav className="container-aside-buttons d-flex flex-column gap-2">
            <button
              ref={buttonsState0}
              className="my-button buttonStateOn"
              onClick={() => {
                setButtonsState(0);
                // console.log("on")

                buttonsState0.current.classList.add("buttonStateOn");
                buttonsState1.current.classList.remove("buttonStateOn");
                buttonsState2.current.classList.remove("buttonStateOn");
              }}
            >
              Crear tipos
            </button>
            <button
              ref={buttonsState1}
              className="my-button"
              onClick={() => {
                setButtonsState(1);

                buttonsState1.current.classList.add("buttonStateOn");
                buttonsState0.current.classList.remove("buttonStateOn");
                buttonsState2.current.classList.remove("buttonStateOn");
              }}
            >
              Crear verbos
            </button>
            <button
              ref={buttonsState2}
              className="my-button"
              onClick={() => {
                setButtonsState(2);

                buttonsState2.current.classList.add("buttonStateOn");
                buttonsState1.current.classList.remove("buttonStateOn");
                buttonsState0.current.classList.remove("buttonStateOn");
              }}
            >
              Editar verbos
            </button>
          </nav>

          <div className="container-aside-btn-types d-flex flex-column gap-3 my-1">
            <p className="container-aside-types-title fs-4">Tipos</p>
            {/* tipos */}
            <div className="container-aside-types w-100 d-flex flex-column gap-2 flex-wrap gap-3">
              {currentTypesVerbs.map((type) => (
                <div
                  key={type.docId}
                  className="container-aside-types-button d-flex justify-content-center"
                >
                  <button
                    className="aside-my-button aside-my-button-type fs-4 my-button-c-r mb-2"
                    onClick={() => {
                      handleType(type.type);
                    }}
                  >
                    {type.type}
                  </button>
                  <div className="d-flex justify-content-between">
                    <ButtonDelete
                      type={type}
                      handleDeleteType={handleDeleteType}
                    ></ButtonDelete>

                    <ButtonHabilited type={type}></ButtonHabilited>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="container-section">
          {/* form 1 */}
          {buttonsState == 0 ? (
            <div className="container-sm form-verbs rounded-2 py-3 px-5 my-5 container-section-card">
              <form
                action=""
                onSubmit={handleCrearTipo}
                className="contenedor-forms d-flex flex-column fs-6 align-items-center gap-0 row-gap-5"
              >
                <div className="fs-3 my-4 container-section-card-title">
                  Crear tipo de verbos
                </div>
                {/* <label htmlFor="">Nombre:</label>
          <input ref={refCrearTipo} name="type" type="text" /> */}

                <div className="form__group field my-2">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Name"
                    name="type"
                    id="name"
                    required
                    ref={refCrearTipo}
                  />
                  <label htmlFor="name" className="form__label">
                    Nombre:
                  </label>
                </div>

                <div className="form__group field  my-2">
                  <textarea
                    cols="40"
                    rows="3"
                    type="input"
                    className="form__field"
                    placeholder="Name"
                    name="tipoDescripcion"
                    id="name"
                    required
                    ref={refTipoDescripcion}
                  ></textarea>
                  <label htmlFor="name" className="form__label">
                    Descripcion:
                  </label>
                </div>

                <div className="px-auto mt-3">
                  <button className="btn btn-dark" type="submit">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          ) : buttonsState == 1 ? (
            <div className="container-sm form-verbs rounded-2 py-3 px-5 my-5 container-section-card">
              <form
                action=""
                onSubmit={handleSubmitVerb}
                className="contenedor-forms d-flex flex-column fs-6 align-items-center gap-0 row-gap-5"
              >
                <div className="fs-3 my-4 container-section-card-title">
                  Crear verbos
                </div>
                <div className="fs-6 my-2 d-flex flex-column align-items-center">
                  <p>Tipo de verbo seleccionado:</p>
                  <p
                    className="fs-5 section-type-verb"
                    style={{ textAlign: "center" }}
                  >
                    {typeVerbMain.type}
                  </p>
                </div>
                {/* <label htmlFor="">Nombre:</label>
            <input ref={refCrearTipo} name="type" type="text" /> */}

                {/* <label htmlFor="">Nombre</label>
            <input ref={refNombre} type="text" name="nombre" /> */}
                <div className="form__group field mt-3">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Name"
                    name="nombre"
                    id="name"
                    required
                    ref={refNombre}
                  />
                  <label htmlFor="name" className="form__label">
                    Nombre:
                  </label>
                </div>

                {/* <label htmlFor="">Significado</label>
            <textarea
              ref={refSignificado}
              name="significado"
              cols="40"
              rows="3"
            ></textarea> */}
                <div className="form__group field mt-3">
                  <textarea
                    type="input"
                    className="form__field"
                    placeholder="Name"
                    name="significado"
                    id="name"
                    required
                    cols="40"
                    rows="3"
                    ref={refSignificado}
                  ></textarea>
                  <label htmlFor="name" className="form__label">
                    Significado:
                  </label>
                </div>

                <div className="form__group field mt-3">
                  <textarea
                    type="input"
                    className="form__field"
                    placeholder="Name"
                    name="grupo"
                    id="name"
                    required
                    cols="40"
                    rows="3"
                    ref={refGrupo}
                  ></textarea>
                  <label htmlFor="name" className="form__label">
                    Grupo:
                  </label>

                  <div>Si se queda vacio es porque no tiene grupo</div>
                </div>

                <div className="mt-3">
                  {!inputGrupo ? (
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        setInputGrupo(true);
                      }}
                    >
                      Conservar Grupo
                    </button>
                  ) : (
                    <button
                      className="btn btn-info"
                      onClick={(e) => {
                        e.preventDefault();
                        setInputGrupo(false);

                        refGrupo.current.value = "";
                      }}
                    >
                      No conservar Grupo
                    </button>
                  )}
                </div>

                <div className="px-auto mt-3">
                  <button className="btn btn-dark" type="submit">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="container-sm form-verbs rounded-2 py-3 px-5 my-5 container-section-card">
              <div className="contenedor-forms d-flex flex-column fs-6 align-items-center gap-0 row-gap-5">
                <div className="fs-3 my-4 container-section-card-title">
                  {typeVerbMain.type}
                </div>
                <div className="w-100">
                  <div className="section-verbs-admin-type fs-5">
                    <EditTypeName
                      docId={typeVerbMain.docId}
                      typeVerb={typeVerbMain}
                      allTypes={currentTypesVerbs}
                      onUpdate={handleUpdateTypeName}
                    ></EditTypeName>
                    {/* <br />- {typeVerbMain.descripcion} - */}
                    <DescripcionEdit
                      docId={typeVerbMain.docId}
                      typeVerb={typeVerbMain}
                      allTypes={currentTypesVerbs}
                      onUpdate={handleUpdateDescription}
                    ></DescripcionEdit>
                  </div>

                  {verbs?.map((verbGroup) => (
                    // console.log(verbGroup)

                    <div
                      className="w-100 d-flex flex-column gap-2 section-verbs-container"
                      key={verbGroup[0].docId}
                      style={{ marginTop: "50px" }}
                    >
                      {/* - {typeVerbMain.type} - */}
                      <div className="section-verbs-admin-groups">
                        <GroupVerb
                          group={verbGroup}
                          onUpdateGroup={handleUpdateGroup}
                        ></GroupVerb>
                        <DeleteGroup
                          group={verbGroup}
                          handleDeleteGroup={handleDeleteGroup}
                        ></DeleteGroup>
                      </div>
                      <div className="section-verbs-admin-verbs">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* form 2 */}

          {/* los verbos */}
          {/* {buttonsState == 2
            ? 
            : {}} */}
        </div>
      </div>
    </div>
  );
};

export default dashBoard;

// poner opcion de habiltar verbos o algo asi al crear un tipo de verbo en un checbox, si esta habilitado hago todo mi desmadre, sino los imprimo asi tal cual sin separar, como ya estan separados solo los imprimo igual pero sin separador

// enseguida del delete verb poner el mismo check
