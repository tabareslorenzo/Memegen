import React, {Component}  from 'react';
import './App.css';
import Memes from './components/Memes';
import Create from './components/Create';
import Savedmemes from './components/Savedmemes';

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
            }]
      }
      //<Savedmemes savedmemes={this.state.savedmemes}/>
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
      }

      render(){
            var {selected, loaded, pics} = this.state.memes;
            if(!loaded){
                  // console.log(pics);
                  // console.log(loaded);
                  // console.log(selected);
                  return (
                   <div className="App">
                      <header className="App-header">

                      </header>


                   </div>
                  );
            }
            else {
                  if(this.state.curImage.empty){
                        return (
                         <div className="App">
                            <header className="App-header">

                            </header>
                             <Memes memes={pics} selectImg={this.selectImg} ></Memes>

                         </div>
                        );
                  }
                  else{
                        return (
                         <div className="App">
                            <header className="App-header">

                            </header>
                            <Create curImage={this.state.curImage} addmeme={this.addmeme} ></Create>
                             <Memes memes={pics} selectImg={this.selectImg} text={this.state.curImage.texts}></Memes>

                         </div>
                        );
                  }


            }

      }


}
export default App;
