import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect} from 'react-router-dom'
import { Container, Table, Grid, Image, Form, Button, Message, Menu, Divider, Flag, Icon } from 'semantic-ui-react'

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      has {anecdote.votes} votes
    </div>
  )
}

const menustyle = {
  backgroundColor : 'darkCyan',
  padding: '10px 10px 10px 10px',
  textDecoration: 'none'
}

const itemstyle = {
  textDecoration: 'none',
  padding: '10px 10px 10px 10px',
  color: 'black'
}

const activestyle = {
  backgroundColor: 'green',
  padding: '14px 14px 14px 14px',
  textDecoration: 'none',
  color: 'white'
}

const MyMenu = () => (
  <Menu pointing secondary>
    <Menu.Item as={ NavLink } name='/' to='/' exact>anecdotes</Menu.Item>
    <Menu.Item as={ NavLink } name='/create' to='/create'>create new</Menu.Item>
    <Menu.Item as={ NavLink } name='/about' to='/about'>about</Menu.Item>
  </Menu>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table celled size='large'>
    <Table.Body>      
          {anecdotes.map(anecdote => 
            <Table.Row key={anecdote.id} >
             <Table.Cell>
               <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </Table.Cell>
            </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
      <Grid>
        <Grid.Column width={10}>

          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={6}>
         <Image src='turing.jpg' />
        </Grid.Column>
      </Grid>
  </div>
)

const Footer = () => (
  <Container>
    <Divider />
    <Flag name='fi' />
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>. &nbsp;

    <Icon name='github' />
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </Container>
)

const notificationStyle = {
  border: "2px solid lightGreen",
  borderRadius: "5px",
  padding: "8px 8px 8px 8px",
  width: "auto",
  color: "green",
  topMargin: 15,
  bottomMargin: 15
}

const hideStyle = {
  display: 'none'
}

const Notification = ({text}) => (
  <div style={text.length > 0 ? notificationStyle : hideStyle}>
    {text} 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      redirect : false
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({redirect: true})
    
  }

  render() {
    if( this.state.redirect) {
      return (<Redirect to='/'/>)
    } else {

      return(
        <div>
          <h2>create a new anecdote</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>content</label>
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>author</label>
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>url for more info</label>
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </Form.Field> 
            <Button type='submit'>create</Button>
          </Form>

        </div>  
      )

    }
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new notification '${anecdote.content}' created` })
    setTimeout( () => this.setState({notification:''}), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <MyMenu />
              {( this.state.notification && <Message success>{this.state.notification}</Message>)}
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={() => <CreateNew addNew={this.addNew} /> } />     
              <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} /> }
              />
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
