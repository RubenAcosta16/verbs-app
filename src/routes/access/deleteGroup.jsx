import {useState} from 'react'

const deleteGroup = ({group, handleDeleteGroup }) => {
    // console.log(group)

    const [deleteType, setDeleteType] = useState(false);

    function handleShowButtonDelete() {
      setDeleteType(true);
    }
  
    
    function handleNoDelete() {
      setDeleteType(false);
    }
  
  return (
    <div>
      <div style={{ display: "inline" }}>
        {!deleteType ? (
          <button onClick={handleShowButtonDelete}>Delete Group</button>
        ) : (
          <div>
            Estas seguro??
            <button
              onClick={() => {
                handleDeleteGroup(group);
              }}
            >
              Si
            </button>
            <button onClick={handleNoDelete}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default deleteGroup;
