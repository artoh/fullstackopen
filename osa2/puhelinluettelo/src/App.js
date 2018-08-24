import React from 'react';
import personService from "./services/persons"

const Henkilo = ({henkilo, poistaja}) => {
  return(
    <tr>
      <td>{henkilo.name}</td>
      <td>{henkilo.number}</td>
      <td><button onClick={poistaja}>Poista</button></td>
    </tr>
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
      personService
        .create(uusihenkilo)
        .then( uusihenkilo => { 
          const henkilot = this.state.persons.concat(uusihenkilo)
          this.setState({
            persons: henkilot,
            newName: '',
            newPhone: ''
          })    
        })

      console.log("Uusi henkilö ", uusihenkilo.name)
    }
  }

  poistaHenkilo = (henkilo) => {
    return () => {
      if( window.confirm("Poistetaanko " + henkilo.name ))
      {
        personService
          .poista(henkilo.id)
          .then( response => {
            if(response.status === 200)
            {
              const henkilot = this.state.persons.filter( hlo => henkilo.id !== hlo.id)
              this.setState({persons: henkilot})
            }
          })
        }
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

    personService
      .getAll()
      .then(response => {
        console.log("Vastaus tuli")
        this.setState({persons: response})        
      })
      .catch( error => { console.log("Palvelinvirhe")})
  }

  render() {

    const suodatettu = this.state.persons.filter( henkilo => henkilo.name.toLowerCase().indexOf( this.state.suodatus.toLowerCase()  ) > -1  )
    

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
          <table>
            <tbody>
              { suodatettu.map( henkilo => <Henkilo henkilo={henkilo} key={henkilo.name}  poistaja={this.poistaHenkilo(henkilo)}/>)}
            </tbody>
          </table>
      </div>
    )
  }
}

export default App;
