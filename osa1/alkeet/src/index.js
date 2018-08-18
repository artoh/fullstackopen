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
            <Osa osa={props.osa} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.tehtavia} tehtävää</p>
    )
}


const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }

  return (
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto osa={osa1} />
        <Sisalto osa={osa2} />
        <Sisalto osa={osa3} />
        <Yhteensa tehtavia={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)