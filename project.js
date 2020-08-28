var arr = [];
var counter = 1;
var arrParse = JSON.parse(localStorage.getItem("memory"));

if (arrParse) {
    loadNotes();
}

function loadNotes(){
    console.log(arrParse)
    for (const a of arrParse) {
        create(a.p, a.dateinput, a.timeinput)
    }
}

function save() {
    var task = document.getElementById("task").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

    create(task,date,time);
}


function create(task,date,time){
    var id = counter;
    var notes = document.querySelector("#notes");

    var template = document.getElementsByTagName("template")[0];
    var clone = document.importNode(template.content, true);

    var p = clone.querySelector("#paragraph");
    var dateinput = clone.querySelector("#dateinput");
    var timeinput = clone.querySelector("#timeinput");
    var note = clone.querySelector(".notes-container");
    if(note){
        note.setAttribute("id", counter);
        console.log(counter)
    }
    
    var deleteID = clone.querySelector("button"); 
    console.log(deleteID);
    deleteID.setAttribute("id", counter) 
       
    p.textContent = task;
    dateinput.textContent = date;
    timeinput.textContent = time;

    notes.appendChild(clone);
    counter++
    console.log(notes)

    var toAdd = {
        p: task,
        dateinput: date,
        timeinput: time,
        id: id 
     };
    arr.push(toAdd);

    var string = JSON.stringify(arr);
    localStorage.setItem("memory", string);

    deleteID.addEventListener('click', function (){
        note.parentNode.removeChild(note);

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.id == deleteID.id) {
                arr.splice(i,1);
                var string = JSON.stringify(arr);
                localStorage.setItem("memory", string);
            }
        }
    })
}


function reset() {
    var task = document.getElementById("task");
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    task.value = "";
    date.value = "";
    time.value= "";
}


