import React from 'react'
import { connect } from 'react-redux'
import { notify, clear } from './../reducers/notificationReducer'

class Notification extends React.Component {
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }

        console.log( this.props.notification )

        return (
            <div style={style}>
                {this.props.notification }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps, {notify, clear})(Notification)

export default ConnectedNotification
