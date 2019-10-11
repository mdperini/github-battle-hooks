import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default class Loading extends React.Component {
    // state = { content: props.text }
    componentDidMount() {
        // const { speed, text } = this.props
        // const text = 'Loading'
        // const speed = 200
        // this.interval = window.setInterval(() => {
        //     this.setState.content === text + '...'
        //       ? this.setState({ content: text})
        //       : this.setState(({ content }) => ({ content: content = '.'}))
        // }, speed)
    }
    componentWillUnmount() {
        // window.clearInterval(this.interval)
    }
    render() {
        return(
            <p>Loading </p>
            // <p style={styles.content}>
            //     {this.state.content}
            // </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}