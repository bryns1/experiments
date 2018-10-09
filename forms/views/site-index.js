import React from 'react'
import { Content, SidebarLinks } from '../components/page';

import {routerConfig} from '../router.config'
import { PageTitle } from '../components/styles/font-styles';

class SiteIndex extends React.Component{
  render(){
    return (
      <div>
        <PageTitle>Site Index</PageTitle>
        <Content>
          <SidebarLinks routes={routerConfig.filter(x => x.isBase)}/>
        </Content>
      </div>
    )
  }
}

export default SiteIndex