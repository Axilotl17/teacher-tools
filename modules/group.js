function filterList(){
    studentList = []
    elementList.forEach(element => {
        if(!element.disabled) {
            studentList.push(element.innerHTML)
        }
    })
}

function generateGroups(){
    var studentList = []
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

    
    groups.forEach((element, index) => {
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

function groupsToggle(){
    if(document.getElementById("#groupsToggle").checked){
        document.getElementById("#groups").disabled = false
        document.getElementById("students/group").disabled = true
    } else {
        document.getElementById("#groups").disabled = true
        document.getElementById("students/group").disabled = false
    }
}