import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.quaternary};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterText = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const CopyrightBar = styled.div`
  background-color: ${({ theme }) => theme.colors.quaternary};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.lightText};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>학원 정보</FooterTitle>
            <FooterText><strong>리틀즈 학원</strong></FooterText>
            <FooterText>사업자등록번호: 123-45-67890</FooterText>
            <FooterText>대표: 홍길동</FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>연락처</FooterTitle>
            <FooterText>주소: 서울특별시 강남구 테헤란로 123</FooterText>
            <FooterText>전화: 02-123-4567</FooterText>
            <FooterText>이메일: info@littlz.co.kr</FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>운영시간</FooterTitle>
            <FooterText>평일: 10:00 ~ 19:00</FooterText>
            <FooterText>토요일: 10:00 ~ 15:00</FooterText>
            <FooterText>일요일 및 공휴일: 휴무</FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>바로가기</FooterTitle>
            <FooterLink to="/about">학원 소개</FooterLink>
            <FooterLink to="/programs">프로그램 안내</FooterLink>
            <FooterLink to="/notice">공지사항</FooterLink>
            <FooterLink to="/consult">상담 신청</FooterLink>
            <SocialLinks>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span>📷</span>
              </SocialLink>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span>📘</span>
              </SocialLink>
              <SocialLink href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" aria-label="Naver Blog">
                <span>📝</span>
              </SocialLink>
              <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <span>📺</span>
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
        <CopyrightBar>
          © {currentYear} 리틀즈 학원. All Rights Reserved.
        </CopyrightBar>
      </FooterContainer>
    </>
  );
};

export default Footer; 