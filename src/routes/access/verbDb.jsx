import { useState, useRef, useEffect } from "react";

const verbDb = ({ docId, name, verb, onDelete, onUpdate }) => {
  const [currentName, setCurrentName] = useState(name);
  const [currentVerb, setCurrentVerb] = useState(verb);

  const [editName, setEditName] = useState(false);
  const [editVerb, setEditVerb] = useState(false);

  const refName = useRef(null);
  const refVerb = useRef(null);

  function handleEditName() {
    setEditName(true);
  }

  function handleEditVerb() {
    setEditVerb(true);
  }

  async function handleDelete() {
    await onDelete(docId)
  }

  function handleOnBlurName(e) {
    setEditName(false);
    // ejemplo
    onUpdate(docId, e.target.value, currentVerb);
  }

  function handleOnBlurVerb(e) {
    setEditVerb(false);
    onUpdate(docId, currentName, e.target.value);

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

  function handleOnChangeName(e) {
    setCurrentName(e.target.value);
  }

  function handleOnChangeVerb(e) {
    setCurrentVerb(e.target.value);
  }



  return (
    <div>
      <p>
      </p>
      <div>
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
            <button onClick={handleEditName}>Edit</button>
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
            <button onClick={handleEditVerb}>Edit</button>
            {currentVerb}
          </>
        )}
      </div>

      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default verbDb;
