import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
// 로고 이미지 임포트 (이미지 경로는 실제 파일 위치에 맞게 조정 필요)
// import logoImage from '../../assets/images/logo.png';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all ${({ theme }) => theme.transitions.normal};
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
  }
  
  img {
    height: 40px;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${({ $isActive, theme }) => $isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ $isActive, theme }) => $isActive ? theme.fontWeights.medium : theme.fontWeights.regular};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const ConsultButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-left: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  padding: ${({ theme }) => theme.spacing.xl};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform ${({ theme }) => theme.transitions.normal};
  z-index: 1001;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  cursor: pointer;
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${({ $isActive, theme }) => $isActive ? theme.colors.primary : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ $isActive, theme }) => $isActive ? theme.fontWeights.medium : theme.fontWeights.regular};
  text-decoration: none;
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileNavButton = styled.button`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-decoration: none;
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileConsultButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

interface OverlayProps {
  isOpen: boolean;
}

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity ${({ theme }) => theme.transitions.normal}, visibility ${({ theme }) => theme.transitions.normal};
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LoginButton = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing.md};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SignupButton = styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ProfileButton = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing.md};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 모바일 메뉴가 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          {/* 로고 이미지가 있을 경우 주석 해제하고 사용 */}
          {/* <img src={logoImage} alt="리틀즈 학원" /> */}
          {/* 또는 public 폴더에 있는 이미지를 직접 사용 */}
          {/* <img src="/logo.png" alt="리틀즈 학원" /> */}
          리틀즈 학원
        </Logo>
        
        <NavContainer>
          <NavMenu>
            <NavItem>
              <NavLink to="/about" $isActive={location.pathname === '/about'}>
                학원 소개
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/programs" $isActive={location.pathname === '/programs'}>
                프로그램 안내
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/notice" $isActive={location.pathname === '/notice'}>
                공지사항
              </NavLink>
            </NavItem>
            {isAdmin && (
              <NavItem>
                <NavLink to="/admin/users" $isActive={location.pathname === '/admin/users'}>
                  사용자 관리
                </NavLink>
              </NavItem>
            )}
          </NavMenu>
          
          {/* 인증 버튼 */}
          {currentUser ? (
            <AuthButtonsContainer>
              <ProfileButton to="/profile">내 계정</ProfileButton>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </AuthButtonsContainer>
          ) : (
            <AuthButtonsContainer>
              <LoginButton to="/login">로그인</LoginButton>
              <SignupButton to="/signup">회원가입</SignupButton>
            </AuthButtonsContainer>
          )}
        </NavContainer>
        
        <ConsultButton to="/consult">상담 신청</ConsultButton>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <span>☰</span>
        </MobileMenuButton>
      </HeaderContent>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <CloseButton onClick={toggleMobileMenu}>
            <span>×</span>
          </CloseButton>
        </MobileMenuHeader>
        
        <MobileNavList>
          <MobileNavItem>
            <MobileNavLink to="/about" $isActive={location.pathname === '/about'}>
              학원 소개
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/programs" $isActive={location.pathname === '/programs'}>
              프로그램 안내
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/notice" $isActive={location.pathname === '/notice'}>
              공지사항
            </MobileNavLink>
          </MobileNavItem>
          
          {isAdmin && (
            <MobileNavItem>
              <MobileNavLink to="/admin/users" $isActive={location.pathname === '/admin/users'}>
                사용자 관리
              </MobileNavLink>
            </MobileNavItem>
          )}
          
          {/* 모바일 인증 메뉴 */}
          {currentUser ? (
            <>
              <MobileNavItem>
                <MobileNavLink to="/profile" $isActive={location.pathname === '/profile'}>
                  내 계정
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavButton onClick={handleLogout}>
                  로그아웃
                </MobileNavButton>
              </MobileNavItem>
            </>
          ) : (
            <>
              <MobileNavItem>
                <MobileNavLink to="/login" $isActive={location.pathname === '/login'}>
                  로그인
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/signup" $isActive={location.pathname === '/signup'}>
                  회원가입
                </MobileNavLink>
              </MobileNavItem>
            </>
          )}
        </MobileNavList>
        
        <MobileConsultButton to="/consult">상담 신청</MobileConsultButton>
      </MobileMenu>
      
      <Overlay isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
    </HeaderContainer>
  );
};

export default Header; 