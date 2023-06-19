import { useState, useEffect, useRef } from "react";

const groupVerb = ({ group,onUpdateGroup}) => {



  // console.log(group);
  const [currentGroup, setCurrentGroup] = useState(group[0].group);

  const [editGroup, setEditGroup] = useState(false);

  const refGroup = useRef(null);

  function handleEditGroup() {
    setEditGroup(true);
  }

//   async function handleDelete() {
//     await onDelete(docId);
//   }

  function handleOnBlurGroup(e) {
    setEditGroup(false);

    let groupTmp = e.target.value;

    if (groupTmp == "") {
      groupTmp = "Sin grupo";
    }
    onUpdateGroup(groupTmp,group);
    // console.log(group)
  }

  useEffect(() => {
    if (refGroup.current) {
      refGroup.current.focus();
    }
  }, [editGroup]);

  function handleOnChangeGroup(e) {
    // let groupTmp = e.target.value;

    // if (groupTmp == "") {
    //   groupTmp = "Sin grupo";
    // }

    setCurrentGroup(e.target.value);
  }

  // return <div>-- {group.group} --</div>;
  return (
    <div>
      <div className="fs-5 fw-semibold">
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
          <span className="">
            {currentGroup? currentGroup : <div>Sin Grupo</div>}
          </span>
        </>
      )}
      </div>




      



    </div>
  );
};

export default groupVerb;
