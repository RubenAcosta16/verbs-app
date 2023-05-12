import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getLinks } from "./firebase/firebase";

import NavBar from "./components/navBarMain";
import VerbLink from "./components/verbLink";

import "./css/main.css";

function App() {
  const [currentTypes, setCurrentTypes] = useState([]);

  useEffect(() => {
    typesVerbs();

    async function typesVerbs() {
      const types = await getLinks("types");

      const tmp = [];
      for (let i = 0; i < types.length; i++) {
        tmp[i] = types[i].type;
      }

      // console.log(tmp)
      // ordenarAlf(tmp);
      // setCurrentTypes(tmp)

      setCurrentTypes(types);
      ordenarAlf(currentTypes);
    }
  }, []);

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

  // console.log(currentTypes)

  return (
    <div className="eq-body">
      <NavBar></NavBar>

      <main>
        <section id="verbos" className="main-container container-md p-4">
          <h1 className="title h1">Verbs</h1>

          {/* <!-- <p>Pagina de verbos</p> --> */}
          <p className="py-3 text-p">
            Hola, esta es mi lista de verbos en Ingles, entra al link para ver:
          </p>

          <div className="verbs-container row align-items-center gap-4 p-5">
            {currentTypes?.map((type) => (
              // <div key={verb.name}>{verb.name}</div>
              <VerbLink key={type.docId} name={type.type}></VerbLink>
              // <div key={type.docId}>
              //   <Link to={"/p/" + type.type}>{type.type}</Link>
              // </div>
            ))}

            {/* <VerbLink></VerbLink>
            <VerbLink></VerbLink>
            <VerbLink></VerbLink>
            <VerbLink></VerbLink>
            <VerbLink></VerbLink>
            <VerbLink></VerbLink>
            <VerbLink></VerbLink>
            <VerbLink></VerbLink> */}

            {/* <!-- <div className="col-md text-center">
                    <a className="btn btn-warning btn-lg rounded-pill p-3 font-weight-bold" href="./past/">
                        <div>
                            Past Verbs
                        </div>
                    </a>
                </div>
                <div className="col-md text-center">
                    <a className="btn btn-warning btn-lg rounded-pill p-3 font-weight-bold" href="./past/">
                        <div>
                            Past Verbs
                        </div>
                    </a>
                </div> --> */}

            {/* <!-- <div className="verb-link"><a href="./phrasal/ "><div>
                    Phrasal
                </div></a></div> --> */}
          </div>

          <div className="my-5 ">
            <p className="text-p">
              Esta es una pagina de verbos, hecha con el fin de poder recordar
              algunos verbos que veo y quiero aprender o simplemente que no se
              me olviden
            </p>
          </div>
        </section>
      </main>

      {/* <h1>Verbs</h1> */}

      {/* {currentTypes?.map((type) => (
        // <div key={verb.name}>{verb.name}</div>
        <div key={type.docId}>
          <Link to={"/p/" + type.type}>{type.type}</Link>
        </div>
      ))} */}

      <footer className="container-fluid footer p-5">
        <p class="text-center">Pagina de verbos - Ruben Acosta</p>
      </footer>
    </div>
  );
}

export default App;
