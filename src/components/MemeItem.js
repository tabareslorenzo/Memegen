import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './image.css';

class MemeItem extends Component{

      render() {
            const pics = this.props.meme;
            // console.log(pics.meme.url);
            const url = pics.url;
            return (
                  <div className="btn-container" padding='10px'>
                  <button onClick={this.props.selectImg.bind(this, url)} style = {btnStyle}>{pics.name}</button>
                  </div>
            );
      }

}

//PropTypes
MemeItem.proTypes = {
      memes: PropTypes.object.isRequired
}

const btnStyle = {
      backgroundColor: '#0033cc',
      color: '#fff',
      border: 'none',
      padding: '5px 8px',
      cursor: 'pointer',
      float: 'right'
}

// const container = {
//       height: '50px',
//       width: '50px'
// }
//<div className="btn-container" padding='10px'>
//<img src={url} alt="name"  ></img>



export default MemeItem;
