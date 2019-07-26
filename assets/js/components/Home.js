import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {
	render() {
		return (
			<section id="home">
				<div className="container">
					<div className="col-md-6">
						<img
							src="../../img/bitcoin-logo.png"
							className="bitcoin-logo"
						></img>
					</div>
					<div className="col-md-6">
						<h2>Enter Transaction</h2>

						<label>Amount</label>
						<input type="text" name="amount"></input>

						<label>Date</label>
						<input type="text" name="date"></input>

						<button type="submit">Check Profits</button>
					</div>
				</div>
			</section>
		);
	}
}
