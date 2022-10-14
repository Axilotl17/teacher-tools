import {text} from "./modules/pick.js"

const tools = ["pick", "group"]
console.warn(text)
const toolSelect = document.querySelector("#main > #head > #tool")

const periods = document.getElementById("periods")
const studentInput = document.getElementById("studentInput")
const create = document.getElementById("create")
const pick = document.getElementById("pick")
const group = document.getElementById("group")        
const output = document.getElementById("output")
const students = document.getElementById("students")
var studentList = []
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
groupsToggle()



function makeOnclick(input){
        let value = input
        function returnFunc(){
            toggle(value)
        }
        return returnFunc
    }

function updateList(){   
    period = periods.value
    document.getElementById("students").innerHTML = ""
    elementList = []   
    index = 0
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

function editClass(){
    periods.disabled = true
    document.getElementById("editClass").disabled = true
    period = periods.value
    studentInput.value = JSON.parse(localStorage.getItem(period)).join("\n")
    students.style.display = "none"
    group.style.display = "none"
    pick.style.display = "none"
    create.style.display = "block"
}
function studentInputSave(){
    period = periods.value
    localStorage.setItem(period, JSON.stringify(studentInput.value.split("\n")))
    studentInputLeave()
}
function studentInputLeave(){
    create.style.display = "none"       
    document.getElementById("editClass").disabled = false
    periods.disabled = false
    actionSet()
    students.style.display = "block"
    updateList()
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

function groupsToggle(){
    if(document.getElementById("#groupsToggle").checked){
        document.getElementById("#groups").disabled = false
        document.getElementById("students/group").disabled = true
    } else {
        document.getElementById("#groups").disabled = true
        document.getElementById("students/group").disabled = false
    }
}

function filterList(){
    studentList = []
    elementList.forEach(element => {
        if(!element.disabled) {
            studentList.push(element.innerHTML)
        }
    })
}

function generateGroups(){
    filterList()
    groups = []
    pairs = false
    if(document.getElementById("#groupsToggle").checked) {
        groupCount = parseInt(document.getElementById("#groups").value)
    } else {
        if(document.getElementById("TAInput").checked && studentList.length % document.getElementById("students/group").value != 0){
            studentList.push("TA")
        }
        groupCount = Math.floor(studentList.length / parseInt(document.getElementById("students/group").value))
        if(document.getElementById("students/group").value == 2){
            pairs = true
        }
    }
    for(var i = 0; i < groupCount; i++){
        groups.push([])
    }
    rounds = studentList.length
    for(i = 0; i < Math.ceil(rounds / groupCount); i++) {
        console.log("a")
        for(j = 0; j < groupCount; j++){
            k = Math.floor(Math.random() * studentList.length)
            if(studentList[k] == undefined) {break}
            groups[j].push(studentList[k])
            studentList.splice(k, 1)
        }
    }
    output.style.display = "block"
    document.getElementById("control").style.display = "none"
    students.style.display = "none"

    
    groups.forEach((element, index, array) => {
        p = document.createElement("p")
        if(!pairs) { p.innerHTML += `group ${index + 1}:<br>` }
        element.forEach(childElement => {
            if(!pairs) { p.innerHTML += `&nbsp&nbsp&nbsp&nbsp${childElement}<br>` 
            } else { p.innerHTML += `${childElement}, ` } 
        })
        p.innerHTML = p.innerHTML.slice(0, -2)
        output.append(p)
    })
}

function generatePick(){
    pickCount = 0
    elementList.forEach(element => {
        if(!element.disabled){
            pickCount++
        }
    })
    console.log("availible: " + pickCount)
    console.log("count requested: " + document.getElementById("pickCount").value)
    if(document.getElementById("pickCount").value < pickCount) {
        pickCount = document.getElementById("pickCount").value
    }
    console.log("count: " + pickCount)

    pickOutput = []

    for(i=0; i<pickCount; i++) {
        pickOutput.push("")
        while(pickOutput[i] == ""){
            tempStudent = elementList[Math.floor(Math.random()*elementList.length)]
            if(tempStudent.disabled){
                pickOutput[i] = ""
            } else {
                pickOutput[i] = tempStudent.innerHTML
                if(document.getElementById("pickOnce").checked){
                    tempStudent.style.color = "lightgray"
                    tempStudent.disabled = true
                }
            }
        }
    }            
    console.log(pickOutput.length)
    console.log(pickOutput)
    pickDisplay = ""
    if(pickOutput.length == 0) {
        document.querySelector("#pick #output #result").innerHTML = "not enough students included!<hr>"
    } else {
        pickOutput.forEach(element => {
            console.log(element)
            pickDisplay += element + "<br>"
        })
        pickDisplay = pickDisplay.slice(0, -4) + "<hr>"
        document.querySelector("#pick #output #result").innerHTML = pickDisplay
    }

}

periods.addEventListener("change", updateList)
toolSelect.addEventListener("change", actionSet)