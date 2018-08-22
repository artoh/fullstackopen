import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>        
)


const Statistic = ({otsikko, arvo}) => (
    <tr><td>{otsikko}</td><td>{arvo}</td></tr>
)

const Statistiscs = ({tila}) => {
    if( tila.hyva === 0 && tila.neutraali === 0 && tila.huono === 0)
    {
        return (<p>ei yhtään palautetta annettu</p>);
    }
    return(
        <table>
            <Statistic otsikko="hyvä" arvo={tila.hyva} />
            <Statistic otsikko="neutraali" arvo={tila.neutraali} />
            <Statistic otsikko="huono" arvo={tila.huono} />
            <Statistic otsikko="keskiarvo" arvo={ Math.round( (tila.hyva * 1 + tila.huono * -1) / (tila.hyva + tila.neutraali + tila.huono)*10) / 10} />
            <Statistic otsikko="positiivisia" arvo={"" + Math.round((tila.hyva * 100 / (tila.hyva + tila.neutraali + tila.huono)) * 10) / 10 + " %"} />             
        </table>
    )

}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva : 0,
            neutraali : 0,
            huono : 0
        }        
    }

    lisaaPalaute = (palaute => {
        return () => {
            let uusi = this.state
            uusi[palaute] = uusi[palaute] + 1
            this.setState( uusi );
        }
    })

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button 
                    handleClick={this.lisaaPalaute("hyva")}
                    text="hyvä"
                />
                <Button 
                    handleClick={this.lisaaPalaute("neutraali")}
                    text="neutraali"
                />
                <Button 
                    handleClick={this.lisaaPalaute("huono")}
                    text="huono"
                />
                
                <h2>statistiikka</h2>
                <Statistiscs tila={this.state} />
            </div>
        )
    }
    
}

ReactDOM.render(<App />, document.getElementById("root"))