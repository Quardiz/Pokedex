import React, {Component} from 'react';
import './pokemon.css';
import {Link} from 'react-router-dom';
import {cacheImages} from '../../utils'
export default class Pokemon extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: null
        };
        this.handleImageLoaded = this.handleImageLoaded.bind(this)
        this.handleImageErrored = this.handleImageErrored.bind(this)
    }

    handleImageLoaded() {
        this.props.store.pokecount += 1
    }

    handleImageErrored() {
        this.props.store.pokecount += 1
    }

    componentDidMount(){
        fetch(this.props.url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    pokemon: json
                });
            }).catch(err => console.log(err));
    }

    render(){
        
        const loadPokemonDetails = () => {
            this.props.store.pokemon = this.state.pokemon;
        };

        if(this.state.pokemon == null){
            return <div>
            </div>;
        } else {
            
            return <Link to={{pathname: '/' + this.state.pokemon['id']}} onClick={loadPokemonDetails} id='pokemon-container'>
                <p id='pokedex-number'>{'#' + this.state.pokemon['id']}</p>
                <p id='pokemon-name'>{this.state.pokemon['name']}</p>
                <div id='sprite-container'>
                    <img 
                        onLoad={this.handleImageLoaded}
                        onError={this.handleImageErrored}
                        className='pokemon-image'
                        alt={this.state.pokemon['name']}
                        src={this.state.pokemon['sprites']['front_default']}></img>
                    {/* <img className='pokemon-image' alt={this.state.pokemon['name']}  src={this.state.pokemon['sprites']['back_default']}></img> */}
                </div>
                <div id='type-container'>
                    {this.state.pokemon['types'].map((type) => <div key={type['type']['name']} className={'typeBox ' + type['type']['name']} id={'type' + type['slot']}>{type['type']['name']}</div>)}
                </div>
            </Link>;
        }
    
    }
}