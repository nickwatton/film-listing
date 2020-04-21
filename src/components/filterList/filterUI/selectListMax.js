import React from 'react';

const selectListMax = (props) => {
	return(
		<div className='filterUI'>

			<div className='inputElement'>
				<label htmlFor = 'selectListMax'>Select max: </label>
				<select id = 'selectListMax'
								onChange = { (evt) => props.change(evt, props.stateObject) }>
					<option key={'-1'} value={-1}>None</option>
					{props.options.map( (f, i) => <option key={`option${i}`} value={`${f.ageValue}`}>
																					{f.id}
																				</option> )}
				</select>
			</div>
		</div>
	)
}

export default selectListMax;