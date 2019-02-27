class Adapter{

  static getAllPokemon(){
    return fetch("http://localhost:3000/trainers")
                .then(res => res.json())

  }


}
