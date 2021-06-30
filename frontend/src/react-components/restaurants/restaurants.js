import React from 'react';
import './restaurants.css';

import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Restaurants() {
	return (
		<div>
			<div class="searchBox-custom">
				<Dropdown class="dropdown-custom">
					<Dropdown.Toggle variant="secondary">
						Select Search Type
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href="#/action-1">
							Search by Name
						</Dropdown.Item>
						<Dropdown.Item href="#/action-2">
							Search by Zipcode
						</Dropdown.Item>
						<Dropdown.Item href="#/action-3">
							Search by Cuisine
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Form class="form-custom">
					<Form.Group>
						<Form.Control type="text" placeholder="Type Keyword" />
					</Form.Group>
				</Form>
				<Button class="button-custom" type="submit">
					Search
				</Button>
			</div>
		</div>
	);
}

export default Restaurants;
