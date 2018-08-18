import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map( osa => <Osa osa={osa} />)}
        </div>
    )
}

const Yhteensa = (props) => {
    var summa = 0;
    for(var i=0; i < props.osat.length; i++)
    {
        summa += props.osat[i].tehtavia
    }
    
    return (        
        <p>yhteensä {summa} tehtävää</p>
    )
}


const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]

  return (
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto osat={osat} />
        <Yhteensa osat={osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)