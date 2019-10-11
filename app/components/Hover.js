import React from 'react'

export default class Hover extends React.Component {
    state = { hovering: false }
    mouseOver = () => {
        this.setState({
            hoving: true
        })
    }
    mouseOut = () => {
        this.setState({
            hovering: false
        })
    }
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}