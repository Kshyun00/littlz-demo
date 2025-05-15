import { DefaultTheme } from 'styled-components';

// DefaultTheme 인터페이스 확장
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
      error: string; // 오류 메시지용 색상 추가
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
    isAdmin?: boolean; // 관리자 여부 속성 추가
  }
}

const theme: DefaultTheme = {
  colors: {
    primary: '#FF9776', // 따뜻한 코랄 계열(포인트 색상)
    secondary: '#F7D7C8', // 연핑크 파스텔 톤
    tertiary: '#E3F6F5', // 민트 파스텔 톤
    quaternary: '#F9F2E2', // 베이지 파스텔 톤
    background: '#FFFCF7', // 밝은 아이보리
    white: '#FFFFFF',
    text: '#4A4A4A', // 기본 텍스트 컬러
    lightText: '#767676',
    darkText: '#333333',
    buttonHover: '#FF8860', // 버튼 호버 상태 컬러
    shadow: 'rgba(0, 0, 0, 0.05)',
    error: '#c62828' // 오류 메시지용 빨간색 추가
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
    big: '2.5rem',
    huge: '3rem'
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1200px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '5rem'
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  boxShadow: {
    small: '0 2px 8px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.05)',
    large: '0 8px 20px rgba(0, 0, 0, 0.08)'
  }
};

export default theme; 