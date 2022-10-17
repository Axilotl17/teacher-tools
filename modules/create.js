function editClass(){
    periods.disabled = true
    document.getElementById("editClass").disabled = true
    studentInput.value = JSON.parse(localStorage.getItem(periods.value)).join("\n")
    students.style.display = "none"
    group.style.display = "none"
    pick.style.display = "none"
    create.style.display = "block"
}

function studentInputSave(){
    localStorage.setItem(periods.value, JSON.stringify(studentInput.value.split("\n")))
    studentInputCancel()
}

function studentInputCancel(){
    create.style.display = "none"       
    document.getElementById("editClass").disabled = false
    periods.disabled = false
    actionSet()
    students.style.display = "block"
    updateList()
}

export {editClass, studentInputSave, studentInputCancel}