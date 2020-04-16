import React from 'react';

const minMax = (props) => {
	return(
		<div className='filterUI'>

			<div className='inputElement'>
				<input id='rangeMin' type='range' 
								onChange = { props.changeMin }
								min = {props.minMax.min} 
								max = {props.minMax.max}
								value = {props.minMax.currMin}/>
				<span id='minValue'>{props.minMax.currMin}</span>
			</div>

			<div className='inputElement'>
				<input id='rangeMax' type='range' 
								onChange = { props.changeMax }
								min = {props.minMax.min} 
								max = {props.minMax.max}
								value = {props.minMax.currMax}/>
				<span id='minValue'>{props.minMax.currMax}</span>
			</div>

			<p className='error'>{props.minMax.error}</p>

		</div>
	)
}

export default minMax;