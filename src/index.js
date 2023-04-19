let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addNewToy();
      
    } else {
      toyFormContainer.style.display = "none";
    }
    
  });



  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => toys.forEach(toy=>addToyToCard(toy)))
  
})

function addToyToCard(toy){  
  const card = document.createElement("div")
  const toyCollector = document.querySelector('#toy-collection')
  card.className = "card";
  card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>`
  toyCollector.appendChild(card)
  card.querySelector(".like-btn").addEventListener("click", ()=> {
    toy.likes++
    card.querySelector("p").textContent = `${toy.likes} Likes`
    increaseToyLikes(toy);
  });
  
}

function addNewToy(){

  const toyName = document.querySelector("input[name='name']").value
  const toyUrl = document.querySelector("input[name='image']").value
  const form = document.querySelector("form")
  form.addEventListener("submit", (e)=>{
    e.preventDefault()
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
      }),
    })
    .then(response => response.json())
    .then(toy=>addToyToCard(toy))
  })
}

function increaseToyLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(toy),
  })
  .then(resp => resp.json())
  .then(toy=>toy)
}