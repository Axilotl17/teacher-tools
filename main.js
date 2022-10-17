import {editClass, studentInputSave, studentInputCancel} from "./modules/create.js"

const tools = ["pick", "group"]
console.warn("a")
const toolSelect = document.querySelector("#main > #head > #tool")

const periods = document.getElementById("periods")
const studentInput = document.getElementById("studentInput")
const create = document.getElementById("create")
const pick = document.getElementById("pick")
const group = document.getElementById("group")        
const output = document.getElementById("output")
const students = document.getElementById("students")
var elementList = []

tools.forEach(element => {
    document.querySelector("#head #tool")
    var o = document.createElement("option")
    o.innerHTML = element
    o.value = element
    toolSelect.append(o)
    //window[element]
});

for (var i=1; i<8; i++){
    if(localStorage.getItem(i) == null){
        localStorage.setItem(i, JSON.stringify([]))
    }
    var option = document.createElement("option")
    option.text = i
    periods.add(option)
}

periods.selectedIndex = 0
create.style.display = "none"
output.style.display = "none"

updateList()
actionSet()
//groupsToggle()


function updateList(){   
    var period = periods.value
    document.getElementById("students").innerHTML = ""
    elementList = []   
    var index = 0
    JSON.parse(localStorage.getItem(period)).forEach(element => {
        if(element != ""){
            elementList.push(document.createElement("p"))
            elementList[index].innerHTML = element
            elementList[index].className = "student"
            elementList[index].style.color = "black"
            elementList[index].disabled = false
            elementList[index].onclick = makeOnclick(elementList[index])
            index++
        }
    })
    elementList.forEach(element => {
    document.getElementById("students").append(element)
})
}

function actionSet(){
    if(toolSelect.value == "pick"){
        pick.style.display = "block"
        group.style.display = "none"
    } else if (toolSelect.value == "group") {
        group.style.display = "block"
        pick.style.display = "none"
    }
}


function toggle(element){
    if(element.disabled){
        element.style.color = "black"
        element.disabled = false
    } else {
        element.style.color = "lightgray"
        element.disabled = true
    }
    console.log(element.innerHTML + " disabled: " + element.disabled)
}
document.querySelector("#main > #head > #editClass").addEventListener('click', editClass)
document.querySelector("#main > #create > #studentInputSave").addEventListener('click', studentInputSave)
document.querySelector("#main > #create > #studentInputCancel").addEventListener('click', studentInputCancel)
periods.addEventListener("change", updateList)
toolSelect.addEventListener("change", actionSet)