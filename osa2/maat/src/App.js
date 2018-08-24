import React, { Component } from 'react';
import axios from 'axios'


const Maa = ({maa}) => (
  <div>
    <h2>Nimi {maa.name} {maa.nativeName}</h2>
    <p>capital: {maa.capital}</p>
    <p>population: {maa.population}</p>
    <img src={maa.flag} />
  </div>
)


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      maat: [],
      suodatin : ''
    }
  }

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then( response => {
        this.setState({maat:response.data})
      })
  }

  handleSuodatusChange = (event) => {    
    this.setState({suodatin:event.target.value})
  }

  naytaMaa = (nimi => {
    return () => {
      this.setState({suodatin: nimi})
    }
  })

  render() {

    const suodatettu = this.state.maat.filter( maa =>  maa.name.toLowerCase().indexOf( this.state.suodatin.toLowerCase()  ) > -1 )

    return (
      <div className="App">
        <div>
          find countries: <input value={this.state.suodatin} onChange={this.handleSuodatusChange} />
        </div>  
        { suodatettu.length > 0 && suodatettu.length < 10 &&       
          <ul>
            { suodatettu.map( maa => <li key={maa.name} onClick={this.naytaMaa(maa.name)}>{maa.name}</li> )}
          </ul>        
        }
        { suodatettu.length > 10 && <p>too many maches, specify another filter</p> }
        { suodatettu.length == 1 && <Maa maa={suodatettu[0]} />}
      </div>
    );
  }
}

export default App;
