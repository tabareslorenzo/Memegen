import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Savedmemes extends Component {
      state =
      {
            memes: [
                  {
                        url:'',
                        id:0,
                  }
            ]

      }
      render () {

            return;

      }
}
Savedmemes.proTypes = {
      savedmemes: PropTypes.object.isRequired
}

export default Savedmemes;
