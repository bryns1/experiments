import {keyframes, css} from 'styled-components'

export const loading = keyframes`
  0%{
    content: '';
  }
  25%{
    content: '';
  }
  50%{
    content: '.';
  }
  75%{
    content: '..';
  }
  100%{
    content: '...';
  }
`

export const loadingAnimation = css`
  animation: ${loading} 3s infinite linear;
`

console.log(loadingAnimation)
