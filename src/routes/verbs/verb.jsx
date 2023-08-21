import { useRef } from "react";

import '../../css/verbos_style.css'

import arrow from "./arrow.svg";

const link = ({ name, verb,counter="" }) => {
  const img = useRef(null);
  const significadoRef = useRef(null)

  function make() {
    // exp.current.style.color = "red";

    significadoRef.current.classList.toggle("significado-mostrar");
    img.current.classList.toggle("img-back-active");

    let height=0;

    if(significadoRef.current.clientHeight=="0"){
        height=significadoRef.current.scrollHeight;
    }
    significadoRef.current.style.height=height+"px";
  }

  return (
    <li className="verbo" onClick={make}>

      <span className="palabra" >
      <span style={{fontWeight:"500",marginRight:"15px"}}>{counter}</span><span>{name}</span>
        <img src={arrow} alt="" ref={img}/>
      </span>
      <span ref={significadoRef} className="significado text-p-sm">
        {verb}
      </span>
    </li>
  );
};

export default link;
