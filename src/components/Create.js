import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './image.css';
import Addtext from './Addtext';
import Text from './Text';
import {saveSvgAsPng} from 'save-svg-as-png';
import {svgAsPngUri} from 'save-svg-as-png';
import Button from 'react-bootstrap/Button';
import Base64String  from 'lz-string';



class Create extends Component{
      state = {
            text: [
                  {
                        string: '',
                        xloc: 0,
                        yloc: 0,
                        id:0,
                        mving:false,
                  }
            ],
            loggedin: false,
      }
      componentDidMount(){
            this.setState({loggin: false});


            var token = localStorage.getItem('token');

            if(token){
                  token = token.substring(6, token.length);
                  console.log("whatwhat");
                  const user = axios.create({
                        baseURL: 'http://localhost:4000/users/auth',
                        timeout: 10000,
                        headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}

                  });
                  user.get()
                        .then(response => {this.setState({loggedin: true}); console.log(response);})
                        .catch(error =>{
                              this.props.logout();
                              console.log(error);
                        })
            }
      }
      selected = false
      moving = false
      cursorPoint = (evt) => {
            var svg = document.getElementById('meme');
            var pt = svg.createSVGPoint();
        pt.x = evt.clientX; pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }

      changeloc = (e, id) => {
            var x = id;

            this.setState({text: this.state.text.map(txt=> {
                  if(txt.id == id)
                  {


                        if(e.type === 'mousedown' && this.selected === false)
                        {
                              this.moving = true
                              document.addEventListener('mousemove', (event) => this.changeloc(event, txt.id), true)
                              this.selected = true
                              txt.mving = true

                              var loc = this.cursorPoint(e);
                              txt.xloc = loc.x//-234
                              txt.yloc = loc.y//-236




                        }
                        if(e.type === 'mousemove' && txt.mving === true)
                        {

                              document.removeEventListener('mousemove', (event) => this.changeloc, true)
                              var loc = this.cursorPoint(e);
                              txt.xloc = loc.x
                              txt.yloc = loc.y

                        }

                  }
                  return txt;

            })});


      }
      stopchange= (e, id) => {
            this.moving = false;
            this.setState({text: this.state.text.map(txt=> {
                  document.removeEventListener('mousemove', this.changeloc)
                  document.removeEventListener('mousedown', this.changeloc)
                  txt.mving = false
                  if(txt.id === id)
                  {
                        var loc = this.cursorPoint(e);
                        txt.xloc = loc.x
                        txt.yloc = loc.y

                        document.removeEventListener('mousemove', this.changeloc)
                        document.removeEventListener('mousedown', this.changeloc)
                        this.selected = false
                        txt.mving = false


                  }
                  return txt;

            })});
      }

      addtext = (txt) => {
            this.setState({text: [...this.state.text, txt]})
      }
      resetText = () => {
            var txts = this.state.text;
            this.setState({text: txts.filter(txt=> false) });
      }

      download = () =>
      {
            saveSvgAsPng(document.getElementById('meme'), "diagram.png");
            return;

      }
      save = () =>
      {

            svgAsPngUri(document.getElementById('meme')).then(uri => this.dataready(uri));
            return;
      }
      dataready = (str) =>
      {
            var min=0;
            var max=10000;
            var random = Math.floor(Math.random() * (+max - +min) + +min);


            const newMeme =
            {
                  "meme_url": "str",
                  "meme_id": random
            }
            var token = localStorage.getItem('token');
            token = token.substring(6, token.length);
            const user = axios.create({
                  baseURL: 'http://localhost:4000/users/addmeme',
                  timeout: 1000,
                  headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token},

            });

            str = Base64String.compressToUTF16(str);


            user.post('',{
                  "meme_url": str,
                  "meme_id": random
            })
                  .then(response => {
                        console.log(response);
                  })
                  .catch(function(error){
                        console.log(error);
                  })



      }
      yy = 1;
      txtt = document.getElementsByClassName("txtloc");
      num = 15;
      str = this.num.toString() + "100";



      render()
      {
            this.txtt.top = 100 + 'px';

            if(this.props.curImage.empty)
            {
                  return(<h3 className="instructions" align="center" style={headStyle}>Select a from the list below to start creating memes</h3>);
            }
            else if(!this.state.loggedin)
            {
                  return (
                  <div>
                        <div className="container">
                              <Addtext addtext={this.addtext}></Addtext>

                              <svg id='meme' className="container-svg">

                              <image  xlinkHref= {this.props.curImage.url} width="100%" height="100%"></image>

                              {this.state.text.map(txt => (<text id={txt.id} x={txt.xloc} y={txt.yloc} onMouseDown={event => this.changeloc(event,txt.id)} onMouseUp={event => this.stopchange(event,txt.id)} style={txtStyle}>{txt.string}</text>
                        ))}



                              </svg>
                              <div>
                                    <Button onClick={this.props.hideImg} variant="outline-primary" size="sm">Hide Image</Button>
                                    <Button variant="outline-primary" size="sm" onClick={this.download}>Download</Button>
                                    <Button variant="outline-primary" size="sm" onClick={this.resetText}>Reset</Button>
                              </div>



                        </div>
                        {spacing}
                  </div>
                  );
            }
            else{
                  return (
                  <div className="container">
                        <Addtext addtext={this.addtext}></Addtext>

                        <svg id='meme' className="container-svg">

                        <image  xlinkHref= {this.props.curImage.url} width="100%" height="100%"></image>

                        {this.state.text.map(txt => (<text id={txt.id} x={txt.xloc} y={txt.yloc} onMouseDown={event => this.changeloc(event,txt.id)} onMouseUp={event => this.stopchange(event,txt.id)} style={txtStyle}>{txt.string}</text>
                  ))}



                        </svg>
                        <div>
                              <Button onClick={this.props.hideImg} variant="outline-primary" size="sm">Hide Image</Button>
                              <Button variant="outline-primary" size="sm" onClick={this.download}>Download</Button>
                              <Button variant="outline-primary" size="sm" onClick={this.resetText}>Reset</Button>
                              <Button variant="outline-primary" size="sm" onClick={this.save}>Save</Button>
                        </div>


                  </div>
                  );

            }


      }

}

//PropTypes
Create.proTypes = {
      curImage: PropTypes.object.isRequired
}
const btnStyle = {
      left: '100%',
      backgroundColor: '#0033cc',
      color: '#fff',
      border: '10px',
      padding: '5px 8px',
      cursor: 'pointer',
      float: 'right'
}

const txtStyle = {
      fontFamily: "Impact",
      fill: "#FFF",
      stroke: "#000",
      fontSize:'30px',
}

const headStyle = {
      align: "center",
      color: "white",

}
const spacing = <div><br /><br /><br /></div>;
var count = 0;

export default Create;
