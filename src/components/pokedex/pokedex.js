import React, { Component } from 'react';
import Pokemon from '../pokemon/pokemon';
import './pokedex.scss';
import { observer } from 'mobx-react';
import fetch_retry from '../../utils'
import {cacheImages} from '../../utils'
import ObserverLoader from '../loader/loader'

class Pokedex extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount(){
        fetch_retry('http://pokeapi.co/api/v2/pokemon/?limit=' + this.props.store.limit, 10)
            .then(res => res.json())
            .then(async json => {
                this.props.store.pokemonList = json['results']
                this.props.store.filteredList = json['results']

                let pokeUrls = []
                
                await Promise.all(
                    this.props.store.pokemonList.map(element => {
                        return fetch(element.url)
                            .then(res => res.json())
                            .then(json => {
                                pokeUrls.push(json['sprites']['front_default'])
                            })
                        }
                    )
                )
                
                console.log(pokeUrls)
                await cacheImages(pokeUrls)

                this.setState({
                    isLoaded: true,
                })
            });
    }

    render() 
    {
    return <div>
            <div id='pokedex-container' style={this.props.store.showPokedex ? {} : {display: "none"}}>
                {this.props.store.filteredList.map((pokemon) => <Pokemon store={this.props.store} key={pokemon.name} url={pokemon.url}/>)}
            </div>
            <div className='loader' style={!this.props.store.showPokedex ? {} : {display: "none"}}>
                <div className='ring'>
                    <div className='ring'>
                        <div className='ring'>
                            <div className='ring'>
                                <div className='ring'>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* <Loader store={this.props.store}/> */}
            {/* <progress id="file" value={this.props.store.pokecount} max={this.props.store.limit}></progress> */}
            <ObserverLoader store={this.props.store}></ObserverLoader>
            </div>
        </div>;
    }
}

const ObserverPokedex = observer(Pokedex);
export default ObserverPokedex;