import React from 'react';
import FilterOption from './filterOption/filterOption';

const filterList = (props) => {
	// console.log(props.filters, props.ageFilterValues)

	return (
		<div className='filterList'>
			{props.filters.map( (f, i) =>  <FilterOption key={`filter_${i}`} 
																				click={props.click}
																				label={f.label}
																				type={f.type}
																				searchField={f.searchField} />  )}
		</div>
	)
}

export default filterList;