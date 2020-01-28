import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './image.css';


class Text extends Component {
      state = {
            text:
                  {
                        string: this.props.text.string,
                        xloc: this.props.text.xloc,
                        yloc: this.props.text.yloc,
                        id: this.props.text.id,
                  }
      }

      changeloc = (e) => {
            console.log(e);
            console.log("change!!!");
            this.setState({text:{
            string: this.props.text.string,
            xloc: e.clientX,
            yloc: e.clientY,
            id: this.props.text.id,
            }});
      }

      render () {




            return <text x={this.state.xloc} y={this.state.yloc} onMouseDown={event => this.changeloc(event)} onMouseUp={event => this.changeloc(event)} style={txtStyle}>{this.state.text.string}</text>

      }
}

Text.proTypes = {
      text: PropTypes.object.isRequired
}
const txtStyle = {
      color: '#fff',
      fontSize:'40px',
}
export default Text;
