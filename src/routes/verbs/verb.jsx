import {useRef} from 'react'


const link = ({name,verb}) => {

    const exp=useRef(null)

    function make(){
        exp.current.style.color="red"
    }





    return <div>
        <p  ref={exp} onClick={make}>{name} | {verb}</p>
    </div>;
}

export default link;