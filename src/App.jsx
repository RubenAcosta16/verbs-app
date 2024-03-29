import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getLinks } from "./firebase/firebase";

import NavBar from "./components/navBarMain";
import VerbLink from "./components/verbLink";
import Footer from "./components/footer";

import "./css/main.css";

function App() {
  const [currentTypes, setCurrentTypes] = useState([]);

  const [state, setState] = useState(0);

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
      setState(1)
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

  // <div class="d-flex justify-content-center">
  //         <div class="spinner-border" role="status">
  //           <span class="visually-hidden">Loading...</span>
  //         </div>
  //       </div>

  // console.log(currentTypes)
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
            {state == 0 ? (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div> 
            ) : (
              currentTypes?.map((type) => (
                <VerbLink key={type.docId} type={type}></VerbLink>
              ))
            )}
            {/* {currentTypes?.map((type) => (
              <VerbLink key={type.docId} type={type}></VerbLink>
            ))} */}

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

      <Footer></Footer>
    </div>
  );
}

export default App;
