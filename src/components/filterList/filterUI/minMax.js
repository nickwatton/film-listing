import React from 'react';

const minMax = (props) => {
	return(
		<div className='filterUI'>

			<div className='inputElement'>
				<label htmlFor = 'rangeMin'>Minimum:</label>
				<input id = 'rangeMin' type = 'range' 
								onChange = { (evt) => props.change(evt, props.minMaxStateObject) }
								min = {props.minMax.min} 
								max = {props.minMax.max}
								value = {props.minMax.currMin}/>
				<span id = 'minValue'>{props.minMax.currMin}</span>
			</div>

			<div className='inputElement'>
				<label htmlFor = 'rangeMax'>Maximum:</label>
				<input id = 'rangeMax' type = 'range' 
								onChange = { (evt) => props.change(evt, props.minMaxStateObject) }
								min = {props.minMax.min} 
								max = {props.minMax.max}
								value = {props.minMax.currMax}/>
				<span id = 'minValue'>{props.minMax.currMax}</span>
			</div>

			<div className='inputElement'>
				<label htmlFor = 'filterActive'>Active</label>
				<input id = 'isActive' type = 'checkbox'
								defaultChecked = { props.isActive }
								onClick = { (evt) => props.toggle(evt, props.minMaxStateObject) }></input>
			</div>
			<p className='error'>{props.minMax.error}</p>

		</div>
	)
}

export default minMax;