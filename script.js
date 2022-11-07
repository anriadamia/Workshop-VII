"use strict";


const mainWraper = document.getElementById("post-block");
const overlay = document.getElementById("overlay");
const close = document.getElementById("close");
const contentOverlay = document.getElementById("content");
const addButton = document.getElementById("add");
const postOvelayAdd = document.getElementById("postoverlayadd");
const form = document.getElementById("form");



function ajax(url, callback) {
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function () {
    // let dabrunebuliPasuxiText = requist.responseText;
    // let dabrunebuliPasuxiJS = JSON.parse(dabrunebuliPasuxiText);
    let dataJs = JSON.parse(request.responseText);
    callback(dataJs);
  });
  request.send();
}

ajax("https://jsonplaceholder.typicode.com/posts", function (dataJs) {
  dataJs.forEach((item) => {
    createPost(item);
  });
});


function createPost(item) {
  const divWraper = document.createElement("div");
  divWraper.classList.add("posts");
  divWraper.setAttribute("data-id", item.id);

  const h3Post = document.createElement("h3");
  h3Post.textContent = item.id;

  const h2Post = document.createElement("h2");
  h2Post.textContent = item.title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete This Post";
  deleteButton.setAttribute("data-id", item.id);

  divWraper.appendChild(h3Post);
  divWraper.appendChild(h2Post);
  divWraper.appendChild(deleteButton);

  
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then(() => divWraper.remove());
  });


  divWraper.addEventListener("click", function (event) {
  
    let id = event.target.getAttribute("data-id");

    overlay.classList.add("activeOverlay");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function (dataJs) {
      overlayFunction(dataJs);
    });
  });

  mainWraper.appendChild(divWraper);

}


function overlayFunction(item) {
  const description = document.createElement("p");
  description.textContent = item.body;

  contentOverlay.appendChild(description);
}


close.addEventListener("click", function () {
  overlay.classList.remove("activeOverlay");
  contentOverlay.innerHTML = " ";
});


addButton.addEventListener("click", function () {
  postOvelayAdd.classList.add("addPost");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event.target[0].value);
  let formInfo = {
    title: event.target[0].value,
  };

//დავალება

  postOvelayAdd.classList.remove("addPost")
  let newh3=document.createElement("h3");
  newh3.textContent=event.target.id;
  let newh2=document.createElement("h2");
  newh2.textContent=event.target[0].value;
let divWraper = document.createElement("div");
  divWraper.classList.add("posts");
  let newDeleteButton=document.createElement("button");
  newDeleteButton.textContent="Delete This Post"
  divWraper.appendChild(newh2);
  divWraper.appendChild(newh3);
  divWraper.appendChild(newDeleteButton)
  mainWraper.appendChild(divWraper)
  newDeleteButton.addEventListener("click",function(event){
    event.stopPropagation()
    divWraper.remove()
  })
  
  divWraper.addEventListener("click",()=>{
    
    overlay.classList.add("activeOverlay");
    let divP=document.createElement("p");
    divP.textContent=event.target[0].value;
    contentOverlay.appendChild(divP)
   
  })



  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formInfo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});
