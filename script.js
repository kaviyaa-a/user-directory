// const text = document.getElementById("text");
// const userList = document.querySelector(".userList");

// async function getUser() {
//   text.textContent = "Loading users...";

//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   console.log(users);

//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   text.textContent = "";

//     users.forEach(user => {
//     const { id, name, email, address, company } = user;

//     const newElement = document.createElement('div');
//     newElement.className = 'container-fluid border rounded-3 my-3';

//     [id, name, email, address.city, company.name].forEach(detail => {
//       const p = document.createElement('p');
//       p.textContent = detail;
//       newElement.appendChild(p);
//     });

//     userList.appendChild(newElement);
//   });
// }
// getUser();

const text = document.getElementById("text");
const userList = document.querySelector(".userList");
const retryBtn = document.getElementById("retryBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allUsers = [];

function renderUsers(users) {
    userList.textContent = "";

    if(users.length === 0){
        text.textContent = "User doesn't match";
    } else{
        text.textContent = '';
    users.forEach((user) => {
        const { name, email, address, company } = user;

        const card = document.createElement("div");
        card.className = "container-fluid border rounded-3 my-3";

        [name, email, address.city, company.name].forEach((value) => {
            const p = document.createElement("p");
            p.textContent = value;
            card.appendChild(p);
        });

        userList.appendChild(card);
    });
}
}

async function getUser() {
     text.textContent = "Loading users..."; 
    retryBtn.classList.add("d-none");
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`);
        }
    
    const users = await response.json();
    allUsers = users;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    text.textContent = "";

    renderUsers(allUsers);
}
catch(e){
    text.textContent = "Failed to load users. Please try again later";
    retryBtn.classList.remove("d-none");
}
}

function filterUsers(){
        const keyword = searchInput.value.trim().toLowerCase();
        const filteredUser = allUsers.filter(alluser => alluser.name.toLowerCase().includes(keyword));
        renderUsers(filteredUser);
    }
searchInput.addEventListener("input", filterUsers);
searchBtn.addEventListener("click", filterUsers);

getUser();
retryBtn.addEventListener("click", getUser);
