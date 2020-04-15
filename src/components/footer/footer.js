import React, { Fragment } from 'react';

const footer = (props) =>{
	return(
		<Fragment>
			<div className='clearfix' />
			<div className='footer'>
				&copy; {props.year} Nick Watton
			</div>
		</Fragment>
	)

}

export default footer;