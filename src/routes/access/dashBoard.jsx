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
    const descripcion = e.target["tipoDescripcion"].value;

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
    showMessage("Se cambio la descripcion")

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

  async function handleUpdateTypeName(docId, newType,newTypeMainVerbs) {
    // console.log(docId);
    // console.log(newType);
    // console.log(newTypeMainVerbs);


    await updateVerb(docId, newType, "types");
    console.log(newTypeMainVerbs.verbs.length)

    for (let i = 0; i < newTypeMainVerbs.verbs.length; i++) {
      console.log(newTypeMainVerbs.verbs[i])
      // if (mainVerbs[i].type == newType.type) {

        // console.log(mainVerbs[i].verbs)
        for (let i2 = 0; i2 < newTypeMainVerbs.verbs[i].length; i2++) {
          const tmp={
            docId:newTypeMainVerbs.verbs[i][i2].docId,
            group:newTypeMainVerbs.verbs[i][i2].group,
            name:newTypeMainVerbs.verbs[i][i2].name,
            type:newTypeMainVerbs.type,
            verb:newTypeMainVerbs.verbs[i][i2].verb
          }
          // console.log(tmp)
          // console.log(mainVerbs[i].verbs[i2].docId);
          await updateVerb(newTypeMainVerbs.verbs[i][i2].docId,tmp, "verbs");
          // console.log(newTypeMainVerbs.verbs[i][i2])
        }
      // }
    }

    // console.log("se cambio");
    showMessage("Se cambio el Nombre")

    const tmp = currentTypesVerbs.filter(
      (type) => type.docId !== newType.docId
    );

    const tmp2=mainVerbs.filter(
      (type) => type.type !== newTypeMainVerbs.type
    );

    // console.log(tmp);


    setTypeVerbMain(newTypeMainVerbs)
    setCurrentTypesVerbs([...tmp, newType]);
    setMainVerbs([...tmp2, newTypeMainVerbs])

  }

  // console.log(typeVerbMain)
  // console.log(currentTypesVerbs)
  // console.log(mainVerbs)

  return (
    <Navbar>
      <Link to="/">Pagina principal</Link>
      <div>
        <div>Crear tipo de verbos</div>

        <form action="" onSubmit={handleCrearTipo}>
          <label htmlFor="">Nombre:</label>
          <input ref={refCrearTipo} name="type" type="text" />

          <label htmlFor="">Descripcion:</label>
          <textarea
            ref={refTipoDescripcion}
            name="tipoDescripcion"
            cols="40"
            rows="3"
          ></textarea>

          <button type="submit">Crear</button>
        </form>
        <br />
        <br />
      </div>

      <form action="" onSubmit={handleSubmitVerb}>
        <label htmlFor="">Nombre</label>
        <input ref={refNombre} type="text" name="nombre" />

        <br />
        <label htmlFor="">Significado</label>
        {/* <input ref={refSignificado} type="text" name="significado" /> */}
        <textarea
          ref={refSignificado}
          name="significado"
          cols="40"
          rows="3"
        ></textarea>

        <br />
        <label htmlFor="">Grupo</label>
        <div>Si se queda vacio es porque no tiene grupo</div>
        {/* <input  type="text" name="grupo" /> */}
        <textarea ref={refGrupo} name="grupo" cols="40" rows="3"></textarea>

        {!inputGrupo ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputGrupo(true);
            }}
          >
            Conservar Grupo
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputGrupo(false);

              refGrupo.current.value = "";
            }}
          >
            No conservar Grupo
          </button>
        )}

        <br />
        <button type="submit">Enviar</button>
      </form>
      <br />
      <br />
      <br />
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

              <ButtonHabilited type={type}></ButtonHabilited>
            </div>
          ))}
        </nav>

        {verbs?.map((verbGroup) => (
          // console.log(verbGroup)

          <div key={verbGroup[0].docId}>
            {/* - {typeVerbMain.type} - */}
            <EditTypeName
              docId={typeVerbMain.docId}
              typeVerb={typeVerbMain}
              allTypes={currentTypesVerbs}
              onUpdate={handleUpdateTypeName}
            ></EditTypeName>
            <br />
            {/* <br />- {typeVerbMain.descripcion} - */}
            <DescripcionEdit
              docId={typeVerbMain.docId}
              typeVerb={typeVerbMain}
              allTypes={currentTypesVerbs}
              onUpdate={handleUpdateDescription}
            ></DescripcionEdit>
            <br />
            <br />
            <br />
            ---------------------------------
            <GroupVerb
              group={verbGroup}
              onUpdateGroup={handleUpdateGroup}
            ></GroupVerb>
            <DeleteGroup
              group={verbGroup}
              handleDeleteGroup={handleDeleteGroup}
            ></DeleteGroup>
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
