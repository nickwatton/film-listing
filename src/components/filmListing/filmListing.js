import React from 'react';
import Film from './film/film';

const filmListing = (props) => {
	return(
		<div className='film-listing'>
			{props.films.map( (film, index) => <Film key={index} film={film} />  )}
		</div>
	)
}

export default filmListing;