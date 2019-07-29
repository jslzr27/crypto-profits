import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Results from './Results';
import moment from 'moment';
import axios from 'axios';

class Layout extends Component {
	constructor() {
		super();

		this.state = {
			location: 'home',
			date: moment(),
			data: '',
			cryptoAmount: 1,
			status: '',
			totalStatus: ''
		};

		this.routingSystem = this.routingSystem.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.checkProfits = this.checkProfits.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	componentWillMount() {
		const self = this;
		axios
			.get(
				`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=${moment().unix()}&extraParams=crypto_profits_js`
			)
			.then(function(response) {
				self.setState(
					{
						btcToday: response.data.BTC
					},
					() => {
						console.log(self.state);
					}
				);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	routingSystem() {
		switch (this.state.location) {
			case 'home':
				return (
					<Home
						handleDateChange={this.handleDateChange}
						globalState={this.state}
						onInputChange={this.onInputChange}
						checkProfits={this.checkProfits}
					/>
				);
			case 'results':
				return <Results globalState={this.state} />;
			default:
				return <Home />;
		}
	}

	handleDateChange(date) {
		this.setState(
			{
				date: date
			},
			() => console.log(this.state.date.unix())
		);
	}

	onInputChange(event) {
		this.setState({
			cryptoAmount: event.target.value
		});
	}

	checkProfits() {
		var self = this;
		axios
			.get(
				`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=${self.state.date.unix()}&extraParams=crypto_profits_js`
			)
			.then(function(response) {
				self.setState(
					{
						data: response.data.BTC
					},
					() => {
						console.log(self.state);
						const CP = self.state.data.USD;
						let newCP = self.state.cryptoAmount * 100;
						newCP = (newCP * CP) / 100;
						const SP = self.state.btcToday.USD;
						let newSP = self.state.cryptoAmount * 100;
						newSP = (newSP * SP) / 100;

						if (newCP < newSP) {
							let gain = newSP - newCP;
							let gainPercent = (gain / newCP) * 100;
							gainPercent = gainPercent.toFixed(2);
							console.log(
								`${self.state.cryptoAmount} bitcoin newSP: ${newSP}, SP: ${SP}, newCP: ${newCP}, CP: ${CP}`
							);
							//set state with totals and change location
							self.setState(
								{
									location: 'results',
									status: 'gain',
									totalStatus: {
										newCP: newCP.toFixed(2),
										CP: CP,
										newSP: newSP.toFixed(2),
										SP: SP,
										percent: gainPercent
									}
								},
								() => console.log(self.state)
							);
						} else {
							let loss = newCP - newSP;
							let lossPercent = (loss / newCP) * 100;
							lossPercent = lossPercent.toFixed(2);
							console.log(`loss percent is ${lossPercent}`);
							//set state with totals and change location
							self.setState(
								{
									location: 'results',
									status: 'loss',
									totalStatus: {
										newCP: newCP.toFixed(2),
										CP: CP,
										newSP: newSP.toFixed(2),
										SP: SP,
										percent: lossPercent
									}
								},
								() => console.log(self.state)
							);
						}
					}
				);
			});
	}

	goBack() {
		this.setState({
			location: 'home',
			date: moment(),
			data: '',
			cryptoAmount: 1,
			status: '',
			totalStatus: ''
		});
	}

	render() {
		return (
			<div className="home">
				<div className="container">
					<header>
						<div className="logo">Crypto Profits</div>

						<nav className="menu">
							<a href="#" className="main-btn">
								Register
							</a>
						</nav>
					</header>

					{this.routingSystem()}
				</div>
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);
