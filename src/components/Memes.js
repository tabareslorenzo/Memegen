import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MemeItem from './MemeItem';

class Memes extends Component{

      render() {
            // console.log(this.props.memes);
            if(this.props.memes.loaded===false)
            {
                  return(<p>loading please wait!!</p>);
            }
            const pics = this.props.memes;
            return pics.map((pic) => (
                  <MemeItem key={pic.id} meme={pic} selectImg={this.props.selectImg.bind(this)} style={comStyle} />
            ));
      }

}



//PropTypes
Memes.proTypes = {
      memes: PropTypes.array.isRequired
}

const comStyle={
      // position: 'absolute', left: '50%', top: '50%',
      // transform: 'translate(-50%, -50%)',
      justifyContent: 'center'

}
export default Memes;
