//adding this global varable to i dont have to make another fetch call
let userArray = {}

//solution goes here
document.addEventListener('DOMContentLoaded', ()=>{
    startUp()
})

function startUp(){
    //fetches all the users and there data
    let promise = Adapter.getAllPokemon()
    //pass on the json to be delt with
    promise.then(json => jsonHandeler(json))
}

function jsonHandeler(json){
  // reset inner text of mai div
  getMainDiv().innerText = ""

  //setting global variable
  userArray = json

  //for each user make there card and render it to the screen
  json.forEach(renderUser)

}

function renderUser(user){
  // make the card with the data
  let card = createCard(user)

  //grab the div to append the card too
  let main = getMainDiv()

  //append it to the card
  main.appendChild(card)
}

function createCard(data) {
  //   <div class="card">
  //      <p>Ann</p>
  //   <button>Add Pokemon</button>
  //   <ul>
  //     <li>Jacey (Kakuna) <button class="release">Release</button></li>
  //     <li>Zachariah (Ditto) <button class="release">Release</button></li>
  //   </ul>
  //   </div>

  //create elements needed
  let div = document.createElement('div')
  div.id = `card-user-${data.id}`
  div.classList = "card"

  let p = document.createElement('p')
  p.innerText = data.name
  // p.id = `p-name-user-${data.id}`

  let addBtn = document.createElement('button')
  addBtn.innerText = "Add Pokemon"
  //add event listener to add
  addBtn.addEventListener('click', ()=>{addPokemon(data)})

  // addBtn.id = `btn-add-user-${data.id}`

  let ul = document.createElement('ul')
  // ul.id = `ul-user-${data.id}`

  //for each pokemon create there own li
  data.pokemons.forEach((poke)=>{
    let li = document.createElement('li')
    li.id = `li-pokemon-${poke.id}`
    li.innerText = `${poke.nickname} (${poke.species})`

    let releaseBtn = document.createElement('button')
    releaseBtn.classList = "release"
    releaseBtn.innerText = "Release"
    //add event listener to release
    releaseBtn.addEventListener('click', ()=>{releasePoke(poke)})

    //add btn to li
    li.appendChild(releaseBtn)

    //add li to list
    ul.appendChild(li)
  })

  //add elements to div
  div.appendChild(p)
  div.appendChild(addBtn)
  div.appendChild(ul)

  return div
}

function addPokemon(user){
  //if statement so a user can not have more than 6 pokemon
  if(user.pokemons.length < 6){
    let promise = Adapter.addPokemonToUser(user.id)
    promise.then(json => updateAddUser(json))
  }else{
    alert(`I'm sorry ${user.name} you cannnot have more than 6 Pokemon.`);
  }

}

function releasePoke(poke){
  //fetch to delete pokemon
  let promise = Adapter.deletePokemonFromUser(poke)
  promise.then(json => updateDeleteUser(json))
}

function getMainDiv(){
  return document.getElementById('cards-main')
}

function updateAddUser(poke){
  //updating userArray variables
  userArray.forEach((cur)=>{
    if (cur.id === poke.trainer_id) {
      cur.pokemons.push(poke)
    }
  })

  //update DOM without a fetch
  jsonHandeler(userArray)

}

function updateDeleteUser(poke){
  //updating userArray variables
  userArray.forEach((cur)=>{
    if (cur.id === poke.trainer_id) {
      //removing pokemon from userArray
      cur.pokemons = cur.pokemons.filter((e)=>{return e.id !== poke.id})

    }
  })

  //update DOM without a fetch
  jsonHandeler(userArray)

}
