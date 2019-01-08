import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SummaryContainer from './SummaryContainer';
import BreakdownContainer from './BreakDownContainer';
import PlantBreakdown from './PlantBreakdown';
import Legend from './Legend.jsx';
import SunburstGraph from './SunburstGraph';
import EnergyMap from './EnergyMap';
import Disclaimer from './Disclaimer';
import Modal from './Modal';


class App extends Component {
  constructor() {
    super();
    this.state = {
      energytype: "GAS"
    };
  }
  // When component mounts call the Api and send response to the client
  componentDidMount() {
    this.callApi()
      .then(res =>
        this.setState(function() {
          return res.express;
        })
      )
      .catch(err => console.log(err));
  }
  // Fetch data from the backend served at localhost:5000
  async callApi() {
    const response = await fetch("http://localhost:5000/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  handleClick = event => {
    this.setState({
      energytype: event.currentTarget.id
    });
  };

  setModal = modalData => this.setState({ modalData });
  setDirections = () => this.setState({ directionsModal: !this.state.directionsModal });
  setInformation = () => this.setState({ informationModal: !this.state.informationModal });

  closeModal = () => this.setState({ modalData: undefined , directionsModal: false})
  
  render() {
    console.log(this.state);
    if (!this.state[0]) return <p>{this.state.response}</p>;
    return (
      <div>
        <div>
          <Header date={this.state[0]}
                  setModalData={this.setInformation}/>
        </div>
        <div className="content-wrapper">
          <SummaryContainer summary={this.state[1]} />
          <BreakdownContainer
            generation={this.state[2]}
            button={this.handleClick}
          />
          <PlantBreakdown
            powerPlants={this.state[3]}
            generation={this.state[2]}
            energytype={this.state.energytype}
            setModalData={this.setModal}
          />
        </div>
        <div className="second-row">
          <SunburstGraph setModalData={this.setDirections} />
          <Legend />
          <EnergyMap />
        </div>
        <Disclaimer />
        <Modal data={this.state.modalData} closeModal={this.closeModal} 
          directionsModal={this.state.directionsModal}
          informationModal={this.state.informationModal}/>
      </div>
    );
  }
}


export default App;



