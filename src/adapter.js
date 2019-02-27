class Adapter{

  static getAllPokemon(){
    return fetch("http://localhost:3000/trainers")
                .then(res => res.json())

  }
  static addPokemonToUser(userId){
    let data = {}
    data.trainer_id = userId
    return fetch(`http://localhost:3000/pokemons`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    }).then(res => res.json())

  }
  static deletePokemonFromUser(poke){
    return fetch(`http://localhost:3000/pokemons/${poke.id}`,{
            method: "DELETE"
    }).then(res => res.json())
  }

}
