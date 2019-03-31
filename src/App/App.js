import React, { Component } from 'react';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import './App.css';
import CONST from '../Helpers/Contants';

class App extends Component {
  constructor(){
    super();
    this.state= {
      route : CONST.NAV.ABOUT
    }
  }
  render() {
    return (
      <div className="personal-profile">
        <Nav route={this.state.route} setRoute={this.setRoute.bind(this)} />
        <Main route={this.state.route}/>
        <Footer/>
      </div>
    );
  }
  setRoute(route) {
    this.setState({
      route : route
    });
  }
}

export default App;
