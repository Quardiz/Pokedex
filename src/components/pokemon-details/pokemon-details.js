import React, {Component} from 'react';
import './pokemon-details.css';
import { Link } from 'react-router-dom';
export default class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    pokemon: json
                });
            });
    }

    render(){

        
        if(!this.state.pokemon){
            return <p>Loading pokemon</p>;
        } else {
            
            var heldItemsDiv = <div id='held-items'><h2>No held items in the wild</h2></div>;

            if(this.state.pokemon['held_items'].length > 0){
                heldItemsDiv = <div id='held-items'>
                    <h2>Wild held items</h2>
                        {this.state.pokemon['held_items'].map((slot) => <p>{slot.item['name']}</p>)}
                    </div>;
            }
            
            const getRectangle = (stat) => {
                if(stat < 55){
                    return 'red-rect';
                }
                if(stat < 90){
                    return 'yellow-rect';
                }
                return 'blue-rect';
            }

            return <div id='details-container'>
                {/* <Link id='back' to={{pathname: '/'}}>Go back</Link> */}
                <h1 id='details-name'>{this.state.pokemon['name']}</h1>
                <div id='image-container'>
                    <table id='stat-table'>
                        {this.state.pokemon.stats.map((slot) => <tr>
                            <td class='stat-name'>{slot.stat.name}</td>
                            <td class='base-stat'>{slot.base_stat}</td>
                            <td class='rectangle-container'>
                                <div class={'default-rect ' + getRectangle(slot.base_stat)} style={{width: slot.base_stat*1.5, backgroundColor: `rgba(${252 / (slot.base_stat / 10)}, 100, ${slot.base_stat * 1.8 }, 1)`}}>
                                </div>
                            </td>
                        </tr>)}
                    </table>
                    <img class='pokemon-image' src={this.state.pokemon['sprites']['other']['official-artwork']['front_default']} alt='dream'></img>
                    <div class='sprite-container'>
                        <img class='pokemon-image' id='front_default' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['front_default']}></img>
                        <img class='pokemon-image' id='back_default' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['back_default']}></img>
                        <br></br>
                        <img class='pokemon-image' id='front_shiny' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['front_shiny']}></img>
                        <img class='pokemon-image' id='back_shiny' alt={this.state.pokemon['name']}  src={this.state.pokemon['sprites']['back_shiny']}></img>
                    </div>
                </div>
                {/* <img src={this.state.pokemon['sprites']['other']['dream_world']['front_default']} alt='dream'></img> */}
                <div id='details-type-container'>
                    {this.state.pokemon['types'].map((type) => <div key={type['type']['name']} className={'typeBoxDetails ' + type['type']['name']} id={'type' + type['slot']}>{type['type']['name']}</div>)}
                </div>
                <div id='text-container' class='standard-text'>
                    <div id='ability-container'>
                        <h2>Abilities</h2>
                        {this.state.pokemon['abilities'].map((slot) => <p>{slot.ability['name']}</p>)}
                    </div>
                    {heldItemsDiv}
                    <div id='moves-container'>
                        <h2>List of moves</h2>
                        <div id='move-items-container'>
                            <ul>
                                {this.state.pokemon['moves'].map((slot) => <li>{slot.move['name']}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>;
        }
    }
}
