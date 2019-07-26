import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Results from './Results';

class Layout extends Component {
	render() {
		return (
			<div className="home">
				<div className="container">
					<header>
						<div className="logo" onClick={this.checkProfits}>
							Crypto Profits
						</div>

						<nav className="menu">
							<a href="#" className="main-btn">
								Register
							</a>
						</nav>
					</header>
					{/* <Home /> */}
					<Results />
				</div>
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);
