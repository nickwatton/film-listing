import React from 'react';

const film = (props) => {
	const convertToHours = (minutes) => {
		let hours = Math.floor(minutes / 60);
		let mins = minutes % 60;
		return `${hours} hour${hours === 1 ? '' : 's'} ${mins} minute${mins === 1 ? '' : 's'}`;
	}
	
	const  film = props.film;

	const details = [];
	if (film.duration !== null) details.push(convertToHours(film.duration));
	if (film.director !== null) details.push(`Director: ${film.director}`);
	if (film.BBFC !== null) details.push(`Age rating: ${film.BBFC}`);
	if (film.category !== null) details.push(`Genre: ${film.category}`);
	if (film.storage !== null) details.push(`Storage: ${film.storage}`);
	if (film.format !== null) details.push(`Format: ${film.format}`);
	if (film.notes !== null && film.notes !== undefined) details.push(`Notes: ${film.notes}`);

	const starRating = (film.stars !== null) ? `star-rating stars_${film.stars}` : '';
	const rottenTomReview = film.rtURL !== '' ? <p>Review on <a href={film.rtURL}>Rotten Tomatoes</a></p> : '';
	const filmPoster = film.poster !== '' ? `filmPosters/${film.poster}` : 'posterError.jpg';
	const filmTitle = film.title.split('|').join(',');

	return (
		<details className = 'film'>
			<summary className = {starRating}>
				<div className='film-poster'>
					<img alt={'poster'} src={`/images/${filmPoster}`} />
				</div>
				<div className='film-summary'>
					{`${filmTitle} (${film.year})`}
				</div>
			</summary>
			<div className='film-details'>
				{details.map( (detail, index) => <p key={index}>{detail}</p> )}
				{rottenTomReview}
			</div>
		</details>
	)
}

export default film;