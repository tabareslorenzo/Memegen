import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './image.css';
import Base64String  from 'lz-string';
import {Button, Spinner} from 'react-bootstrap';

class Savedmemes extends Component {
      constructor(props) {
      super(props);
      this.state = {savedmemes: [],
      loggedin: false};
      }
      componentDidMount(){
            var token = localStorage.getItem('token');
            if(token != null)
            {
                  token = token.substring(6, token.length);
            }

            if(token){
                  const user = axios.create({
                        baseURL: 'http://localhost:4000/users/memes',
                        timeout: 10000,
                        headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}

                  });
                  this.loading = true;
                  user.get()
                        .then(response => {

                        this.setState({savedmemes: response.data.memes});

                        this.loading = false;
                        this.setState({savedmemes: [...this.state.savedmemes.map(savedmeme => Base64String.decompressFromUTF16(savedmeme.meme_url))]});

                  })
                        .catch(error =>{
                              this.props.logout();
                              console.log(error);
                        })
            }

      }

      render () {
            var smemes = this.state.savedmemes;
            if(this.props.isloggedin){
                  return <p>log in</p>
            }
            else if(this.loading)
            {
                  return(
                        <div className="loading">
                              <Button variant="dark" size="lg" disabled>
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                            <h3>Loading...</h3>
                              </Button>
                        </div>
                  );
            }
            return(

                  smemes.map((smeme) => <img className="savedMemes" style={savedStyle} src={smeme}></img>)

            );

      }
}
var loading;
Savedmemes.proTypes = {
      savedmemes: PropTypes.array.isRequired
}
const savedStyle={

      justifyContent: 'center'

}


export default Savedmemes;
