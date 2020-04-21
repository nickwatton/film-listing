import React from 'react';

const selectListMax = (props) => {
	const currentObj = props.options.filter((f) => f.ageValue === props.currentValue);
	const defaultLabel = currentObj.length > 0 ? currentObj[0].id : 'None';
	const defaultValue = (props.currentValue === -1) ? -1 : props.currentValue;

	return(
		<div className='filterUI'>

			<div className='inputElement'>
				<label htmlFor = 'selectListMax'>Select max: </label>
				<select id = 'selectListMax'
								onChange = { (evt) => props.change(evt, props.stateObject) }>
					<option key={'-1'} value={defaultValue}>{defaultLabel}</option>
					{props.options.map( (f, i) => <option key={`option${i}`} value={`${f.ageValue}`}>
																					{f.id}
																				</option> )}
				</select>
			</div>
		</div>
	)
}

export default selectListMax;