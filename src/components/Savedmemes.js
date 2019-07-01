import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Savedmemes extends Component {
      constructor(props) {
      super(props);
      this.state = {savedmemes: []};
      }
      componentDidMount(){
            axios.get('http://localhost:4000/memes/')
                  .then(response => {
                        this.setState({savedmemes: response.data})
                        this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url !== undefined)]})
                        this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url.length > 20)]})

                  })
                  .catch(function(error){
                        console.log(error);
                  })
      }
      render () {
            var smemes = this.state.savedmemes;

            return( smemes.map((smeme) =>
                  <img src={smeme.meme_url}></img>
            ));

      }
}

Savedmemes.proTypes = {
      savedmemes: PropTypes.array.isRequired
}


export default Savedmemes;
