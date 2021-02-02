import React , {Component} from 'react';
import './nav-bar.css';
import pokeball from '../../assets/pokeball.png';
import pokemon from './pokemon.png';

export default class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    render() {
        const handleOnSubmit = (e) => {
            e.preventDefault();
            
            if(this.state.searchTerm == ''){
                this.props.store.filter = true;
                this.props.store.filteredList = this.props.store.pokemonList;
                //this.setState({searchTerm: ''});
            }

            if(this.state.searchTerm){
                this.props.store.filter = true;
                this.props.store.filteredList = this.props.store.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) );
                console.log(this.props.store.filteredList);
                //this.setState({searchTerm: ''});
            }
        };

        const handleOnChange = (e) => {
            this.setState({
                searchTerm: e.target.value
            });
        };
        return <div id='nav-container'>
                {/* <div id='image-background'>
                    <img id='nav-image' src={pokeball} alt='navImage'></img>
                    <img id='nav-image2' src={pokemon} alt='navImage2'></img>
                </div> */}
                <form onSubmit={handleOnSubmit}>
                
                    <input className='filter' type='search' placeholder='Filter...' value={this.state.searchTerm} onChange={handleOnChange}/>
                </form>
            </div>
    }
}