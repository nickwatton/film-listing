import React, { Fragment } from 'react';

const aboutPage = (props) => {

	return (
		<Fragment>
			<h2>About this site</h2>
			<h3>It's a learning thing.</h3>

			<p>This is a listing of my film collection. There are some crackers as well as some stinkers here. Please don't judge me.<br />
			I have the data in a JSON object, and I use this when learning new technologies.</p>

			<p>The first version was made in Flash (AS2), and was converted to AS3 as I learnt OOP.< br />
			Then Flash died and I rewrote it again with vanilla JavaScript, and now this itertion uses <strong>React</strong>.</p>

			<p>I am using a root container with all the business logic, together film, film listing, multiple filter UI, header, footer and pagination components.<br />
			I have four different filter methods which I have made reusable for various data types.<br />
			The filters and their types are listed in the JSON, together with an age rating mapping which I use to manage UK and USA definitions.</p>
			<p>Duration, Year and Star ratings all share a min/max range slider component and filter method.<br />Age ratings could have shared this but I wanted to make a selectlist component which would set a maximum value - thus all films show up to and including a particular BBFC rating.<br />
			Genre is treated slightly differently, using a simpler selectlist component, filtering to a single genre.<br />
			Director and Titles share a text input, which filters on change as the user types, with a datalist to prompt the search.<br />
			All datalist contents are, of course, generated from the source data.</p>

			<p>The keen eyed will notice I'm not that concerned about the design at this point...</p>

			<p>You can check the <a href='https://github.com/nickwatton/film-listing'>source on github</a>.</p>
		</Fragment>
	)

}

export default aboutPage;