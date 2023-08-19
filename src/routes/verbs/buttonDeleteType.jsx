import { useState } from "react";
const buttonDeleteType = ({ type, handleDeleteType, docId }) => {
  const [deleteType, setDeleteType] = useState(false);

  function handleShowButtonDelete() {
    setDeleteType(true);
  }

  function handleNoDelete() {
    setDeleteType(false);
  }
  return (
    <div style={{ display: "inline",  width:"60px"}}>
      {!deleteType ? (
        <button className="btn btn-danger fs-6" onClick={handleShowButtonDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      ) : (
        <div className="asideDeleteButton">
          Estas seguro??
          <div className="d-flex justify-content-between fs-5">
            <button
              className="aside-my-button asideDeleteButton"
              onClick={() => {
                handleDeleteType(type.docId, type.type);
              }}
            >
              <i className="fa-solid fa-check"></i>
            </button>
            <button className="aside-my-button asideDeleteButton" onClick={handleNoDelete}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default buttonDeleteType;
