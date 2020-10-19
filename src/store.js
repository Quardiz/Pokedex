import { makeObservable, observable } from 'mobx';

class Store {
    pokemonList = [];
    filteredList = [];
    pokemon = null;

    constructor() {
        makeObservable(this, {
            pokemonList: observable,
            filteredList: observable,
            pokemon: observable
        })
    }
}

export const pokedexStore = new Store();