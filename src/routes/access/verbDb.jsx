import { useState, useRef, useEffect } from "react";

const verbDb = ({ docId, name, verb,group, onDelete, onUpdate }) => {
  const [currentName, setCurrentName] = useState(name);
  const [currentVerb, setCurrentVerb] = useState(verb);
  const [currentGroup, setCurrentGroup] = useState(group);

  const [editName, setEditName] = useState(false);
  const [editVerb, setEditVerb] = useState(false);
  const [editGroup, setEditGroup] = useState(false);

  const refName = useRef(null);
  const refVerb = useRef(null);
  const refGroup = useRef(null);

  function handleEditName() {
    setEditName(true);
  }

  function handleEditVerb() {
    setEditVerb(true);
  }

  function handleEditGroup() {
    setEditGroup(true);
  }

  async function handleDelete() {
    await onDelete(docId);
  }

  function handleOnBlurName(e) {
    setEditName(false);
    // ejemplo
    onUpdate(docId, e.target.value, currentVerb, currentGroup);
  }

  function handleOnBlurVerb(e) {
    setEditVerb(false);
    onUpdate(docId, currentName, e.target.value, currentGroup);
  }

  function handleOnBlurGroup(e) {
    setEditGroup(false);

    let group=e.target.value

    if(group==""){
      group="Sin grupo"
    }
    onUpdate(docId, currentName, currentVerb, group, true);
  }

  useEffect(() => {
    if (refName.current) {
      refName.current.focus();
    }
  }, [editName]);

  useEffect(() => {
    if (refVerb.current) {
      refVerb.current.focus();
    }
  }, [editVerb]);

  useEffect(() => {
    if (refGroup.current) {
      refGroup.current.focus();
    }
  }, [editGroup]);

  function handleOnChangeName(e) {
    setCurrentName(e.target.value);
  }

  function handleOnChangeVerb(e) {
    setCurrentVerb(e.target.value);
  }

  function handleOnChangeGroup(e) {

    // let group=e.target.value

    // if(group==""){
    //   group="Sin grupo"
    // }
    setCurrentGroup(e.target.value);
  }

  return (
    <div key={docId} className="fs-6">
      <p></p>
      <div className="fw-semibold">
        {editName ? (
          <>
            <input
              ref={refName}
              onBlur={handleOnBlurName}
              onChange={handleOnChangeName}
              value={currentName}
            />
          </>
        ) : (
          <>
            <button onClick={handleEditName} className="my-button-verbs"><i class="fa-solid fa-pen-to-square"></i></button>
            {currentName}
          </>
        )}
      </div>

      <div>
        {editVerb ? (
          <>
            <input
              ref={refVerb}
              onBlur={handleOnBlurVerb}
              onChange={handleOnChangeVerb}
              value={currentVerb}
            />
          </>
        ) : (
          <>
            <button onClick={handleEditVerb} className="my-button-verbs"><i class="fa-solid fa-pen-to-square"></i></button>
            {currentVerb}
          </>
        )}
      </div>
          
      <div style={{marginTop:"5px"}}>
        {editGroup ? (
          <>
            <input
              ref={refGroup}
              onBlur={handleOnBlurGroup}
              onChange={handleOnChangeGroup}
              value={currentGroup}
            />
          </>
        ) : (
          <>
            <button onClick={handleEditGroup} className="my-button-verbs"><i class="fa-solid fa-pen-to-square"></i></button>
            {/* {currentGroup} */}
            {currentGroup? currentGroup : <div>Sin Grupo</div>}
          </>
        )}
      </div>

      <div>
        <button onClick={handleDelete} className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  );
};

export default verbDb;
