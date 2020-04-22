import React from 'react';

const pagination = (props) => {
	let prevBtn = props.page > 0 ?
									<button onClick = {() => props.click(-1)} >prev</button> :
									<button disabled>prev</button>;

	let nextBtn = props.page+1 < props.pageMax ?
									<button onClick = {() => props.click(1)} >next</button> :
									<button disabled >next</button>;

	let filmCopy = props.numFilms === 1 ? 'film' : 'films';

	return (
		<div className='pagination'>
			{ prevBtn }
			{`page ${props.page + 1} of ${props.pageMax} (${props.numFilms} ${filmCopy})`}
			{ nextBtn }
		</div>
	)
}

export default pagination;