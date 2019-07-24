import React, {Component}  from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Memes from './components/Memes';
import Create from './components/Create';
import Savedmemes from './components/Savedmemes';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import { Link } from 'react-router-dom';




class App extends Component {
      state = {
            memes:{
                  pics:[],
                  loaded: false,
                  selected: false
            },
            curImage:{
                  url:'',
                  empty:true,
                  texts:[{
                        string:'',
                        xloc: 0,
                        yloc: 0,
                        id:0,
                        mving:false,
                  }]
            },
            savedmemes:[{
                  string:'',
            }],
            loggedin: false
      }
      //<Savedmemes savedmemes={this.state.savedmemes}/>
      addmeme = (str) =>
      {
            const smeme = {
                  string:str,
            }
            this.setState({savedmemes: [...this.state.savedmemes, smeme]});
      }
      selectImg = (curUrl) =>
      {
            this.setState({curImage:
                  {
                        url: curUrl,
                        empty:false,
                        texts:[
                              {
                                    string:'',
                                    xloc: 0,
                                    yloc: 0,
                                    id:0,
                                    mving:false,
                              }
                        ]
                  }
            })
      }
      loggin = () =>
      {
            console.log("what");
            this.setState({loggedin: true});
      }
      componentDidMount()
      {
            fetch('https://api.imgflip.com/get_memes').then(res => res.json()).then(json =>
                  {
                        this.setState({ memes:
                              {
                              pics:  json.data.memes,
                              loaded: true,
                              selected: false,
                              }

                        })
                  })
                  console.log("whatwhat");
                  var token = localStorage.getItem('token');
                  console.log(token);

                  if(token){
                        token = token.substring(6, token.length);

                        console.log("whatwhat");
                        const user = axios.create({
                              baseURL: 'http://localhost:4000/users/meme',
                              timeout: 1000,
                              headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}

                        });
                        user.get()
                              .then(response => {this.loggin();})
                              .catch(function(error){
                                    console.log(error);
                              })
                  }
                  if(token == null)
                  {
                        this.setState({loggedin: false})
                        console.log("yep");
                        console.log(this.state.loggedin);
                  }
      }

      render(){
            var {selected, loaded, pics} = this.state.memes;
            return (
                   <Router>
                        <div className="App">
                           <header className="App-header">

                           </header>
                           <Route exact path="/" render={props => (
                        <React.Fragment>
                              <Create curImage={this.state.curImage} addmeme={this.addmeme} ></Create>
                              <Memes memes={pics} selectImg={this.selectImg} text={this.state.curImage.texts}></Memes>
                        </React.Fragment>
                        )}/>
                  <Route path="/saved" render={props => (
                        <React.Fragment>
                              <Savedmemes savedmemes={this.state.savedmemes}/>
                              <button className="btn-container" ><Link to="/" >Home</Link></button>
                        </React.Fragment>
                        )}/>

                  <Route path="/login" render={props => (
                              <React.Fragment>
                                    <Login loggin={this.loggin}/>
                                    <Register loggin={this.loggin}/>
                                    <button className="btn-container" ><Link to="/" >Home</Link></button>
                              </React.Fragment>
                              )}/>


                        </div>
                  </Router>


            );

      }


}
export default App;
