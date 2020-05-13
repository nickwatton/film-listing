import React, { Component } from 'react';
import Header from './components/header/header';
import AboutPage from './components/pages/about';
import FilmListing from './components/filmListing/filmListing';
import FilterList from './components/filterList/filterList';
import MinMax from './components/filterList/filterUI/minMax';
import SelectList from './components/filterList/filterUI/selectList';
import SelectListMax from './components/filterList/filterUI/selectListMax';
import TextInput from './components/filterList/filterUI/textInput';
import Pagination from './components/pagination/pagination';
import Footer from './components/footer/footer';
import './App.scss';

class App extends Component {
	state = {
		year: 2020,
		pageSize: 10,
		currentPage: 0,
		films: [],
		filters: [],
		activeFilter: 'Genre',
		minMaxDuration: {'min':0, 'currMin':0, 'max':1, 'currMax':1, active:true },
		minMaxYear: {'min':0, 'currMin':0, 'max':1, 'currMax':1, active:true },
		minMaxStars: {'min':0, 'currMin':0, 'max':5, 'currMax':5, active:true },
		selectedAge: 'none',
		selectedGenre: 'none',
		selectedDirector: '',
		selectedTitle: '',
		pageToDisplay: 'LOADING',
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
		mutable.pageToDisplay = 'LISTING';
		this.setState(mutable);
	}
	
	/* Creates lists of unique data from all films, for search filters.
	EG: age strings and values.
	Also normalises incoming data to match age strings, as data is old, and I want a cleaner search on BBFC ratings */
	processFilms(mutable, ageLookup){
		let ageRatings = {};
		let ageRatingsArray;
		let directors = {};
		let genres = {};
		let films = mutable.films;
		let minYear = 9999999, maxYear = 0;
		let minLength = 9999999, maxLength = 0;
		
		// console.log(films[0])
		let c=0;

		for(let i = 0; i<films.length; i++){
			let film = films[i];
			let ageString = film.BBFC;

			if(ageString === '')
					console.log(++c, film.title)

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
				if(genre[i] !== '')
					genres[genre[i]] = genre[i];
			}
		}
		// console.log(genres)
		// console.log(films[13])

		directors = this.sortObject(directors);
		mutable.directorDataListValues = this.convertObjectToArray(directors);
		
		genres = this.sortObject(genres);
		mutable.genreDataListValues = this.convertObjectToArray(genres);

		ageRatingsArray = this.convertObjectToArray(ageRatings)
		ageRatingsArray.sort(function(a, b) {
			return a.ageValue - b.ageValue;
		});
		mutable.ageFilterValues = ageRatingsArray;

		mutable.minMaxYear = {'min':minYear, 'currMin':minYear, 'max':maxYear, 'currMax':maxYear, active:true }
		mutable.minMaxDuration = {'min':minLength, 'currMin':minLength, 'max':maxLength, 'currMax':maxLength, active:true }

		// console.log('Directors:', mutable.directorDataListValues)
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


	// Set properties of currently selected filter UI
	setFilterUI(){
		let filterUI = null;
		if(this.state.activeFilter){
			if(this.state.activeFilter === 'Duration'){
				filterUI = <MinMax minMax = {this.state.minMaxDuration}
													stateObject = {'minMaxDuration'}
													isActive = {this.state.minMaxDuration.active}
													toggle = { this.handleMinMaxToggle }
													change = { this.handleMinMaxChange }/>
			}
			else if(this.state.activeFilter === 'Year'){
				filterUI = <MinMax minMax = {this.state.minMaxYear}
													stateObject = {'minMaxYear'}
													isActive = {this.state.minMaxYear.active}
													toggle = { this.handleMinMaxToggle }
													change = { this.handleMinMaxChange }/>
			}
			else if(this.state.activeFilter === 'Star Rating'){
				filterUI = <MinMax minMax = {this.state.minMaxStars}
													stateObject = {'minMaxStars'}
													isActive = {this.state.minMaxStars.active}
													toggle = { this.handleMinMaxToggle }
													change = { this.handleMinMaxChange }/>
			}
			else if(this.state.activeFilter === 'Age Rating'){
				filterUI = <SelectListMax stateObject = {'selectedAge'}
													currentValue = {this.state.selectedAge}
													options = {this.state.ageFilterValues}
													change = { this.handleSelectMaxClick } />
			}
			else if(this.state.activeFilter === 'Genre'){
				filterUI = <SelectList stateObject = {'selectedGenre'}
													currentValue = {this.state.selectedGenre}
													options = {this.state.genreDataListValues}
													change = { this.handleSelectClick } />
			}
			else if(this.state.activeFilter === 'Director'){
				filterUI = <TextInput stateObject = {'selectedDirector'}
													searchField = 'Directors'
													options = {this.state.directorDataListValues}
													change = { this.handleTextInputChange } />
			}
			else if(this.state.activeFilter === 'Title'){
				filterUI = <TextInput stateObject = {'selectedTitle'}
													searchField = 'Titles'
													change = { this.handleTextInputChange } />
			}
		}
		return filterUI;
	}

	// Set / toggle off current filter
	filterHandler = (filterType, filterID) => {
		const mutable = {...this.state};
		mutable.activeFilter = filterID === mutable.activeFilter ? null : filterID;
		this.setState(mutable);
	}

	// Apply filters to full film list
	filterFilmList(){
		let filteredFilms = [...this.state.films];

		// Filter the films
		if(this.state.loaded){
			// MinMax filters (duration, years, stars)
			if(this.state.minMaxDuration.active) {
				filteredFilms = filteredFilms.filter( film => film.duration <= this.state.minMaxDuration.currMax && film.duration >= this.state.minMaxDuration.currMin );
			}
			if(this.state.minMaxYear.active) {
				filteredFilms = filteredFilms.filter( film => film.year <= this.state.minMaxYear.currMax && film.year >= this.state.minMaxYear.currMin );
			}
			if(this.state.minMaxStars.active) {
				filteredFilms = filteredFilms.filter( film => film.stars <= this.state.minMaxStars.currMax && film.stars >= this.state.minMaxStars.currMin );
			}
			// Select list filters (age, genre)
			if(this.state.selectedAge !== 'none'){
				filteredFilms = filteredFilms.filter( film => film.ageValue <= this.state.selectedAge );
			}
			if(this.state.selectedGenre !== 'none'){
				filteredFilms = filteredFilms.filter( film => film.category.includes(this.state.selectedGenre) );
			}
			// Text input filters (director, title)
			if(this.state.selectedDirector !== ''){
				filteredFilms = filteredFilms.filter( film => film.director.toLowerCase().indexOf(this.state.selectedDirector) !== -1 );
			}
			if(this.state.selectedTitle !== ''){
				filteredFilms = filteredFilms.filter( film => film.title.toLowerCase().indexOf(this.state.selectedTitle) !== -1 );
			}
		}
		return filteredFilms;
	}

	filmsInCurrentPage(filteredFilms){
		let startFilm = this.state.pageSize * this.state.currentPage;
		let filmsToDisplay = [...filteredFilms].slice(
			startFilm, startFilm + this.state.pageSize
		)
		return filmsToDisplay;
	}

	// Handle min/max slider
	handleMinMaxChange = (evt, stateObj) => {
		const mutable = {...this.state};
		const val = Number(evt.target.value);
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
	// Toggle a filter being active
	handleMinMaxToggle = (evt, stateObj) => {
		const mutable = {...this.state};
		const stateObject = mutable[stateObj];
		stateObject.active = evt.target.checked;
		this.setState(mutable);
	}

	// Handle selectlistMax filter
	handleSelectMaxClick = (evt, stateObj) => {
		const mutable = {...this.state};
		mutable[stateObj] = Number(evt.target.value);
		this.setState(mutable);
	}	

	// Handle selectlist filter
	handleSelectClick = (evt, stateObj) => {
		const mutable = {...this.state};
		mutable[stateObj] = evt.target.value;
		this.setState(mutable);
	} 

	// Handle textInput filter
	handleTextInputChange = (evt, stateObj) => {
		const mutable = {...this.state};
		mutable[stateObj] = evt.target.value.toLowerCase();
		this.setState(mutable);
	} 

	handlePagination = (val) => {
		const mutable = {...this.state};
		mutable.currentPage += val;
		this.setState(mutable);
	}
	// Check if current page > max page 
	// NB - Current page is zero based **
	checkPageInBounds = (pageMax) => {
		const mutable = {...this.state};
		if(pageMax < mutable.currentPage) {
			mutable.currentPage = pageMax - 1; // **
			this.setState(mutable);
		}
	}

	handleHeaderClick = () => {
		const mutable = {...this.state};
		if(mutable.pageToDisplay !== 'LOADING') {
			if(mutable.pageToDisplay === 'LISTING' ){
				mutable.pageToDisplay = 'ABOUT';
			}
			else {
				mutable.pageToDisplay = 'LISTING';
			}
			this.setState(mutable);
		}
	}

	render(){
		// Apply filters and pagination to films
		let filteredFilms = this.filterFilmList();
		let filmsToDisplayInPage = this.filmsInCurrentPage(filteredFilms);

		// Calculate pagination details under current filters
		let pageMax = Math.ceil( filteredFilms.length / this.state.pageSize );
		this.checkPageInBounds(pageMax);

		// Display currently selected filter UI
		let filterUI = this.setFilterUI();

		let bodyContent = <h2 className = "loading">Loading data</h2>
		if (this.state.loaded) {
			bodyContent = (this.state.pageToDisplay === 'LISTING') ? 
				<div>
					<FilterList filterClick = { this.filterHandler } 
											filters = {this.state.filters} 
											// ageFilterValues = {this.state.ageFilterValues} 
											activeFilter = {this.state.activeFilter} />
					{ filterUI }
					<FilmListing films = {filmsToDisplayInPage} /> 
					<Pagination page = {this.state.currentPage} 
											pageMax = {pageMax} 
											numFilms = {filteredFilms.length}
											click = { this.handlePagination } />
				</div> 
				:
				<AboutPage />
		}

		return (
			<div className = "App">
				<Header linkCopy = {this.state.pageToDisplay} click = { this.handleHeaderClick }/>

				{ bodyContent }

				<Footer year = {this.state.year} />
			</div>
		)
	}
}

export default App;
