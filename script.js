console.log("script.js is initialized");

let errorShown = false;


// adding Tasks
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

        // creating sections
        const taskDiv = document.createElement('div');
        taskDiv.className = 'sections';


        // creating section child left
        const leftDiv = document.createElement('div');
        leftDiv.className = 'left';

        // creating section child rigth
        const rightDiv = document.createElement('div');
        rightDiv.className = 'right';

        // creating checkbox inside left 
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        // creating span inside left
        const span = document.createElement('span');

        // appending checkbox and task inside span
        span.appendChild(checkbox);
        span.append(task);

        // appeding span inside left
        leftDiv.appendChild(span);

        // creating editbtn
        const editBtn = document.createElement('button');
        editBtn.className = 'editBtn';
        editBtn.innerHTML = `<img src="Assets/Icons/pencil-square.svg" alt="">`;

        // edtibtn working 
        editBtn.addEventListener("click", (event) => {

            // creating overlay
            const overlay = document.createElement('div');
            overlay.className = 'popupOverlay';


            // Taking value from sections for editing
            const button = event.currentTarget;
            const section = button.closest('.sections');

            if (!section) return;

            const span = section.querySelector('.left span');
            if (!span) return;

            const nodes = span.childNodes;
            let taskText = "";

            for (let node of nodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    taskText = node.textContent.trim();
                    break;
                }
            }

            // creating taskEditPopUp div
            const taskEditPopUp = document.createElement('div');
            taskEditPopUp.className = "taskEditPopUp";


            // Creating PopUpHeading and appending it to taskEditPopUp
            const popUpHeading = document.createElement('h4');
            popUpHeading.innerHTML = `Edit Task`;
            taskEditPopUp.appendChild(popUpHeading);


            // Creating popUpInput area dn appending it to taskEditPopUp
            const popUpInput = document.createElement('textarea');
            popUpInput.innerText = taskText;
            taskEditPopUp.appendChild(popUpInput);


            // Creating taskEditSubmit btn and appending it o taskEditPopUp
            const taskEditSubmit = document.createElement('button');
            taskEditSubmit.className = 'taskEditSubmit-btn';
            taskEditSubmit.innerHTML = `Done`;
            taskEditPopUp.appendChild(taskEditSubmit);


            // appending overlay to the body
            overlay.appendChild(taskEditPopUp);
            document.body.appendChild(overlay);

            // EventListner click to submit button
            taskEditSubmit.addEventListener("click", () => {
                nodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = ' ' + popUpInput.value;
                    }
                });
                // removing both taskEditPopUp and overlay on submit
                taskEditPopUp.remove();
                overlay.remove();
            });

            // removing overlay on clicking outside the text area
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                }
            });

        });


        // delete btn 
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = `<img src="Assets/Icons/trash3-fill.svg" alt="">`;
        deleteBtn.addEventListener("click", () => {
            taskDiv.remove();
            updateSearchVisibility();
        });

        // appending the child elements of section
        rightDiv.appendChild(editBtn);
        rightDiv.appendChild(deleteBtn);

        taskDiv.appendChild(leftDiv);
        taskDiv.appendChild(rightDiv);
        container.appendChild(taskDiv);

        setTimeout(() => {
            taskDiv.classList.add('fade-in');
        }, 10);


        // Making search bar visible only after appending the sections
        // document.querySelector(".search").classList.add("visible");
        updateSearchVisibility();


        // Clearing the addTaskInput value and focusing again
        document.getElementById('addTaskInp').value = "";
        document.getElementById('addTaskInp').focus();
    } else {
        // Error handling
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

//  Search Functionality (Live + Enter)
const searchInput = document.getElementById('searchInp');

//  Live Search
searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const cards = document.querySelectorAll(".todoCard .sections");

    cards.forEach(card => {
        const taskSpan = card.querySelector('.left span');
        const taskText = taskSpan ? taskSpan.textContent.toLowerCase() : '';
        card.style.display = taskText.includes(searchValue) ? '' : 'none';
    });
    updateSearchVisibility();

});

//  Search Confirm on Enter
searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const searchValue = this.value.trim().toLowerCase();
        const cards = document.querySelectorAll(".todoCard .sections");

        if (searchValue === "") {
            alert("Please type something to search.");
        } else {
            console.log("Search confirmed:", searchValue);
            const visibleCards = Array.from(cards).filter(card => {
                const taskSpan = card.querySelector('.left span');
                return taskSpan && taskSpan.textContent.toLowerCase().includes(searchValue);
            });

            if (visibleCards.length > 0) {
                visibleCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                alert("No matching tasks found.");
            }
        }
    }
});

// Search bar disappear after all tasks deleted

function updateSearchVisibility() {
    const cards = document.querySelectorAll(".todoCard .sections");
    const anyVisible = Array.from(cards).some(card => card.style.display !== "none");

    const searchBar = document.querySelector(".search");
    if (anyVisible) {
        searchBar.classList.add("visible");
    } else {
        searchBar.classList.remove("visible");
    }
}
