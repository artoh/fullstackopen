import React from 'react'


const Otsikko = ({nimi}) => {
    return (
        <h1>{nimi}</h1>
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
            {props.osat.map( osa => <Osa osa={osa} key={osa.id}/>)}
        </div>
    )
}

const Yhteensa = (props) => {
    const summa = props.osat.reduce( (edellinen, nykyinen) => (edellinen + nykyinen.tehtavia), 0 )
    
    return (        
        <p>yhteensä {summa} tehtävää</p>
    )
}


const Kurssi = ({kurssi}) => {
    return(
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi