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
// var my_lzma = require("./src/lzma_worker.js").LZMA_WORKER;



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
            // console.log(this.state.loggedin);
            this.setState({loggin: false});
            // console.log(this.state);


            var token = localStorage.getItem('token');

            // console.log(token);
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

      changeloc = (e, id) => {
            var x = id;
            //var y  = parseInt(e.target.id);
            // console.log(e.target);
            // console.log("change!!!");
            // console.log(e.clientX);
            // console.log(e.clientY);
            // txt.xloc = e.clientX;
            // txt.yloc = e.clientY;
            // this.state.text.map(txt => (console.log(txt.xloc)));
            //console.log("change!!!");
            //addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
            //                        document.addEventListener('mousemove', (event) => this.changeloc2(event, txt.id))

            this.setState({text: this.state.text.map(txt=> {
                  if(txt.id == id)
                  {


                        if(e.type === 'mousedown' && this.selected === false)
                        {
                              console.log(id);
                              this.moving = true
                              document.addEventListener('mousemove', (event) => this.changeloc(event, txt.id), true)
                              this.selected = true
                              txt.mving = true
                              console.log(e.clientX);
                              console.log(e.clientY);
                              console.log(txt.xloc);
                              console.log(txt.yloc);
                              var loc = cursorPoint(e);
                              txt.xloc = loc.x//-234
                              txt.yloc = loc.y//-236
                              // txt.xloc = e.clientX//-234
                              // txt.yloc = e.clientY//-236
                              console.log(txt.xloc);
                              console.log(txt.yloc);
                              console.log("hewjrkherkjh");
                              //-234 -236



                        }
                        if(e.type === 'mousemove' && txt.mving === true)
                        {
                              //console.log(id);
                              // console.log(this.moving);

                              document.removeEventListener('mousemove', (event) => this.changeloc, true)
                              // count++;
                              // if(count < 2)
                              // {
                              //       console.log(e.clientX);
                              //       console.log(e.clientY);
                              //       console.log(txt.xloc);
                              //       console.log(txt.yloc);
                              // }
                              var loc = cursorPoint(e);
                              txt.xloc = loc.x//-234
                              txt.yloc = loc.y//-236

                              // txt.xloc = e.clientX//-234
                              // txt.yloc = e.clientY//-236

                        }

                  }
                  return txt;

            })});

            // this.state.text.map(txt => (console.log(txt.xloc)));

      }
      stopchange= (e, id) => {
            console.log("up");
            this.moving = false;
            this.setState({text: this.state.text.map(txt=> {
                  document.removeEventListener('mousemove', this.changeloc)
                  document.removeEventListener('mousedown', this.changeloc)
                  txt.mving = false
                  if(txt.id === id)
                  {
                        var loc = cursorPoint(e);
                        txt.xloc = loc.x//-234
                        txt.yloc = loc.y//-236
                        // txt.xloc = e.clientX//-234
                        // txt.yloc = e.clientY//-236
                        document.removeEventListener('mousemove', this.changeloc)
                        document.removeEventListener('mousedown', this.changeloc)
                        this.selected = false
                        txt.mving = false


                  }
                  //console.log(document.EventTarget;
                  return txt;

            })});
      }

      addtext = (txt) => {
            this.setState({text: [...this.state.text, txt]})
      }
      resetText = () => {
            var txts = this.state.text;
            console.log("yrp");
            this.setState({text: txts.filter(txt=> false) });
      }

      download = () =>
      {
            saveSvgAsPng(document.getElementById('meme'), "diagram.png");
            // svgAsPngUri(document.getElementById('meme')).then(uri => console.log("good"));
            return;

      }
      save = () =>
      {
            //this.props.addmeme(uri)
            //saveSvgAsPng(document.getElementById('meme'), "diagram.png");
            var newMeme;
            console.log(svgAsPngUri(document.getElementById('meme')));
            svgAsPngUri(document.getElementById('meme')).then(uri => this.dataready(uri));
            return;
      }
      dataready = (str) =>
      {
            var min=0;
            var max=10000;
            var random = Math.floor(Math.random() * (+max - +min) + +min);
            console.log(typeof str);
            console.log(typeof random);


            const newMeme =
            {
                  "meme_url": "str",
                  "meme_id": random
            }
            // axios.post('http://localhost:4000/memes/add', newMeme).then(res => console.log(res.data));
            var token = localStorage.getItem('token');
            token = token.substring(6, token.length);
            const user = axios.create({
                  baseURL: 'http://localhost:4000/users/addmeme',
                  timeout: 1000,
                  headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token},

            });
            // console.log(str);

            str = Base64String.compressToUTF16(str);

            // console.log(str);
            // var st2 = Base64String.decompress(str);
            // console.log(st2);


            user.post('',{
                  "meme_url": str,
                  "meme_id": random
            })
                  .then(response => {
                        // this.setState({savedmemes: response.data.memes})
                        // this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url !== undefined)]})
                        // this.setState({savedmemes: [...this.state.savedmemes.filter(savedmeme => savedmeme.meme_url.length > 20)]})
                        console.log(response);
                  })
                  .catch(function(error){
                        console.log(error);
                  })



            // let strs = localStorage.getItem('strs');
            // let arr = [String];
            // if(strs){
            //       arr = JSON.parse(strs);
            //       arr.push(newMeme.meme_url);
            //       localStorage.setItem('strs', JSON.stringify(arr));
            // }
            // else{
            //       arr=[];
            //       arr.push(newMeme.meme_url);
            //       localStorage.setItem('strs', JSON.stringify(arr));
            // }
            // localStorage.setItem(newMeme.meme_id, newMeme.meme_url);

      }
      // txts = this.;
      yy = 1;
      //
      txtt = document.getElementsByClassName("txtloc");
      num = 15;
      str = this.num.toString() + "100";
      // getDerivedStateFromProps(this.props.curImage, this.state);


      // console.log(this.txtt.top);

      render()
      {
            this.txtt.top = 100 + 'px';
            //console.log(this.str);
            //this.txts = this.state.text;

            //console.log(this.state.text[this.state.text.length-1])
            if(this.props.curImage.empty)
            {
                  return(<h3 className="instructions" align="center" style={headStyle}>Select a from the list below to start creating memes</h3>);
            }
            else if(!this.state.loggedin)
            {
                  // console.log(this.state.loggedin);
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
/*

margin-left: auto;
margin-right: auto;
*/
const headStyle = {
      align: "center",
      color: "white",
      // backgroundColor: "black"
      // fontFamily: "Impact",
      // fill: "#FFF",
      // stroke: "#000",
      // fontSize:'30px',
}
const spacing = <div><br /><br /><br /></div>;
var count = 0;

function cursorPoint(evt){
      var svg = document.getElementById('meme');
      var pt = svg.createSVGPoint();
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
export default Create;



// this.txts = this.state.text;
// console.log(this.state.text[this.state.text.length-1])
// return (
// <div className="container">
//       <Addtext addtext={this.addtext}></Addtext>
//       <img src={this.props.curImage.url}></img>
//       <ol>
//       {this.txts.map(txt => ( <li>{txt}</li>))}
//       </ol>
// <button className="btn-container" style={btnStyle} onClick={this.download}>Download</button>
// <button className="btn-container" style={btnStyle} onClick={this.resetText}>Reset</button>
//
//
//
// </div>
// );<canvas id="canvas"></canvas>
//<img src={this.props.curImage.url}></img>
//{this.txts.map(txt => ( <Text key={txt.id} text={txt}/>))}
//{this.txts.map(txt => ( <text x="10" y="200" className="txtloc">{txt.string}</text>))}
                              //
                              // <button className="btn-container" style={btnStyle} onClick={this.download}>Download</button>
                              // <button className="btn-container" style={btnStyle} onClick={this.save}>Save</button>
                              // <button className="btn-container" style={btnStyle} onClick={this.resetText}>Reset</button>
