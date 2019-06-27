import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './image.css';
import Addtext from './Addtext';
import Text from './Text';



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
            ]
      }
//       static getDerivedStateFromProps(nextProps, prevState){
//             if(nextProps.text!==prevState.text){
//                   return { text: nextProps.text};
//             }
//             else return null;
// }

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
                              txt.xloc = e.clientX
                              txt.yloc = e.clientY



                        }
                        if(e.type === 'mousemove' && txt.mving === true)
                        {
                              //console.log(id);
                              console.log(this.moving);
                              document.removeEventListener('mousemove', (event) => this.changeloc, true)
                              txt.xloc = e.clientX
                              txt.yloc = e.clientY
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
                        txt.xloc = e.clientX
                        txt.yloc = e.clientY
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
            this.setState({text: txts.filter(txt=> false) });
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
            return (
            <div className="container">
                  <Addtext addtext={this.addtext}></Addtext>
                  <button onClick={this.resetText}>Reset</button>


                  <svg className="container">

                  <image   xlinkHref={this.props.curImage.url} width="100%" height="100%"></image>

                  {this.state.text.map(txt => (<text id={txt.id} x={txt.xloc} y={txt.yloc} onMouseDown={event => this.changeloc(event,txt.id)} onMouseUp={event => this.stopchange(event,txt.id)} style={txtStyle}>{txt.string}</text>
))}



                  </svg>





            </div>
            );
      }

}

//PropTypes
Create.proTypes = {
      curImage: PropTypes.object.isRequired
}

const txtStyle = {
      fontFamily: "Impact",
      fill: "#FFF",
      stroke: "#000",
      fontSize:'30px',
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
//
//
//
// </div>
// );
//<img src={this.props.curImage.url}></img>
//{this.txts.map(txt => ( <Text key={txt.id} text={txt}/>))}
//{this.txts.map(txt => ( <text x="10" y="200" className="txtloc">{txt.string}</text>))}
