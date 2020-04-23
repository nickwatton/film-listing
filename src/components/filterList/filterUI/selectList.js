import React from 'react';

const selectList = (props) => {

	return(
		<div className='filterUI'>

			<div className='inputElement'>

				<label htmlFor = 'selectList'>Select: </label>
				<select id = 'selectList' 
								onChange = { (evt) => props.change(evt, props.stateObject) }>
					<option key={'-1'} value={'none'}>none</option>
					{props.options.map( (f, i) => <option key={`option${i}`} value={`${f}`}>
																					{f}
																				</option> )}
				</select>

			</div>

		</div>
	)
}

export default selectList;