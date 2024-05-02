let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let deletAll = document.querySelector(".delet-all")

window.onload = function () {
    input.focus()
}

let emptyArr = [];

if (window.localStorage.getItem("tasks")) {
    emptyArr = JSON.parse(window.localStorage.getItem("tasks"))
}

getDataFromLocalStorge()

// add tasks
add.onclick = function () {
    if (input.value !== "") {
        // add the input text to array
        addTaskToList(input.value);
        // clear the input filad
        input.value = "";
    }
}

// click on task element
tasks.addEventListener("click", (ele) => {
    if (ele.target.classList.contains("del")) {
        // delete task form local storge
        deletTaskWith(ele.target.parentElement.getAttribute("data-id"));
        // delete bouttom
        ele.target.parentElement.remove()
    }
    if (ele.target.classList.contains("task")) {
        toggleStatusTaskWith(ele.target.getAttribute("data-id"))
        ele.target.classList.toggle("done")
    }
})

function addTaskToList(thetask) {
    const task = {
        taskName: thetask,
        id: Date.now(),
        completed: false,
    }
    emptyArr.push(task);
    addElemantToTasks(emptyArr);
    addDataToLocalStorge(emptyArr);
}

function addElemantToTasks(theArr) {
    // empte the tasks div
    tasks.innerHTML = "";
    // add the array tasks to the tasks div
    theArr.forEach(element => {
        // creat main div
        let div = document.createElement("div")
        div.className = "task"
        // cheak if task is done
        if (element.completed) {
            div.className = " task done"
        }
        div.setAttribute("data-id", element.id)
        div.append(document.createTextNode(element.taskName))
        // creat delet botom
        let del = document.createElement("span") 
        del.appendChild(document.createTextNode("Delete"))
        del.className = "del"
        // append buttom to main div
        div.append(del)
        // add task div to tasks contanier
        tasks.append(div)
    });
}
function addDataToLocalStorge(data) {
    window.localStorage.setItem("tasks", JSON.stringify(data))
}

function getDataFromLocalStorge() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addElemantToTasks(tasks)
    }
}

function deletTaskWith(taskId) {
    emptyArr = emptyArr.filter((task) => task.id != taskId)
    addDataToLocalStorge(emptyArr)
}


function toggleStatusTaskWith(taskId) {
    for (i = 0; i < emptyArr.length; i++) {
        if (emptyArr[i].id == taskId) {
            emptyArr[i].completed == false ? emptyArr[i].completed = true: emptyArr[i].completed = false;
        }
    }
    addDataToLocalStorge(emptyArr)
}

deletAll.onclick = function () {
    tasks.innerHTML = "";
    window.localStorage.clear()
}

