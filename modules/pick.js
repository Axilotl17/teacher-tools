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