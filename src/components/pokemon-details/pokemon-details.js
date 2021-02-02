import React, {Component} from 'react';
import './pokemon-details.css';
//import { Link } from 'react-router-dom';
export default class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: null,
            abilities: null
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        var tempAbilities = [];
        await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    pokemon: json
                });
            });
        await Promise.all(
                this.state.pokemon['abilities'].map(async function(slot) {
                    await fetch(slot.ability.url)
                        .then(res => res.json())
                        .then(json => {
                            // this.setState({
                            //     abilities: this.state.abilities.push([slot.ability.name, json['effect_entries']['1']['effect']])
                            // });
                            tempAbilities.push([slot.ability.name, json['effect_entries']['1']['effect']]);
                            console.log(json);
                        });

                })

            )
        this.setState({
            abilities: tempAbilities
        })
        console.log('-----------------');
        console.log(this.state.abilities);
        console.log('-----------------');
    }

    render(){

        
        if(!this.state.pokemon || !this.state.abilities){
            return <p>Loading pokemon</p>;
        } else {
            
            var heldItemsDiv = <div id='held-items'><h2>No held items in the wild</h2></div>;

            if(this.state.pokemon['held_items'].length > 0){
                heldItemsDiv = <div id='held-items'>
                    <h2>Wild held items</h2>
                        {this.state.pokemon['held_items'].map((slot) => <p>{slot.item['name']}</p>)}
                    </div>;
            }
            
            const getRectangleColor = (stat) => {
                //`rgba(${255 / (stat / 35)}, 80, ${stat * 1.8 }, ${stat / 200})`
                if(stat < 55){
                    return `rgba(${255 / (35 / stat)}, 0, 1)`;
                }
                if(stat < 90){
                    return `rgba(${255 / (stat / 35)}, ${stat * 1.8 }, 0, 1)`;
                }
                if(stat < 115){
                    return `rgba(0, 100, ${stat * 1.8 }, 1)`
                }
                if(stat < 154) {
                    return `rgba(50, ${stat * 1.8 }, ${stat * 1.8 }, 1)`;
                }
                return `rgba(${stat * 1}, ${stat * 1.8 }, ${stat * 1.8 }, 1)`;
            }

            return <div id='details-container'>
                {/* <Link id='back' to={{pathname: '/'}}>Go back</Link> */}
                <p id='details-pokedex-number'>{'#' + this.state.pokemon['id']}</p>
                <p id='details-name'>{this.state.pokemon['name']}</p>
                <div id='image-container'>
                    <img id='big-image' className='pokemon-image' src={this.state.pokemon['sprites']['other']['official-artwork']['front_default']} alt='dream'></img>
                    <div className='sprite-container'>
                        <img className='pokemon-image' id='front_default' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['front_default']}></img>
                        <img className='pokemon-image' id='back_default' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['back_default']}></img>
                        <br></br>
                        <img className='pokemon-image' id='front_shiny' alt={this.state.pokemon['name']} src={this.state.pokemon['sprites']['front_shiny']}></img>
                        <img className='pokemon-image' id='back_shiny' alt={this.state.pokemon['name']}  src={this.state.pokemon['sprites']['back_shiny']}></img>
                    </div>
                </div>
                {/* <img src={this.state.pokemon['sprites']['other']['dream_world']['front_default']} alt='dream'></img> */}
                <div id='details-type-container'>
                    {this.state.pokemon['types'].map((type) => <div key={type['type']['name']} className={'typeBoxDetails ' + type['type']['name']} id={'type' + type['slot']}>{type['type']['name']}</div>)}
                </div>
                <table id='stat-table'>
                    {this.state.pokemon.stats.map((slot) => <tr>
                        <td className='stat-name'>{slot.stat.name}</td>
                        <td className='base-stat'>{slot.base_stat}</td>
                        <td className='rectangle-container'>
                            <div className={'default-rect'} style={{width: slot.base_stat*1.5, backgroundColor: getRectangleColor(slot.base_stat)}}>
                            </div>
                        </td>
                    </tr>)}
                </table>
                <div id='text-container' className='standard-text'>
                    <div id='ability-container'>
                        <h2>Abilities</h2>
                    {this.state.abilities.map((ability) => <div id='ability-div'>
                        <p id='ability-name'>{ability[0] + ':  '}</p>
                        <p id='ability-details'>{ability[1]}</p>
                    </div>)}
                </div>
                    {heldItemsDiv}
                    </div>
                    <div>

                    </div>
                    
                    <div id='moves-container'>
                        <h2>List of moves</h2>
                        <div id='move-items-container'>
                            <ul>
                                {this.state.pokemon['moves'].map((slot) => <li>{slot.move['name']}</li>)}
                            </ul>
                        </div>
                    </div>
            </div>;
        }
    }
}
