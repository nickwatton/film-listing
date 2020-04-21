import React from 'react';
import FilterOption from './filterOption/filterOption';

const filterList = (props) => {
	// console.log(props.filters, props.ageFilterValues)

	return (
		<div className='filterList'>
			{props.filters.map( (f, i) => (f.active) ? <FilterOption key={`filter_${i}`} 
																				filterClick={props.filterClick}
																				activeFilter={props.activeFilter}
																				label={f.label}
																				type={f.type} /> : '' )}
		</div>
	)
}

export default filterList;