console.log("script.js is initialized");


let errorShown = false;
function addTask(event) {
    event.preventDefault();
    let task = document.getElementById('addTaskInp').value;

    const container = document.getElementsByClassName('todoCard')[0];
    if (task !== "") {


        const existingError = document.querySelector('.emptyError');
        if (existingError) {
            existingError.remove();
            errorShown = false;
        }


        const taskDiv = document.createElement('div');
        taskDiv.className = 'sections';
        taskDiv.innerHTML = `<span><input type="checkbox" name="" id="">${task}</span>`;

        container.appendChild(taskDiv);
        setTimeout(() => {
            taskDiv.classList.add('fade-in');
        }, 10);

        document.querySelector(".search").classList.add("visible");

        document.getElementById('addTaskInp').value = "";
        document.getElementById('addTaskInp').focus();


    } else {
        if (!errorShown) {
            const emptyStringError = document.createElement('span');
            emptyStringError.className = 'emptyError';
            emptyStringError.innerHTML = `The task cannot be empty, please enter the task.`;
            container.appendChild(emptyStringError);
            errorShown = true;
        }
    }



}


document.getElementById('addTaskBtn').addEventListener("click", addTask);
document.getElementById("year").textContent = new Date().getFullYear();
