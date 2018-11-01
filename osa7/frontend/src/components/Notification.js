import React from 'react'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'
import { Message } from 'semantic-ui-react'

const hideStyle = {
  display: 'none'
}

class Notification extends React.Component {
  render() {
    return (
      <Message negative={this.props.type === 'error'} positive={this.props.type === 'success'} style={this.props.text.length === 0 ? hideStyle : {}} >
        {this.props.text }
      </Message>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.notification.text,
    type: state.notification.type
  }
}


export default connect(mapStateToProps, {notify})(Notification)
