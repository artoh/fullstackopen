import React from 'react';
import axios from 'axios'


const Henkilo = ({henkilo}) => {
  return(
    <tr>
      <td>{henkilo.name}</td>
      <td>{henkilo.number}</td>
    </tr>
  )
}


const Luettelo = ({henkilot}) => {
  return(
    <table>
      <tbody>
        { henkilot.map( henkilo => <Henkilo henkilo={henkilo} key={henkilo.name} />)}
      </tbody>
    </table>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '045-3235235' }
      ],
      newName: '',
      newPhone: '',
      suodatus: ''
    }
  }

  lisaaHenkilo = (event) => {
    event.preventDefault()
    if( this.state.persons.some( (henkilo) => henkilo.name === this.state.newName )  )
    {
      window.alert("Henkilö on jo luettelossa!") 
      this.setState( {newName: '', newPhone: ''})     
    }
    else
    {
      const uusihenkilo = { name: this.state.newName, number: this.state.newPhone }
      const henkilot = this.state.persons.concat(uusihenkilo)
      this.setState({
        persons: henkilot,
        newName: '',
        newPhone: ''
      })
      console.log("Uusi henkilö ", uusihenkilo.name)
    }
  }

  handleNameChange = (event) => {
    console.log("Uusi nimi ", event.target.value)
    this.setState({newName: event.target.value})
  }

  handlePhoneChange = (event) => {
    this.setState({newPhone: event.target.value})
  }

  handleFilter = (event) => {
    this.setState({suodatus: event.target.value})
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get("http://localhost:3008/persons")
      .then(response => {
        console.log("Vastaus tuli")
        this.setState({persons: response.data})
      })
  }

  render() {


    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä <input value={this.state.suodatus} onChange={this.handleFilter} />
        </div>
        <form onSubmit={this.lisaaHenkilo}>
          <div>
            <h2>Lisää uusi</h2>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/><br/>
            numero: <input value={this.state.newPhone} onChange={this.handlePhoneChange} />
          </div>
          
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <Luettelo henkilot={this.state.persons.filter( henkilo => henkilo.name.toLowerCase().indexOf( this.state.suodatus.toLowerCase() ) > -1 ) } />        
      </div>
    )
  }
}

export default App;
