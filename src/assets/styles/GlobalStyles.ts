import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* 폰트를 @import 대신 링크 태그로 분리하여 index.html에 추가하는 것이 좋습니다 */
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Sans KR', sans-serif;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.huge};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.big};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.buttonHover};
    }
  }
  
  button {
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  ul, ol {
    list-style-position: inside;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
  
  section {
    padding: ${({ theme }) => theme.spacing.section} 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: ${({ theme }) => theme.fontSizes.big};
    }
    
    h2 {
      font-size: ${({ theme }) => theme.fontSizes.xxxl};
    }
    
    section {
      padding: ${({ theme }) => theme.spacing.xl} 0;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html {
      font-size: 12px;
    }
    
    .container {
      padding: 0 ${({ theme }) => theme.spacing.md};
    }
  }
`;

export default GlobalStyles; 