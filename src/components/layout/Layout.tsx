import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout; 