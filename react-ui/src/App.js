import React, { Component } from "react";
import { Route } from 'react-router-dom';
import "./App.css";
import Header from "./components/HeaderComponents/Header";
import Body from "./components/BodyComponents/Body";
import Footer from "./components/FooterComponents/Footer";
import TestComponent from './components/TestComponent'
// import LineChart from "./components/GraphComponents/LineChart";
import dotenv from 'dotenv'
dotenv.config()



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };

    const realError = console.error;

    console.error = (...x) => {
      // console.log(`error: ${x[0]}`)
      // debugger;
      if (x[0] === 'Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.') {
        console.log('supressing warning for text')
        return;
      }
      if (x[0] === "Warning: The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.%s") {
        // console.log('supressing warning for span and text')
        return;
      }
      //                     The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
      realError(...x);
    }
  }
  componentDidMount() {
    fetch("/")
      .then(response => {
        // console.log(`did mount response ${response.status}`)
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      })
      .catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Route
          exact path="/"
          render={props =>
            (<div>
              <Header />
              <Body />
              <Footer />
            </div>)
          }
        />
        <Route
          exact path="/test"
          render={props => <TestComponent />}
        />
      </div>
    );
  }
}

export default App;
