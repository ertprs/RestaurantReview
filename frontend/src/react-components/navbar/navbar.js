import React from 'react';

import './navbar.css';

function NavBar() {
	return (
		<nav class="navbar navbar-expand navbar-dark navbar-custom">
			<div class="container-fluid container">
				<a class="navbar-brand" href="/">
					HOME
				</a>
				<div
					class="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a
								class="nav-link active"
								aria-current="page"
								href="/about"
							>
								About
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link active"
								aria-current="page"
								href="/restaurants"
							>
								Restaurants
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link active"
								aria-current="page"
								href="/reviews"
							>
								Reviews
							</a>
						</li>
					</ul>
					<ul class="navbar-nav float-right">
						<li class="nav-item">
							<a
								class="nav-link active"
								aria-current="page"
								href="/login"
							>
								Login
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link active"
								aria-current="page"
								href="/register"
							>
								Register
							</a>
						</li>
					</ul>
					{/* <form class="d-flex">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						></input>
						<button class="btn btn-outline-success" type="submit">
							Search
						</button>
					</form> */}
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
