import styled, {css} from 'styled-components'
import theme from '../../../util/elements/from-theme'
import {space, fontSize} from 'styled-system'
import whenProp from '../../../util/elements/when-prop'

export const PageTitle = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 30px;
  ${fontSize}
  ${space}
  color: ${theme('page-title')};
`

export const Page = styled.div``

export const PageDescription = styled.p`
  margin: 0;
  ${space}
  font-weight: 400;
  font-size: 14px;
  color: ${theme('page-description')};
  font-family: monospace;
`

export const PageHeading = styled.div`
  margin-bottom: 20px;
  ${space}
`

export const PageError = styled.div`
  position: fixed;
  bottom: -9vw;
  right: 20px;
  font-size: 29.5vw;
  color: rgba(255, 255, 255, 0.01);
  font-weight: 700;
  user-select:none;
  line-height: .715;
  pointer-events: none;
  text-align: right;
`

export const PageWrapper = styled.div`
  max-width: ${theme('wrapper-width')};
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 200px;

  ${
  whenProp({
    centered: css`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 100vh;
    `
  })
}
`
