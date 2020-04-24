import React from 'react';

const header = (props) => {

	const navBlock = (props.linkCopy === 'LISTING') ?
						<p>About this site</p> :
						<p>Film listings</p>
	return(
		<div className="header">
			<h1>Film listing</h1>
			<div className='pointer' onClick = {props.click} >{ navBlock }</div>
		</div>
	)

}

export default header;