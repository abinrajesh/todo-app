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

        const leftDiv = document.createElement('div');
        leftDiv.className = 'left';

        const rightDiv = document.createElement('div');
        rightDiv.className = 'right';

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";


        const span = document.createElement('span');
        span.appendChild(checkbox);
        span.append(task);


        leftDiv.appendChild(span);

        const editBtn = document.createElement('button');
        editBtn.className = 'editBtn';
        editBtn.innerHTML = `<img src="Assets/Icons/pencil-square.svg" alt="">`;
        
        
        editBtn.addEventListener("click", (event) => {
            const button = event.currentTarget;
            const section = button.closest('.sections');
            
            if(!section) {
                return;
                
            }
            
            const span = section.querySelector('.left span');

            if(!span) {
                return;
            }
            const nodes = span.childNodes;

            
            

            let taskText = "";
            nodes.forEach(node => {
                if(node.nodeType === Node.TEXT_NODE) {
                    
                    taskText = node.textContent.trim();
                    return taskText;
                }
            });
            
            const taskEditPopUp = document.createElement('div');
            taskEditPopUp.className = "taskEditPopUp";

            const popUpHeading = document.createElement('h4');
            popUpHeading.innerHTML = `Edit Task`;
            taskEditPopUp.appendChild(popUpHeading);

            const popUpInput = document.createElement('textarea');
            taskEditPopUp.appendChild(popUpInput);
            popUpInput.innerText = taskText;

            const taskEditSubmit = document.createElement('button');
            taskEditSubmit.className = 'taskEditSubmit-btn';
            taskEditSubmit.innerHTML = `Done`;
            taskEditPopUp.append(taskEditSubmit);
            taskEditSubmit.addEventListener("click", () => {
                nodes.forEach(node => {
                if(node.nodeType === Node.TEXT_NODE) {
                    node.textContent = ' ' + popUpInput.value;
                    

                }
            });
                taskEditPopUp.remove();
                
            });
            
            document.querySelector('.container').appendChild(taskEditPopUp);
            
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = `<img src="Assets/Icons/trash3-fill.svg" alt="">`;
        deleteBtn.addEventListener("click", () => {
            taskDiv.remove();
        });

        rightDiv.appendChild(editBtn);
        rightDiv.appendChild(deleteBtn);

        taskDiv.appendChild(leftDiv);
        taskDiv.appendChild(rightDiv);
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


