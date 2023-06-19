import { useState, useRef, useEffect } from "react";

const editTypeName = ({ typeVerb, docId, allTypes, onUpdate }) => {
  // console.log(typeVerb)
  // console.log(allTypes)
  // console.log(typeVerb) 

  const thisType = allTypes.find((type) => type.type === typeVerb.type);

  // console.log(thisType)

  const [currentType, setCurrentType] = useState(thisType.type);

  const [editType, setEditType] = useState(false);

  const refType = useRef(null);

  function handleEditType() {
    setEditType(true);
  }

  // async function handleDelete() {
  //   await onDelete(docId);
  // }

  function handleOnBlurType(e) {
    setEditType(false);

    let newName = e.target.value;
    let descripcionTmp=thisType?.descripcion
    // console.log(newName)

    if (newName == "") {
      newName = "Sin nombre";
    }
    if (descripcionTmp == "") {
      descripcionTmp = "Sin descripcion";
    }
    // console.log(thisType?)

    const newType = {
      docId: thisType.docId,
      habilited: thisType.habilited,
      type: newName,
      descripcion: descripcionTmp,

    };

    const newTypeMainVerbs = {
      type: newName,
      descripcion: descripcionTmp,
      verbs:typeVerb.verbs,
      // group:thisType.group
    };

    onUpdate(thisType.docId, newType,newTypeMainVerbs);
  }

  // console.log(thisType.group)

  useEffect(() => {
    if (refType.current) {
      refType.current.focus();
    }
  }, [editType]);

  function handleOnChangeType(e) {
    setCurrentType(e.target.value);
  }

  return (
    <div key={thisType.docId}>
      <p></p>
      <div>
        {editType ? (
          <>
            <input
              ref={refType}
              onBlur={handleOnBlurType}
              onChange={handleOnChangeType}
              value={currentType}
            ></input>
          </>
        ) : (
          <>
            <button onClick={handleEditType} className="fs-5 my-button-verbs color-primary-dark"><i class="fa-solid fa-pen-to-square"></i></button>
            {currentType}
          </>
        )}
      </div>
    </div>
  );
};

export default editTypeName;
