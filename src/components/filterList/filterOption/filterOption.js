import React from 'react';

const filterOption = (props) => {
	// console.log(props)
	return (
		<div className='filterOption' onClick={() => props.click(props.type)}>{props.label}</div>
	)
}

export default filterOption;