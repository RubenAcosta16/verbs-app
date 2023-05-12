import { useState, useRef, useEffect } from "react";

const descriptionEdit = ({typeVerb,docId}) => {
    const [currentType, setCurrentType] = useState(typeVerb.type);

    console.log(docId)
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
  
      let newType=e.target.value
  
      if(group==""){
        group="Sin grupo"
      }
      onUpdate(docId, currentType, currentVerb, group, true);
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
      <div key={docId}>
        <p></p>
        <div>
          {editType ? (
            <>
              <input
                ref={refType}
                onBlur={handleOnBlurType}
                onChange={handleOnChangeType}
                value={currentType}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditType}>Edit</button>
              {currentType}
            </>
          )}
        </div>
  
      </div>
    );
}


export default descriptionEdit;