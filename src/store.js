import { makeObservable, observable, computed } from 'mobx';

class Store {
    pokemonList = [];
    filteredList = [];
    pokemon = null;
    pokecount = 0;
    limit = 800;

    constructor() {
        makeObservable(this, {
            pokemonList: observable,
            filteredList: observable,
            pokemon: observable,
            pokecount: observable,
            showPokedex: computed,
            limit: observable
        })
    }

    get showPokedex() {
        return this.pokecount === this.limit
    }
}

export const pokedexStore = new Store();