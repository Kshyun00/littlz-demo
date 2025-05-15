import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      background: string;
      white: string;
      text: string;
      lightText: string;
      darkText: string;
      buttonHover: string;
      shadow: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      big: string;
      huge: string;
    };
    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      largeDesktop: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      circle: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      section: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    boxShadow: {
      small: string;
      medium: string;
      large: string;
    };
  }
} 