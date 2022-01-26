const workplaceList = document.querySelector(".list-workplaces");

const displayWorkplaceList = (name) => {
  const workplaceEl = document.createElement("button");
  workplaceEl.id = `workplace-list-btn-${name}`;
  workplaceEl.textContent = name;
  workplaceList.append(workplaceEl);
};

const removeFromListWorkPlace = (name) => {
    const btnToRemove = document.querySelector(`#workplace-list-btn-${name}`)
    btnToRemove.remove();
}

export {displayWorkplaceList, removeFromListWorkPlace};
