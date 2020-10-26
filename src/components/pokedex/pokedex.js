import React, { Component } from 'react';
import Pokemon from '../pokemon/pokemon';
import './pokedex.scss';
import { observer } from 'mobx-react';
class Pokedex extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
        };
    }

    componentDidMount(){
        fetch('http://pokeapi.co/api/v2/pokemon/?limit=386')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                })
                this.props.store.pokemonList = json['results']
                this.props.store.filteredList = json['results']
            });
    }

    render() {
        if(this.state.isLoaded){
            return <div>
                <div id='pokedex-container'>
                    {this.props.store.filteredList.map((pokemon) => <Pokemon store={this.props.store} key={pokemon.name} url={pokemon.url}/>)}
                </div>
                </div>
        } else {
            return <div className='loader'>
                    <div className='ring'>
                        <div className='ring'>
                            <div className='ring'>
                                <div className='ring'>
                            
                                </div>
                            </div>
                        </div>
                    </div>
            </div>;
        }
    }
}

const ObserverPokedex = observer(Pokedex);
export default ObserverPokedex;