import { getLinks, existsVerbMode } from "../../firebase/firebase";
import { useState, useEffect } from "react";

import { useParams,Link } from "react-router-dom";

import Verb from "./verb";

const pageVerbs = () => {
  const params = useParams();

  const [verbs, setVerbs] = useState([]);
  const [originalVerbs, setOriginalVerbs] = useState([]);
  const [signVerbs, setSignVerbs] = useState([]);
  const [state, setState] = useState(0);
  // 1 = no existe tipos de verbos

  const [habilited, sethabilited] = useState(true);

  // console.log(habilited);

  useEffect(() => {
    existeVerbo();

    async function existeVerbo() {
      const verbParams = params.pageVerbsMode;

      const verbExist = await existsVerbMode(verbParams);

      const arrTypes = await getLinks("types");
      const tmpType = arrTypes.find((type) => type.type == verbParams);

      // console.log(tmpType);

      sethabilited(tmpType.habilited);

      const verbsAll = await getLinks("verbs");

      // verbos normales
      const resVerbs = verbsAll.filter((verb) => verb.type == verbExist);

      // verbos significado
      let arrSign = [];
      for (let i = 0; i < resVerbs.length; i++) {
        let obj = {
          docId: "",
          name: "",
          verb: "",
          group: "",
        };
        obj.name = resVerbs[i].verb;
        obj.verb = resVerbs[i].name;
        obj.docId = resVerbs[i].docId;
        obj.group = resVerbs[i].group;
        // console.log(resVerbs[i])
        arrSign.push(obj);
      }

      // verbos significado

      // console.log(resVerbs);
      // console.log(arrSign);

      if (verbExist) {
        if (tmpType.habilited) {
          // console.log("si")
          // traerVerbos(verbsAll, verbExist);

          let arrNormal = doArrays(resVerbs);
          let arrSignR = doArrays(arrSign);

          function doArrays(array) {
            const sortedArray = array.sort((a, b) =>
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
            for (let i = 0; i < resultArray.length; i++) {
              ordenarAlf(resultArray[i]);
            }

            return resultArray;
          }

          setOriginalVerbs([...arrNormal]);
          setSignVerbs([...arrSignR]);

          setVerbs([...arrNormal]);

          // console.log(arrNormal);
          // console.log(arrSignR);
        } else {
          ordenarAlf(resVerbs);
          setOriginalVerbs([...resVerbs]);
          setSignVerbs([...resVerbs]);

          setVerbs([...resVerbs]);
          significadoVerbos([...resVerbs]);
        }
      } else {
        // poner un useState y luego un return de interfaz
        setState(1);
      }
      try {
      } catch (error) {
        console.log(error);
      }
    }

    // ---------------------------
  }, []);

  // console.log(verbs)

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

  function significadoVerbos(resVerbs) {
    // console.log("no habilitado");

    let arrSign = [];
    for (let i = 0; i < resVerbs.length; i++) {
      let obj = {
        docId: "",
        name: "",
        verb: "",
      };
      obj.name = resVerbs[i].verb;
      obj.verb = resVerbs[i].name;
      obj.docId = resVerbs[i].docId;
      // console.log(resVerbs[i])
      arrSign.push(obj);

      setSignVerbs(arrSign);
    }
  }

  // console.log(signVerbs)

  function listaRandom(num) {
    //aleatorio
    let lista = [];
    for (let i = 0; i < num; i++) {
      lista.push(i);
    }
    lista = lista.sort(function () {
      return Math.random() - 0.5;
    });
    //fin aleatorio

    // console.log(lista)

    return lista;
  }

  function randomVerbs(arr) {
    // console.log(habilited);
    const tmp = [];
    if (habilited) {
      const num = listaRandom(verbs.length);

      // console.log(num)
      for (let i = 0; i < num.length; i++) {
        tmp[i] = arr[num[i]];


        let tmp2=[]
        let tmp2Arr=tmp[i]
        const num2 = listaRandom(tmp[i].length);
        // console.log(tmp[i])
        // console.log(num2)

        for (let i2 = 0; i2 < tmp[i].length; i2++) {
          tmp2[i2]=tmp2Arr[num2[i2]]
          // console.log(num2[i2])
        }
        // console.log(tmp2)
        // tmp[i]=
        tmp[i]=tmp2
      }


    } else {

      const num = listaRandom(verbs.length);

      // console.log(num)
      for (let i = 0; i < num.length; i++) {
        tmp[i] = arr[num[i]];
      }
    }

    setVerbs([...tmp]);
  }

  function handleOrdenar() {
    setVerbs([...originalVerbs]);
  }

  function handleSignificado() {
    // console.log(signVerbs)
    // setSignVerbs([...originalVerbs]);

    setVerbs([...signVerbs]);

    // setSignVerbs([...originalVerbs])
  }

  function handleAleatorio() {
    randomVerbs([...originalVerbs]);
  }

  function handleSignificadoAleatorio() {
    // setVerbs([...signVerbs])

    randomVerbs([...signVerbs]);
  }

  //   console.log(verbs)

  if (state == 1) {
    return (
      <div>
        <p>No existe ese tipo de verbo {params.pageVerbsMode}</p>
      </div>
    );
  }

  return (
    <div>
      {/* <button onClick={handleOnSubmit}>Enviar</button> */}

      <Link to="/">Pagina principal</Link>

      <nav>
        <li className="nav-item mx-auto px-1 my-1">
          <button
            onClick={handleOrdenar}
            type="button"
            className="btn btn-outline-primary btn-lg orden rounded-pill"
          >
            Ordenar
          </button>
        </li>
        <li className="nav-item mx-auto px-1 my-1">
          <button
            onClick={handleSignificado}
            type="button"
            className="btn btn-outline-primary btn-lg significados rounded-pill"
          >
            Significado
          </button>
        </li>
        <li className="nav-item mx-auto px-1 my-1">
          <button
            onClick={handleAleatorio}
            type="button"
            className="btn btn-outline-primary btn-lg aleatorio rounded-pill"
          >
            Aleatorio
          </button>
        </li>
        <li className="nav-item mx-auto px-1 my-1">
          <button
            onClick={handleSignificadoAleatorio}
            type="button"
            className="btn btn-outline-primary btn-lg significadosRandom rounded-pill"
          >
            Significados Aleatorio
          </button>
        </li>
      </nav>

      {habilited
        ? verbs?.map((verbGroup) => (
            // console.log(verbGroup)

            <div key={verbGroup[0].docId}>
              grupo-------------------------------------{verbGroup[0].group}
              {verbGroup.map((verb) => (
                <Verb key={verb.docId} name={verb.name} verb={verb.verb}></Verb>
              ))}
            </div>
          ))
        : verbs?.map((verb) => (
            // <div key={verb.name}>{verb.name}</div>
            <div key={verb.name}>
              <Verb name={verb.name} verb={verb.verb}></Verb>
            </div>
          ))}
    </div>
  );
};

export default pageVerbs;
