import React from 'react';
import pokemons from './data';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPokemon: 0,
			selectedType: null
		}
	}

	next = (list) => {
		const { selectedPokemon } = this.state;
		if(selectedPokemon < list.length -1) {
			this.setState(prevState => ({
				selectedPokemon: prevState.selectedPokemon + 1
			}))
		} else {
			this.setState({
				selectedPokemon: 0
			})
		}
	}

	listTypes = () => {
		return pokemons.map((pokemon) => pokemon.type)
			.filter((type, index, self) => {
				return self.indexOf(type) === index
			})
	}

	setFilter = (type) => {
		this.setState({
			selectedPokemon: 0,
			selectedType: type
		})
	}

	listPokemons = () => {
		const { selectedType } = this.state;
		const filtered = pokemons.filter(pokemon => {
			return selectedType
				? selectedType === pokemon.type
				: true
		})
		console.log(filtered)
		return filtered;
	}



	render() {
		const { selectedPokemon } = this.state;
		const types = this.listTypes();
		const list = this.listPokemons();

		return (
			<div className="pokedex">
				<Pokemon pokemon={list[selectedPokemon]} />
				<button 
					onClick={() => this.next(list)}
					disabled={list.length === 1}
				>
					Próximo Pokémon
				</button>
				{types.map((type, index) => <button key={index} onClick={() => this.setFilter(type)}>{type}</button>)}
				<button onClick={() => this.setFilter(null)}>Todos</button>
			</div>
		);
	}
}

export default Pokedex;