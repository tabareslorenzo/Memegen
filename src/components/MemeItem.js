import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './image.css';

class MemeItem extends Component{

      render() {
            const pics = this.props.meme;
            // console.log(pics.meme.url);
            const url = pics.url;
            return (
                  <div className="btn-container" padding='10px'>
                  <Button onClick={this.props.selectImg.bind(this, url)} variant="outline-primary" size="lg" block>{pics.name} </Button>
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
      float: 'right',
      size: 'sm'
}

// const container = {
//       height: '50px',
//       width: '50px'
// }
//<div className="btn-container" padding='10px'>
//<img src={url} alt="name"  ></img>



export default MemeItem;
