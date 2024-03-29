import { getLinks, existsVerbMode } from "../../firebase/firebase";
import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import Verb from "./verb";
import NavBar from "../../components/navBarMain";
import Footer from "../../components/footer";
import "../../css/main.css";

import "../../css/verbos_style.css";

const pageVerbs = () => {
  const params = useParams();

  const [verbs, setVerbs] = useState([]);

  const [originalVerbsR, setOriginalVerbsR] = useState([]);
  const [signVerbsR, setSignVerbsR] = useState([]);

  // const [verbs, setVerbs] = useState([]);
  const [originalVerbsN, setOriginalVerbsN] = useState([]);
  const [signVerbsN, setSignVerbsN] = useState([]);

  const [state, setState] = useState(0);
  // 1 = no existe tipos de verbos
  const [loading, setLoading] = useState(0);

  const [descriptcion, setDescriptcion] = useState("");
  const [type, setType] = useState("");

  const [habilited, sethabilited] = useState(true);
  const [habilited2, sethabilited2] = useState(true);

  // console.log(habilited);

  useEffect(() => {
    existeVerbo();

    async function existeVerbo() {
      const verbParams = params.pageVerbsMode;

      const verbExist = await existsVerbMode(verbParams);

      const arrTypes = await getLinks("types");
      const tmpType = arrTypes.find((type) => type.type == verbParams);

      // console.log(tmpType);
      setType(tmpType.type);

      if (tmpType.descripcion) {
        setDescriptcion(tmpType.descripcion);
        // setDescripcionMode(tmp[0]?.descripcion)
      } else {
        let newDescripcion = "Sin descripcion";

        // setDescripcionMode("Sin descripcion")
        setDescriptcion(newDescripcion);
      }

      sethabilited(tmpType.habilited);
      sethabilited2(tmpType.habilited);

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

          setOriginalVerbsR([...arrNormal]);
          setSignVerbsR([...arrSignR]);



          // console.log(arrNormal);
          // console.log(arrSignR);
          // setLoading(1);


          //parte de verbos deshabilitados


          ordenarAlf(resVerbs);
          setOriginalVerbsN([...resVerbs]);
          setSignVerbsN([...resVerbs]);

          significadoVerbos([...resVerbs]);

          if (tmpType.habilited) {
            setVerbs([...arrNormal]);
          }else{

            setVerbs([...resVerbs]);
          }

          setLoading(1);
        
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

      setSignVerbsN(arrSign);
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
    // if (habilited2) {
    //   const num = listaRandom(verbs.length);

    //   // console.log(num)
    //   for (let i = 0; i < num.length; i++) {
    //     tmp[i] = arr[num[i]];

    //     let tmp2 = [];
    //     let tmp2Arr = tmp[i];
    //     const num2 = listaRandom(tmp[i].length);
    //     // console.log(tmp[i])
    //     // console.log(num2)

    //     for (let i2 = 0; i2 < tmp[i].length; i2++) {
    //       tmp2[i2] = tmp2Arr[num2[i2]];
    //       // console.log(num2[i2])
    //     }
    //     // console.log(tmp2)
    //     // tmp[i]=
    //     tmp[i] = tmp2;
    //   }
    // } else {
      const num = listaRandom(arr.length);

      // console.log(num)
      for (let i = 0; i < num.length; i++) {
        tmp[i] = arr[num[i]];
      }
    // }

    setVerbs([...tmp]);
  }

  function handleOrdenar() {
    if(habilited){
      sethabilited2(true)
      setVerbs([...originalVerbsR]);
    }else{

      setVerbs([...originalVerbsN]);
    }
  }

  function handleSignificado() {
    if(habilited){
      sethabilited2(true)
      setVerbs([...signVerbsR]);
    }else{

      setVerbs([...signVerbsN]);
    }


    // setSignVerbs([...originalVerbs])
  }

  function handleAleatorio() {
    if(habilited){
      sethabilited2(false)
      // randomVerbs([...originalVerbsR]);
    }

      randomVerbs([...originalVerbsN]);


  }

  function handleSignificadoAleatorio() {
    // setVerbs([...signVerbs])
    if(habilited){
      sethabilited2(false)
      // randomVerbs([...originalVerbsR]);
    }

    randomVerbs([...signVerbsN]);
  }

  //   console.log(verbs)

  if (state == 1) {
    return (
      <div>
        <p>No existe ese tipo de verbo {params.pageVerbsMode}</p>
      </div>
    );
  }
//contador de los verbos deshabilitados
  let c=1

  // console.log(verbs);

  return (
    <div className="eq-body">
      {/* <button onClick={handleOnSubmit}>Enviar</button> */}
      <NavBar></NavBar>

      {/* <Link to="/">Pagina principal</Link> */}

      {/* <nav>
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
      </nav> */}

      <nav className="navbar navbar-expand-sm navbar-verbs">
        <div className="container-fluid">
          {/* <!-- <a className="navbar-brand" href="#">Navbar</a> --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-auto px-1 my-1">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg orden rounded-pill"
                  onClick={handleOrdenar}
                >
                  Ordenar
                </button>
              </li>
              <li className="nav-item mx-auto px-1 my-1">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg significados rounded-pill"
                  onClick={handleSignificado}
                >
                  Significado
                </button>
              </li>
              <li className="nav-item mx-auto px-1 my-1">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg aleatorio rounded-pill"
                  onClick={handleAleatorio}
                >
                  Aleatorio
                </button>
              </li>
              <li className="nav-item mx-auto px-1 my-1">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg significadosRandom rounded-pill"
                  onClick={handleSignificadoAleatorio}
                >
                  Significados Aleatorio
                </button>
              </li>

              {/* <!-- <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> --> */}
            </ul>
          </div>
        </div>
      </nav>

      <section className="container-lg py-5">
        <h1 className="mb-5">{type}</h1>
        <p>{descriptcion}</p>

        {loading == 0 ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="contenedor container-lg p-5">
            {habilited2
              ? verbs?.map((verbGroup) => (
                  // console.log(verbGroup)
                  <div className="borderBVerbs">
                    <br />
                    <br />
                    <ul className="list" key={verbGroup[0].docId}>
                      <span style={{ fontWeight: "500" }}>Grupo:</span>{" "}
                      {verbGroup[0].group}
                      <br />
                      <br />
                      {verbGroup.map((verb) => (
                        <Verb
                          key={verb.docId}
                          name={verb.name}
                          verb={verb.verb}
                        ></Verb>
                      ))}
                    </ul>
                  </div>
                ))
              : verbs?.map((verb) => (
                  // <div key={verb.name}>{verb.name}</div>
                  <div key={verb.name} >
                    <Verb name={verb.name} verb={verb.verb} counter={c++}></Verb>
                  </div>
                ))}
          </div>
        )}
      </section>
      <Footer></Footer>
    </div>
  );
};

export default pageVerbs;
