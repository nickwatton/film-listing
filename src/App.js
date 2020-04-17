import React, { Component } from 'react';
import Header from './components/header/header';
import FilmListing from './components/filmListing/filmListing';
import FilterList from './components/filterList/filterList';
import MinMax from './components/filterList/filterUI/minMax';
import Pagination from './components/pagination/pagination';
import Footer from './components/footer/footer';
import './App.scss';

class App extends Component {
	state = {
		year: 2020,
		pageSize: 3,
		pageId: 0,
		films:[],
		filters:[],
		activeFilter:'Year',
		loaded:false
	}

	componentDidMount(){
		let serviceURL = './data/films.json';
		let requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		fetch(serviceURL, requestOptions)
			.then(response => response.text())
			.then(result => { this.setData(JSON.parse(result)) })
			.catch(error => { console.log(error) });
	}

	setData(data){
		const mutable = {...this.state};
		mutable.films = [...this.state.films, ...data.films];

		this.processFilms(mutable, data.ratingMap);

		mutable.year = data.copyright;
		mutable.filters = [...this.state.filters, ...data.filters];
		mutable.loaded = true;
		this.setState(mutable);


	}
	
	/* Creates lists of unique data from all films, for search filters.
	EG: age strings and values.
	Also normalises incoming data to match age strings, as data is old, and I want a cleaner search on BBFC ratings */
	processFilms(mutable, ageLookup){
		let ageRatings = {};
		let directors = {};
		let genres = {};
		let films = mutable.films;
		let minYear = 9999999, maxYear = 0;
		let minLength = 9999999, maxLength = 0;
		
		// console.log(films[0])

		for(let i = 0; i<films.length; i++){
			let film = films[i];
			let ageString = film.BBFC;
			film.BBFC = ageLookup[ageString].id;
			film.ageValue = ageLookup[ageString].weight;
			ageRatings[film.BBFC] = {id:film.BBFC, ageValue:film.ageValue};

			if(film.year){
				if(film.year < minYear) { minYear = film.year; }
				if(film.year > maxYear) { maxYear = film.year; }
			}

			if(film.duration){
				if(film.duration < minLength) { minLength = film.duration; }
				if(film.duration > maxLength) { maxLength = film.duration; }
			}

			let director = film.director.split('|');
			for(let i=0; i<director.length; i++){
				directors[director[i]] = director[i];
			}

			let genre = film.category.split('|');
			for(let i=0; i<genre.length; i++){
				genres[genre[i]] = genre[i];
			}
		}

		directors = this.sortObject(directors);
		mutable.directorDataListValues = this.convertObjectToArray(directors);
		
		genres = this.sortObject(genres);
		mutable.genreDataListValues = this.convertObjectToArray(genres);

		mutable.ageFilterValues = ageRatings;
		mutable.minMaxYear = {'min':minYear, 'currMin':minYear, 'max':maxYear, 'currMax':maxYear, error:'' }
		mutable.minMaxDuration = {'min':minLength, 'currMin':minLength, 'max':maxLength, 'currMax':maxLength, error:'' }

		// console.log('Genres:', mutable.genreDataListValues)
		// console.log(genres)
	}

	sortObject(unsorted){
		return Object.keys(unsorted)
		.sort()
		.reduce((acc, key) => ({
			...acc, [key]: unsorted[key]
		}), {});
	}

	convertObjectToArray(obj){
		return Object.keys(obj).map( key => obj[key] );
	}

	// Set / toggle off current filter
	filterHandler = (filterType, filterID) => {
		const mutable = {...this.state};
		mutable.activeFilter = filterID === mutable.activeFilter ? null : filterID;
		this.setState(mutable);
	}

	handleMinMaxChange = (evt, stateObj) => {
		const val = Number(evt.target.value);
		const mutable = {...this.state};
		const stateObject = mutable[stateObj];
		if(evt.target.id === 'rangeMin'){
			stateObject.currMin = val;
			if(stateObject.currMax < val){
				stateObject.currMax = val;
			}
		}
		else if(evt.target.id === 'rangeMax'){
			stateObject.currMax = val;
			if(stateObject.currMin > val){
				stateObject.currMin = val;
			}
		}
		this.setState(mutable);
	}

	render(){
		let filteredFilms = [...this.state.films];
		
		// Filter duration
		filteredFilms = filteredFilms.filter( film => film.duration <= this.state.minMaxDuration.currMax && film.duration >= this.state.minMaxDuration.currMin );

		// Filter year
		filteredFilms = filteredFilms.filter( film => film.year <= this.state.minMaxYear.currMax && film.year >= this.state.minMaxYear.currMin );

		let filmsToDisplay = [...filteredFilms].slice(
			this.state.pageSize * this.state.pageId, this.state.pageSize
		)
		let pageMax = Math.ceil( filteredFilms.length / this.state.pageSize );

		let filterUI = null;
		if(this.state.activeFilter && this.state.activeFilter === 'Duration'){
			filterUI = <MinMax minMax = {this.state.minMaxDuration}
												minMaxStateObject = {'minMaxDuration'}
												change = { this.handleMinMaxChange }/>
		}
		else if(this.state.activeFilter && this.state.activeFilter === 'Year'){
			filterUI = <MinMax minMax = {this.state.minMaxYear}
												minMaxStateObject = {'minMaxYear'}
												change = { this.handleMinMaxChange }/>
		}

		const bodyContent = this.state.loaded ?
					<div>
						<FilterList filterClick = { this.filterHandler } 
												filters = {this.state.filters} 
												ageFilterValues = {this.state.ageFilterValues} 
												activeFilter = {this.state.activeFilter} />
						{ filterUI }
						<FilmListing films = {filmsToDisplay} /> 
					</div> : 
					<h2 className = "loading">Loading data</h2>

		return (
			<div className = "App">
				<Header />

				{ bodyContent }
				
				<Pagination page = {this.state.pageId + 1} pageMax = {pageMax} numFilms = {filteredFilms.length}/>
				<Footer year = {this.state.year}/>
			</div>
		)
	}
}

export default App;
