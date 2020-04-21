import React from 'react';

const selectList = (props) => {
	return(
		<div className='filterUI'>

			<div className='inputElement'>
				<label htmlFor = 'selectList'>Select: </label>
				<select id = 'selectList'
								onChange = { (evt) => props.change(evt, props.stateObject) }>
					<option key={'-1'} value={null}>None</option>
					{props.options.map( (f, i) => <option key={`option${i}`} value={`${f.ageValue}`}>
																					{f.id}
																				</option> )}
				</select>
			</div>
		</div>
	)
}

export default selectList;