import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MemeItem from './MemeItem';

class Memes extends Component{

      render() {
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
      justifyContent: 'center'

}
export default Memes;
