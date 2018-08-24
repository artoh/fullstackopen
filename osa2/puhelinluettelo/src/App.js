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


const Viesti = ({viesti}) => {
  console.log("Viesti " + viesti)  
  if( viesti != null )
  {
    return(
      <div className="viesti">
        {viesti}
      </div>
    )
  }
  else
  {
    return (
      <div></div>
    )
  }
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
      suodatus: '',
      viesti: null
    }
  }

  lisaaHenkilo = (event) => {
    event.preventDefault()
    
    if( this.state.persons.some( (henkilo) => henkilo.name === this.state.newName )  )
    {
      const henkilo = this.state.persons.find(henkilo => henkilo.name === this.state.newName)
      if( window.confirm(henkilo.name + " on jo luettelossa, korvataanko vanha numero uudella?") )
      {
        henkilo.number = this.state.newPhone;
        const henkilot = this.state.persons.filter( hlo => hlo.id !== henkilo.id)        

        personService
          .paivita(henkilo)
          .then( paivitetty => {
            this.setState({
              persons: henkilot.concat(paivitetty),
              newName : '',
              newPhone : '',
              viesti: 'päivitettiin ' + paivitetty.name
            })
            setTimeout(() => this.setState({viesti : null}), 5000)
          } )
          .catch(error => {
            // Henkilön tiedot on jo poistettu
            // Lisätään henkilö uudelleen palvelimelle
            console.log(henkilo.name + " ehdittiin jo poistaa")
            const uusihenkilo = { name: this.state.newName, number: this.state.newPhone }
            
            personService
            .create(uusihenkilo)
            .then( uusihenkilo => { 
              this.setState({
                persons: henkilot.concat(uusihenkilo),
                newName: '',
                newPhone: '',
                viesti: 'palautettiin ' + uusihenkilo.name
              })    
              setTimeout(() => this.setState({viesti : null}), 5000)
            })            
          })
      }
      else
      {
        this.setState( {newName: '', newPhone: ''})     
      }
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
            newPhone: '',
            viesti: 'lisättiin ' + uusihenkilo.name
          })   
          setTimeout(() => this.setState({viesti : null}), 5000) 
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
              this.setState({persons: henkilot, viesti: 'poistettiin ' + henkilo.name})
              setTimeout(() => this.setState({viesti : null}), 5000)
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
        <Viesti viesti={this.state.viesti} />
        <div>
          rajaa näytettäviä <input value={this.state.suodatus} onChange={this.handleFilter} />
        </div>
        <form onSubmit={this.lisaaHenkilo}>
          <div>
            <h2>Lisää uusi / muuta olemassaolevaa numeroa</h2>
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
