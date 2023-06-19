import { useState, useRef, useEffect } from "react";

const descriptionEdit = ({ typeVerb, docId, allTypes, onUpdate }) => {
  // console.log(typeVerb)
  // console.log(allTypes)

  const thisType = allTypes.find((type) => type.type === typeVerb.type);

  // console.log(thisType)

  const [currentType, setCurrentType] = useState(thisType?.descripcion);

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

    let newDescription = e.target.value;

    if (newDescription == "") {
      newDescription = "Sin descripcion";
    }
    // console.log(thisType?)

    const newType = {
      docId: thisType?.docId,
      habilited: thisType?.habilited,
      type: thisType?.type,
      descripcion: newDescription,
    };

    onUpdate(thisType?.docId, newType);
  }

  useEffect(() => {
    if (refType.current) {
      refType.current.focus();
    }
  }, [editType]);

  function handleOnChangeType(e) {
    setCurrentType(e.target.value);
  }

  return (
    <div key={thisType?.docId}>
      <p></p>
      <div>
        {editType ? (
          <>
            <textarea
              ref={refType}
              onBlur={handleOnBlurType}
              onChange={handleOnChangeType}
              value={currentType}
              cols="40"
              rows="3"
            ></textarea>
          </>
        ) : (
          <>
            <button onClick={handleEditType} className="fs-5 my-button-verbs color-primary-dark"><i class="fa-solid fa-pen-to-square"></i></button>
            {currentType==""?"Sin descripcion":currentType}
          </>
        )}
      </div>
    </div>
  );
};

export default descriptionEdit;
