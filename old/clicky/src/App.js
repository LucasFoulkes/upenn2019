import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Cartoon from "./components/Cartoon";
import cartoons from "./cartoons.json";
import Jumbotron from "./components/Jumbotron";

class App extends Component {
  state = {
    cartoons,
    counter: 0,
    selected: [],
    highCount: 0,
  };


  clicked = (id) => {
    const array = this.state.selected

    if (array.indexOf(id) !== -1) {
      if (this.state.highCount < this.state.counter){
        this.setState({highCount: this.state.counter})
      }
      this.setState({
        counter: 0,
        selected: []
      })
    }
    else {
      this.setState({ selected: array.concat(id) })
      this.setState({ counter: this.state.counter + 1 })
    }
  };


  render() {
    return (
      <div>
        <Navbar counter={this.state.counter} high={this.state.highCount} />
        <Jumbotron counter={this.state.counter}/>
        <Wrapper>
          {
            this.state.cartoons.sort(() => Math.random() - 0.5).map(item => (
              <Cartoon
                clicked={this.clicked}
                id={item.id}
                key={item.id}
                image={item.image}
              />
            ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;