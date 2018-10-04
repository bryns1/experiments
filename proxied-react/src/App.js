import React, { Component } from 'react';
import CMS from './proxy/Proxy'

class App extends Component {
  render() {
    return (
      <div>
      {/* <CMS/> */}
     <CMS.MainHeader/>
     <CMS.SecondHeader/>
     <CMS.ThirdHeader/>
     <CMS.FifthHeader/>
     </div>
    );
  }
}

export default App;
