import {Link} from 'react-router-dom'

import {useEffect, useState} from 'react'
import {getLinks} from './firebase/firebase'

function App() {

  const [currentTypes, setCurrentTypes] = useState([])

  useEffect(() => {
    typesVerbs()

    async function typesVerbs(){
      const types = await getLinks("types");

      const tmp=[]
      for (let i = 0; i < types.length; i++) {
        tmp[i]=types[i].type
        
      }

      // console.log(tmp)
      // ordenarAlf(tmp);
      // setCurrentTypes(tmp)

      setCurrentTypes(types)
      ordenarAlf(currentTypes);
    }
  }, [])

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
    <div>
      <h1>past</h1>
      <Link to="/past-verbs">Page verbs</Link>
      <Link to="/dashboard">Edit Verbs</Link>

      {currentTypes?.map((type) => (
        // <div key={verb.name}>{verb.name}</div>
        <div key={type.docId}>
          <Link to={"/p/"+type.type}>{type.type}</Link>
        </div>
      ))}

    </div>
  )
}

export default App
