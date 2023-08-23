import { useRef } from "react";

import "../../css/verbos_style.css";

import arrow from "./arrow.svg";

const link = ({ name, verb, counter = "" }) => {
  const img = useRef(null);
  const significadoRef = useRef(null);

  function make() {
    // exp.current.style.color = "red";

    significadoRef.current.classList.toggle("significado-mostrar");
    img.current.classList.toggle("img-back-active");

    let height = 0;

    if (significadoRef.current.clientHeight == "0") {
      height = significadoRef.current.scrollHeight;
    }
    significadoRef.current.style.height = height + "px";
  }

  let separador = {};
  if (counter % 4 === 0 && counter != "") {
    separador = { marginBottom: "30px" };
  }

  function handleSpeak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  return (
    <li className="verbo " style={separador}>
      <span className="palabra">
        <span onClick={make}>
          <span style={{ fontWeight: "500", marginRight: "15px" }}>
            {counter}
          </span>
          <span>{name}</span>
          <img src={arrow} alt="" ref={img} />
        </span>

        <button
          className="speakButton"
          onClick={() => {
            handleSpeak(name);
          }}
        >
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </span>
      <span ref={significadoRef} className="significado text-p-sm">
        {verb}
        <button
          className="speakButton"
          onClick={() => {
            handleSpeak(verb);
          }}
        >
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </span>
    </li>
  );
};

export default link;
