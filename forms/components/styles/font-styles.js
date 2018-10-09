import styled, { injectGlobal, css } from 'styled-components'
import {
  primaryColour,
  secondaryColour,
  tertiaryColourLight,
  tertiaryColourMid,
  tertiaryColourDark,
} from '../../vars'

// Fonts
export const primaryFontFamily = 'freight-neo-pro'
export const secondaryFontFamily = 'freight-sans-pro'

// Colours

export const primaryTypeMedium = css`
  font-family: ${primaryFontFamily}, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-feature-settings: "kern" 1;
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
`
export const secondaryTypeBook = css`
  font-family: ${secondaryFontFamily}, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-feature-settings: "kern" 1;
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
`
export const secondaryTypeBold = css`
  font-family: ${secondaryFontFamily}, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-feature-settings: "kern" 1;
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
`

// Text Styles
export const pageTitle = css`
  ${primaryTypeMedium}
  margin: 0;
  font-size: 4rem;
  line-height: 1;
  letter-spacing: -0.03125em;
`

export const subtitle = css`
  ${primaryTypeMedium}
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;
`

export const defaultCopy = css`
  ${secondaryTypeBook}
  font-size: 2rem;
  line-height: 1.5;
`

export const isolatedLabel = css`
  ${secondaryTypeBold}
  font-size: 2rem;
  line-height: 1;
`

export const faintLabel = css`
  ${secondaryTypeBook}
  font-size: 1.5rem;
  line-height: 1;
`

// Styled Components
export const PageTitle = styled.h1`
  ${pageTitle}
  color: ${primaryColour};
`

export const SectionHeading = styled.h2`
  ${subtitle}
  color: ${primaryColour};
`

export const BodyCopy = styled.p`
  ${defaultCopy}
  color: ${primaryColour};
`

export const FormLabel = styled.label`
  ${isolatedLabel}
  display: block;
  color: ${primaryColour};
`

export const FaintLabel = styled.span`
  ${faintLabel}
  display: block;
  color: ${tertiaryColourDark};
`

injectGlobal`

  @import url("https://use.typekit.net/geq4bcf.css");

  :root {
    font-size: 8px;
  }

  html {
    background-color: ${secondaryColour};
  }

  body {
    color ${primaryColour};
    ${defaultCopy}
  }
`