import React from 'react';

const textInput = (props) => {
	const dataListOptions = props.options ?
								props.options.map( (opt, i) => <option key={`option${i}`} value={`${opt}`}>
																									{opt}
																								</option> ) : '';

	const inputID = `textInput_${props.searchField}`;

	return(
		<div className='filterUI'>

			<div className='inputElement'>

				<label htmlFor = 'textInput'>Type to search: {props.searchField}</label>
				<input type = 'text' 
								id = { inputID }
								list = 'filterData'
								onChange = { (evt) => props.change(evt, props.stateObject) } />

				<datalist id = 'filterData'>
					{ dataListOptions }
				</datalist>

			</div>

		</div>
	)
}

export default textInput;