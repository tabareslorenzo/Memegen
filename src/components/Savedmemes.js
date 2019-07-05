import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Savedmemes extends Component {
      constructor(props) {
      super(props);
      this.state = {savedmemes: [],
      loggedin: false};
      }
      componentDidMount(){
            var token = localStorage.getItem('token');
            token = token.substring(6, token.length);

            console.log("whatwhat");
            console.log(typeof token);
            if(token){
                  console.log("whatwhat");
                  const user = axios.create({
                        baseURL: 'http://localhost:4000/users/meme',
                        timeout: 1000,
                        headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}

                  });
                  user.get()
                        .then(response => {this.setState({savedmemes: response.data.memes});
                        this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url !== undefined)]});
                        this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url.length > 20)]});
console.log(this.state.savedmemes);})
                        .catch(function(error){
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
            var smemes = this.state.savedmemes;
            if(this.props.isloggedin){
                  return <p>log in</p>
            }
            return(smemes.map((smeme) => <img src={smeme.meme_url}></img>));

      }
}

Savedmemes.proTypes = {
      savedmemes: PropTypes.array.isRequired
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
