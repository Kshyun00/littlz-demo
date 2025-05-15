// 이미지 임포트 예시 (실제 이미지가 있을 경우 주석 해제하여 사용)
// import heroImage from '../assets/images/hero.jpg';
// import aboutImage from '../assets/images/about.jpg';
// import program1Image from '../assets/images/program1.jpg';
// import program2Image from '../assets/images/program2.jpg';
// import program3Image from '../assets/images/program3.jpg';
import heroImage from '../assets/images/학원hero.png';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Button from '../components/common/Button';

// 섹션 스타일
const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  width: 100%;
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.darkText};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

// 히어로 섹션
const HeroSection = styled.section`
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${heroImage}) no-repeat center center/cover;
  height: 600px;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 500px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 400px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.huge};
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;
  max-width: 650px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.big};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    text-align: center;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
  max-width: 550px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    text-align: center;
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

// 학원 소개 섹션
const AboutSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const AboutImage = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const AboutInfo = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: -1;
  }
`;

const AboutSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    bottom: -10px;
    left: 0;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const AboutText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
`;

const AboutList = styled.ul`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const AboutListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.md};
  
  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    left: -${({ theme }) => theme.spacing.md};
  }
`;

// 프로그램 안내 섹션
const ProgramsSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.tertiary};
  width: 100%;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ProgramCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  transition: transform ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const ProgramImage = styled.div`
  height: 200px;
  background-color: ${({ theme }) => theme.colors.secondary};
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProgramContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProgramAge = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.quaternary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ProgramTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgramDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgramDetails = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.lightText};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.quaternary};
`;

const ProgramDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  span:first-child {
    margin-right: ${({ theme }) => theme.spacing.xs};
    width: 20px;
  }
`;

// 공지사항 섹션
const NoticeSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
`;

const NoticeItem = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const NoticeLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NoticeTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.darkText};
  margin: 0;
`;

const NoticeDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.lightText};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

const NoticeMore = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

// 상담 신청 섹션
const ConsultSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
`;

const ConsultForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.darkText};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 10px center;
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 150px;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  width: 100%;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

// 알림 메시지 스타일
const AlertMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
  background-color: ${({ type, theme }) => 
    type === 'success' ? '#e8f5e9' : '#ffebee'};
  color: ${({ type, theme }) => 
    type === 'success' ? '#2e7d32' : '#c62828'};
  border: 1px solid ${({ type, theme }) => 
    type === 'success' ? '#c8e6c9' : '#ffcdd2'};
`;

const Home: React.FC = () => {
  // emailJS 초기화
  useEffect(() => {
    emailjs.init('dT2z6eMM2HM_EKVV9');
  }, []);
  
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: '',
    message: ''
  });
  
  // 폼 제출 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });
  
  // EmailJS 설정을 위한 폼 참조 생성
  const formRef = useRef<HTMLFormElement>(null);
  
  // 입력 필드 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 처리
  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS 설정
      const serviceId = 'service_littlz';  // EmailJS 서비스 ID
      const templateId = 'template_consult'; // EmailJS 템플릿 ID
      
      // 이메일 전송을 위한 추가 파라미터 설정
      const templateParams = {
        to_email: 'sanghyun1201a@gmail.com',
        from_name: formData.name,
        phone: formData.phone,
        program: formData.program,
        message: formData.message
      };
      
      // EmailJS를 사용하여 이메일 전송 (이미 초기화된 publicKey 사용)
      const result = await emailjs.send(serviceId, templateId, templateParams);
      
      if (result.text === 'OK') {
        // 성공 메시지 표시
        setAlert({
          show: true,
          message: '상담 신청이 성공적으로 전송되었습니다. 곧 연락드리겠습니다.',
          type: 'success'
        });
        
        // 폼 초기화
        setFormData({
          name: '',
          phone: '',
          program: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      // 오류 메시지 표시
      setAlert({
        show: true,
        message: '상담 신청 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
      
      // 5초 후 알림 메시지 숨기기
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };
  
  return (
    <>
      {/* 히어로 섹션 */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>아이의 성장을 함께하는 공간, 리틀즈 학원</HeroTitle>
          <HeroSubtitle>
            즐거운 학습 환경과 전문적인 교육으로 아이의 꿈과 재능을 키워주는 곳입니다
          </HeroSubtitle>
          <HeroActions>
            <Button to="/programs" size="large">프로그램 알아보기</Button>
            <Button to="/consult" variant="outlined" size="large">상담 신청하기</Button>
          </HeroActions>
        </HeroContent>
      </HeroSection>
      
      {/* 학원 소개 섹션 */}
      <AboutSection>
        <SectionInner>
          <AboutContent>
            <AboutImage>
              {/* 로컬 이미지 사용 예시 */}
              {/* <img src={aboutImage} alt="리틀즈 학원 교육 환경" /> */}
              
              {/* public 폴더 이미지 사용 예시 */}
              {/* <img src="/images/about.jpg" alt="리틀즈 학원 교육 환경" /> */}
              
              {/* 현재는 Unsplash의 랜덤 이미지 사용 */}
              <img src={heroImage} alt="리틀즈 학원 교육 환경" />
            </AboutImage>
            
            <AboutInfo>
              <AboutSectionTitle>행복한 배움의 시작</AboutSectionTitle>
              <AboutText>
                리틀즈 학원은 아이들의 호기심과 창의성을 존중하며, 개개인의 특성에 맞는 맞춤형 교육을 제공합니다. 
                즐거운 학습 환경 속에서 자연스럽게 실력을 키우고 자신감을 갖출 수 있도록 도와드립니다.
              </AboutText>
              <AboutText>
                우리의 철학은 단순한 지식 전달을 넘어 아이들이 스스로 생각하고 해결할 수 있는 능력을 키우는 데 있습니다.
              </AboutText>
              
              <AboutList>
                <AboutListItem>개인별 맞춤 교육 프로그램</AboutListItem>
                <AboutListItem>전문 교육 자격을 갖춘 선생님들</AboutListItem>
                <AboutListItem>안전하고 쾌적한 학습 환경</AboutListItem>
                <AboutListItem>정기적인 학부모 상담과 피드백</AboutListItem>
              </AboutList>
              
              <Button to="/about">더 알아보기</Button>
            </AboutInfo>
          </AboutContent>
        </SectionInner>
      </AboutSection>
      
      {/* 프로그램 안내 섹션 */}
      <ProgramsSection>
        <SectionInner>
          <SectionTitle>프로그램 안내</SectionTitle>
          <SectionSubtitle>
            아이의 연령과 특성에 맞는 다양한 프로그램을 제공합니다
          </SectionSubtitle>
          
          <ProgramsGrid>
            <ProgramCard>
              <ProgramImage>
                {/* 로컬 이미지 사용 예시 */}
                {/* <img src={program1Image} alt="창의미술 프로그램" /> */}
                
                {/* 현재는 Unsplash의 랜덤 이미지 사용 */}
                <img src={heroImage} alt="창의미술 프로그램" />
              </ProgramImage>
              <ProgramContent>
                <ProgramAge>5~7세</ProgramAge>
                <ProgramTitle>창의미술</ProgramTitle>
                <ProgramDescription>
                  다양한 재료와 기법을 활용하여 아이들의 창의력과 표현력을 키워주는 미술 프로그램입니다.
                </ProgramDescription>
                <ProgramDetails>
                  <ProgramDetail>
                    <span>🕒</span>
                    <span>화, 목 15:00~16:30</span>
                  </ProgramDetail>
                  <ProgramDetail>
                    <span>👥</span>
                    <span>최대 8명 소규모 그룹</span>
                  </ProgramDetail>
                </ProgramDetails>
              </ProgramContent>
            </ProgramCard>
            
            <ProgramCard>
              <ProgramImage>
                {/* 로컬 이미지 사용 예시 */}
                {/* <img src={program2Image} alt="음악놀이 프로그램" /> */}
                
                {/* 현재는 Unsplash의 랜덤 이미지 사용 */}
                <img src={heroImage} alt="음악놀이 프로그램" />
              </ProgramImage>
              <ProgramContent>
                <ProgramAge>4~6세</ProgramAge>
                <ProgramTitle>음악놀이</ProgramTitle>
                <ProgramDescription>
                  리듬과 멜로디를 통해 아이들의 음악적 감각과 정서 발달을 돕는 즐거운 음악 프로그램입니다.
                </ProgramDescription>
                <ProgramDetails>
                  <ProgramDetail>
                    <span>🕒</span>
                    <span>월, 수, 금 14:00~15:00</span>
                  </ProgramDetail>
                  <ProgramDetail>
                    <span>👥</span>
                    <span>최대 10명 소규모 그룹</span>
                  </ProgramDetail>
                </ProgramDetails>
              </ProgramContent>
            </ProgramCard>
            
            <ProgramCard>
              <ProgramImage>
                {/* 로컬 이미지 사용 예시 */}
                {/* <img src={program3Image} alt="독서논술 프로그램" /> */}
                
                {/* 현재는 Unsplash의 랜덤 이미지 사용 */}
                <img src={heroImage} alt="독서논술 프로그램" />
              </ProgramImage>
              <ProgramContent>
                <ProgramAge>6~9세</ProgramAge>
                <ProgramTitle>독서논술</ProgramTitle>
                <ProgramDescription>
                  연령별 맞춤 도서를 통해 독해력과 사고력, 표현력을 키우는 독서논술 프로그램입니다.
                </ProgramDescription>
                <ProgramDetails>
                  <ProgramDetail>
                    <span>🕒</span>
                    <span>월, 수, 금 16:00~17:30</span>
                  </ProgramDetail>
                  <ProgramDetail>
                    <span>👥</span>
                    <span>최대 6명 소규모 그룹</span>
                  </ProgramDetail>
                </ProgramDetails>
              </ProgramContent>
            </ProgramCard>
          </ProgramsGrid>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button to="/programs" variant="outlined">전체 프로그램 보기</Button>
          </div>
        </SectionInner>
      </ProgramsSection>
      
      {/* 공지사항 섹션 */}
      <NoticeSection>
        <SectionInner>
          <SectionTitle>공지사항</SectionTitle>
          <NoticeList>
            <NoticeItem>
              <NoticeLink to="/notice/1">
                <NoticeTitle>2023년 여름방학 특강 안내</NoticeTitle>
                <NoticeDate>2023.06.15</NoticeDate>
              </NoticeLink>
            </NoticeItem>
            <NoticeItem>
              <NoticeLink to="/notice/2">
                <NoticeTitle>7월 학부모 참관수업 일정 안내</NoticeTitle>
                <NoticeDate>2023.06.10</NoticeDate>
              </NoticeLink>
            </NoticeItem>
            <NoticeItem>
              <NoticeLink to="/notice/3">
                <NoticeTitle>2023년 2학기 수강신청 접수 시작</NoticeTitle>
                <NoticeDate>2023.06.01</NoticeDate>
              </NoticeLink>
            </NoticeItem>
          </NoticeList>
          <NoticeMore to="/notice">더 많은 공지사항 보기</NoticeMore>
        </SectionInner>
      </NoticeSection>
      
      {/* 상담 신청 섹션 */}
      <ConsultSection>
        <SectionInner>
          <SectionTitle>상담 신청</SectionTitle>
          <SectionSubtitle>
            아이에게 맞는 프로그램이 궁금하시거나 문의사항이 있으시면 상담을 신청해주세요
          </SectionSubtitle>
          
          {alert.show && (
            <AlertMessage type={alert.type}>
              {alert.message}
            </AlertMessage>
          )}
          
          <ConsultForm ref={formRef} onSubmit={handleConsultSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">이름</FormLabel>
              <FormInput 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="phone">연락처</FormLabel>
              <FormInput 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required 
                placeholder="010-0000-0000" 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="program">관심 프로그램</FormLabel>
              <FormSelect 
                id="program"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
              >
                <option value="">관심 프로그램 선택</option>
                <option value="창의미술">창의미술</option>
                <option value="음악놀이">음악놀이</option>
                <option value="독서논술">독서논술</option>
                <option value="기타">기타 (문의사항에 기재)</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">문의사항</FormLabel>
              <FormTextarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="궁금하신 사항을 자유롭게 적어주세요"
              ></FormTextarea>
            </FormGroup>
            
            <FormButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '전송 중...' : '상담 신청하기'}
            </FormButton>
          </ConsultForm>
        </SectionInner>
      </ConsultSection>
    </>
  );
};

export default Home; 