import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MemeItem from './MemeItem';

class Memes extends Component{

      render() {
            // console.log(this.props.memes);
            const pics = this.props.memes;
            return pics.map((pic) => (
                  <MemeItem key={pic.id} meme={pic} selectImg={this.props.selectImg} />
            ));
      }

}



//PropTypes
Memes.proTypes = {
      memes: PropTypes.array.isRequired
}

export default Memes;
