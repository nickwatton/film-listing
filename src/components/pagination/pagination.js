import React from 'react';

const pagination = (props) => {
	return (
		<div>{`page ${props.page} of ${props.pageMax} (${props.numFilms} films)`}</div>
	)
}

export default pagination;