import { useState, useEffect, useRef } from "react";

const groupVerb = ({ group,onUpdateGroup }) => {
//   console.log(group);
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
    let groupTmp = e.target.value;

    if (groupTmp == "") {
      groupTmp = "Sin grupo";
    }

    setCurrentGroup(groupTmp);
  }

  // return <div>-- {group.group} --</div>;
  return (
    <div>
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
          <button onClick={handleEditGroup}>Edit</button>
          {currentGroup}
        </>
      )}
    </div>
  );
};

export default groupVerb;
