import React from 'react';

const pagination = (props) => {
	let prevBtn = props.page > 0 ?
									<button onClick = {() => props.click(-1)} >prev</button> :
									<button disabled>prev</button>;

	let nextBtn = props.page+1 < props.pageMax ?
									<button onClick = {() => props.click(1)} >next</button> :
									<button disabled >next</button>;

	return (
		<div className='pagination'>
			{ prevBtn }
			{`page ${props.page + 1} of ${props.pageMax} (${props.numFilms} films)`}
			{ nextBtn }
		</div>
	)
}

export default pagination;