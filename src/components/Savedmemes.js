import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './image.css';
import Base64String  from 'lz-string';
import {Button, Spinner} from 'react-bootstrap';
// import Promise from 'promise';
// var Promise = require('promise');
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

            console.log("whatwhat");
            console.log(typeof token);
            if(token){
                  console.log("whatwhat");
                  const user = axios.create({
                        baseURL: 'http://localhost:4000/users/memes',
                        timeout: 10000,
                        headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}

                  });
                  this.loading = true;
                  user.get()
                        .then(response => {
                        // console.log(response.data.memes[0].meme_url);
                        // console.log(Base64String.compress(response.data.memes[0].meme_url));
                        // console.log(Base64String.decompressFromUTF16(response.data.memes[0].meme_url));
                        // response.data.memes.map(savedmeme => Base64String.decompressFromUTF16(savedmeme.meme_url));
                        this.setState({savedmemes: response.data.memes});
                        // this.state.savedmemes.forEach(me => console.log(me.meme_url));
                        // const promises = response.data.memes.map(savedmeme => Base64String.decompress(savedmeme.meme_url));
                        // console.log(Base64String.decompress(response.data.memes[0]));
                        // const promises = this.setState({savedmemes: [...this.state.savedmemes.map(async savedmeme => await Base64String.decompress(savedmeme.meme_url)
                        // ({
                        //       meme_url:  function(){Base64String.decompress(savedmeme.meme_url)
                        //       console.log(Base64String.decompress(savedmeme.meme_url));},
                        //       meme_id: savedmeme.meme_id,
                        // })
                               // )]});
                        this.loading = false;
                        this.setState({savedmemes: [...this.state.savedmemes.map(savedmeme => Base64String.decompressFromUTF16(savedmeme.meme_url))]});

                        console.log("wekljrjkhwerkjhewrjkhwejkrhekwjrkjwehrkj");
                        // this.setState({savedmemes: [...this.state.savedmemes.forEach(savedmeme => console.log(Base64String.decompress(savedmeme.meme_url)))]});
                        // Promise.all(promises)
                        //       .then(response =>
                        //       {
                        //             this.setState({savedmemes: response});
                        //             console.log(response);
                        //       })
                        //       .catch(e =>{
                        //                   console.log(e);
                        //       });

                        // this.setState({savedmemes: await Promise.all(promises)});
//                         this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url !== undefined)]});
//                         this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url.length > 20)]});
// console.log(this.state.savedmemes);




                  })
                        .catch(error =>{
                              this.props.logout();
                              console.log(error);
                        })
            }

//
//              axios.post('http://localhost:4000/users/adduser', newUser, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
// }).then(res => {console.log(res);}).catch(function(error){
//                         console.log(error.response);
//                   });
            // axios.get('http://localhost:4000/users/')
            //       .then(response => {
            //             console.log(response);
            //       })
            //       .catch(function(error){
            //             console.log(error);
            //       })
//             if(token){
//                   this.setState({loggedin: true});
//                   const user = axios.create({
//                         baseURL: 'http://localhost:4000/users/meme',
//                         timeout: 1000,
//                         headers: {'Content-Type': 'application/json', 'Authorization': token}
//
//                   });
//                   user.get()
//                         .then(response => {
//                               this.setState({savedmemes: response.data.memes})
//                               this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url !== undefined)]})
//                               this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url.length > 20)]})
// console.log(response.data.memes);
//                         })
//                         .catch(function(error){
//                               console.log(error);
//                         })
//
//
//
//             }
            // axios.get('http://localhost:4000/memes/')
            //       .then(response => {
            //             this.setState({savedmemes: response.data})
            //             this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url !== undefined)]})
            //             this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url.length > 20)]})
            //
            //       })
            //       .catch(function(error){
            //             console.log(error);
            //       })
            // axios.get('http://localhost:4000/memes/users')
            //       .then(response => {
            //             console.log("response.data");
            //             console.log(response.data);
            //
            //       })
            //       .catch(function(error){
            //             console.log(error);
            //       })
            // let arr = JSON.parse(localStorage.getItem('strs'));
            // const newMeme =
            // {
            //       meme_url: '',
            //       meme_id: 12
            // }
            // let strs = [(typeof newMeme)];
            // arr.map(ar => strs.push({
            //       meme_url: ar,
            //       meme_id: 12
            // }));
            // console.log(typeof strs);
            // console.log(strs);
            // strs.map(str => this.setState({savedmemes: [...this.state.savedmemes, str]}));
            // this.state.savedmemes.map(saved => {console.log(saved);});

      }

      render () {
            // this.setState({savedmemes: Base64String.decompress(this.setState.savedmemes)});
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
// <div>
// <div>
//       {smemes.map((smeme) =>
//       <img src={smeme.meme_url}></img>)}
//
// </div>
// <button className="btn-container"  ><Link to={`/login/`} >Home</Link></button>
// </div>
