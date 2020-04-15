import React from 'react';

const filterOption = (props) => {
	return (
		<div className={props.label === props.activeFilter ? 'filterOption active' : 'filterOption'}
					onClick={() => props.filterClick(props.type, props.label)}>
					{props.label}
		</div>
	)
}

export default filterOption;