import React from 'react'
import PropTypes from 'prop-types'

class Addtext extends React.Component {
      state = {
            text:
                  {
                        string:'',
                        xloc: 0,
                        yloc: 0,
                        id:0,
                        mving:false,
                  }
      }
      onSubmit = (e) => {
            e.preventDefault();
            this.state.text.id = this.state.text.id+1;
            this.props.addtext(this.state.text);
            //console.log(this.state.text);
            this.setState({text:
                  {
                        string: '',
                        xloc: 0,
                        yloc: 0,
                        id: this.state.text.id,
                  }});
      }
      onChange = (e) => this.setState({text:
            {
                  string: e.target.value,
                  xloc: 150,
                  yloc: 200,
                  id: this.state.text.id,

            }});
      render(){
            return(
            <form onSubmit={this.onSubmit}>
                  <input
                  type="text"
                  name="text"
                  placeholder="Add text"
                  value={this.state.text.string}
                  onChange={this.onChange}
                  />
                  <input
                  type="submit"
                  name="Submit"
                  placeholder="Add text"
                  value={this.state.text.string}
                  onChange={this.onChange}
                  />
            </form>
      );
      }
}
//PropTypes
Addtext.proTypes = {
      text: PropTypes.object.isRequired
}
export default Addtext;
