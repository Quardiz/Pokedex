import { makeObservable, observable, computed } from 'mobx';

class Store {
    pokemonList = [];
    filteredList = [];
    pokemon = null;
    pokecount = 0;
    limit = 300;
    filter = false;

    constructor() {
        makeObservable(this, {
            pokemonList: observable,
            filteredList: observable,
            pokemon: observable,
            pokecount: observable,
            showPokedex: computed,
            limit: observable,
            filter: observable
        })
    }

    get showPokedex() {
        if(this.filter) {
            return true;
        }
        return this.pokecount === this.limit
    }
}

export const pokedexStore = new Store();