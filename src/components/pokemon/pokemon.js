import React, {Component} from 'react';
import './pokemon.css';
import {Link} from 'react-router-dom';
export default class Pokemon extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: null
        };
    }

    componentDidMount(){
        fetch(this.props.url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    pokemon: json
                });
            });
        
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
                <h1 id='pokemon-name'>{this.state.pokemon['name']}</h1>
                <div id='sprite-container'>
                    <img className='pokemon-image' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['front_default']}></img>
                    {/* <img className='pokemon-image' alt={this.state.pokemon['name']}  src={this.state.pokemon['sprites']['back_default']}></img> */}
                </div>
                <div id='type-container'>
                    {this.state.pokemon['types'].map((type) => <div key={type['type']['name']} className={'typeBox ' + type['type']['name']} id={'type' + type['slot']}>{type['type']['name']}</div>)}
                </div>
            </Link>;
        }
    
    }
}