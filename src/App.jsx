import {Link} from 'react-router-dom'

import {useEffect, useState} from 'react'
import {getLinks} from './firebase/firebase'

function App() {

  const [currentTypes, setCurrentTypes] = useState([])

  useEffect(() => {
    typesVerbs()

    async function typesVerbs(){
      const types = await getLinks("types");

      // console.log(types[0].type)
      setCurrentTypes(types)
    }
  }, [])

  console.log(currentTypes)
  
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
