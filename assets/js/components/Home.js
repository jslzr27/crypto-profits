import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';

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
						<input
							type="text"
							name="amount"
							onChange={this.props.onInputChange}
							value={this.props.globalState.cryptoAmount}
						></input>

						<label>Date</label>
						<DatePicker
							selected={this.props.globalState.date}
							onChange={this.props.handleDateChange}
						/>

						<button type="submit" onClick={this.props.checkProfits}>
							Check Profits
						</button>
					</div>
				</div>
			</section>
		);
	}
}
