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

            dragElement(document.getElementById("pokemon-container"));

            function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
                }
            }
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