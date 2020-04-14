import React from 'react';

const pagination = (props) => {
	return (
		<div>{`page ${props.page} of ${props.pageMax}`}</div>
	)
}

export default pagination;