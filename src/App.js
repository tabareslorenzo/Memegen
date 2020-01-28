import React, {Component}  from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Memes from './components/Memes';
import Create from './components/Create';
import Savedmemes from './components/Savedmemes';
import Login from './components/Login';
import Register from './components/Register';
import Naviagationbar from './components/Navigationbar'
import axios from 'axios';
import { Redirect } from 'react-router'




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
      hideImg = () =>
      {
            this.setState({curImage:
                  {
                        url:'',
                        empty:true,
                        texts:[{
                              string:'',
                              xloc: 0,
                              yloc: 0,
                              id:0,
                              mving:false,
                        }]
                  }
            })
      }
      loggin = () =>
      {
            this.setState({loggedin: true});
      }
      logout = () =>
      {
            localStorage. removeItem('token')
            this.setState({loggedin: false});
            return(<Redirect to="/login" />);
            this.setState({loggedin: false});

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
                  var token = localStorage.getItem('token');

                  if(token){
                        token = token.substring(6, token.length);
                        this.loggin();

                        const user = axios.create({
                              baseURL: 'http://localhost:4000/users/auth',
                              timeout: 10000,
                              headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}

                        });
                        user.get()
                              .then(response => {this.loggin();})
                              .catch(error => {
                                    this.logout();
                                    console.log(error);
                              })
                  }
                  if(token == null)
                  {
                        this.setState({loggedin: false})
                  }

      }
      render(){

            var {selected, loaded, pics} = this.state.memes;
            return (
                   <Router>
                        <div className="App">

                           <header className="App-header">
                                 <Naviagationbar isloggedin={this.state.loggedin}></Naviagationbar>
                           </header>
                           {spacing}
                           <Route exact path="/" render={props => (
                        <React.Fragment>
                              <Create curImage={this.state.curImage} logout={this.logout} hideImg={this.hideImg} addmeme={this.addmeme}></Create>
                              <Memes memes={pics} selectImg={this.selectImg} text={this.state.curImage.texts} ></Memes>
                        </React.Fragment>
                        )}/>
                  <Route path="/saved" render={props => (
                        <React.Fragment>
                              <Savedmemes savedmemes={this.state.savedmemes} logout={this.logout}/>
                        </React.Fragment>
                        )}/>

                  <Route path="/login" render={props => (
                              <React.Fragment>
                                    <Login loggin={this.loggin}  logout={this.logout} loggedin={this.state.loggedin}/>
                                    {spacing}
                                    <Register loggin={this.loggin} loggedin={this.state.loggedin}/>
                              </React.Fragment>
                              )}/>


                        </div>
                  </Router>


            );

      }


}
const spacing = <div><br /><br /><br /></div>;


export default App;
