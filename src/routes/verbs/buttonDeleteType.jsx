import { useState } from "react";
const buttonDeleteType = ({type,handleDeleteType}) => {
  const [deleteType, setDeleteType] = useState(false);

  function handleShowButtonDelete() {
    setDeleteType(true);
  }

  function handleNoDelete() {
    setDeleteType(false);
  }
  return (
    <div key={type.docId}>
      {!deleteType ? (
        <button onClick={handleShowButtonDelete}>Delete</button>
      ) : (
        <div>
          Estas seguro??
          <button
            onClick={() => {
                handleDeleteType(type.docId, type.type);
            }}
          >
            Si
          </button>
          <button onClick={handleNoDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default buttonDeleteType;
