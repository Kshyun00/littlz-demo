import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/학원hero.png';

const Programs: React.FC = () => {
  return (
    <ProgramsContainer>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>리틀즈 학원 프로그램</h1>
            <p>아이의 성장 단계에 맞는 맞춤형 교육 프로그램</p>
          </HeroContent>
        </div>
      </Hero>

      <Section className="container">
        <SectionTitle>
          <h2>교육 프로그램 소개</h2>
          <Divider />
        </SectionTitle>
        <ProgramCategories>
          <CategoryCard>
            <CategoryIcon>📚</CategoryIcon>
            <h3>초등 기초 학습</h3>
            <p>초등학생을 위한 국어, 영어, 수학 등 기초 학습 프로그램입니다.</p>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>🧠</CategoryIcon>
            <h3>사고력 발달</h3>
            <p>논리적 사고와 창의력 발달을 위한 특별 프로그램입니다.</p>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>🌍</CategoryIcon>
            <h3>영어 회화</h3>
            <p>원어민 교사와 함께하는 실용적인 영어 회화 수업입니다.</p>
          </CategoryCard>
        </ProgramCategories>
      </Section>

      <ProgramsSection>
        <div className="container">
          <SectionTitle>
            <h2>리틀즈 대표 프로그램</h2>
            <Divider />
          </SectionTitle>

          <ProgramCard>
            <ProgramImage>
              <img src={heroImage} alt="리틀즈 초등 종합반" />
            </ProgramImage>
            <ProgramContent>
              <ProgramBadge>인기</ProgramBadge>
              <h3>리틀즈 초등 종합반</h3>
              <ProgramInfo>
                <InfoItem>
                  <InfoLabel>대상</InfoLabel>
                  <InfoValue>초등학교 1-6학년</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>수업시간</InfoLabel>
                  <InfoValue>주 3회, 각 90분</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>정원</InfoLabel>
                  <InfoValue>반별 8명 이내</InfoValue>
                </InfoItem>
              </ProgramInfo>
              <p>
                초등학생들의 기본 학습능력을 배양하고 자기 주도 학습 습관을 형성하는 통합 프로그램입니다.
                국어, 영어, 수학의 기초를 탄탄히 다지면서 논리적 사고력과 문제 해결 능력을 함께 키웁니다.
                학교 교과 과정과 연계된 체계적인 커리큘럼으로 아이들의 학습 부담을 줄이고 효율적인 학습이 가능합니다.
              </p>
              <MoreButton to="/consult">상담 신청하기</MoreButton>
            </ProgramContent>
          </ProgramCard>

          <ProgramCard>
            <ProgramImage>
              <img src={heroImage} alt="리틀즈 창의사고력반" />
            </ProgramImage>
            <ProgramContent>
              <ProgramBadge color="secondary">추천</ProgramBadge>
              <h3>리틀즈 창의사고력반</h3>
              <ProgramInfo>
                <InfoItem>
                  <InfoLabel>대상</InfoLabel>
                  <InfoValue>초등학교 3-6학년</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>수업시간</InfoLabel>
                  <InfoValue>주 2회, 각 90분</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>정원</InfoLabel>
                  <InfoValue>반별 6명 이내</InfoValue>
                </InfoItem>
              </ProgramInfo>
              <p>
                일상과 학습에서 마주하는 모든 문제를 창의적으로 해결할 수 있는 사고력 증진 프로그램입니다.
                퍼즐, 게임, 토론 등 다양한 활동을 통해 비판적 사고와 창의적 아이디어 도출 능력을 키웁니다.
                즐거운 활동을 하면서 자연스럽게 사고력이 향상되는 것을 경험하게 됩니다.
              </p>
              <MoreButton to="/consult">상담 신청하기</MoreButton>
            </ProgramContent>
          </ProgramCard>

          <ProgramCard>
            <ProgramImage>
              <img src={heroImage} alt="리틀즈 영어 마스터반" />
            </ProgramImage>
            <ProgramContent>
              <ProgramBadge color="tertiary">신규</ProgramBadge>
              <h3>리틀즈 영어 마스터반</h3>
              <ProgramInfo>
                <InfoItem>
                  <InfoLabel>대상</InfoLabel>
                  <InfoValue>초등학교 1-6학년</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>수업시간</InfoLabel>
                  <InfoValue>주 2회, 각 90분</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>정원</InfoLabel>
                  <InfoValue>반별 6명 이내</InfoValue>
                </InfoItem>
              </ProgramInfo>
              <p>
                영어에 대한 흥미와 자신감을 키우는 실용적인 영어 프로그램입니다.
                듣기, 말하기, 읽기, 쓰기의 균형 있는 학습을 통해 영어 의사소통 능력을 향상시킵니다.
                원어민 교사와 함께하는 회화 수업으로 실제 상황에서 영어를 자연스럽게 사용할 수 있도록 합니다.
              </p>
              <MoreButton to="/consult">상담 신청하기</MoreButton>
            </ProgramContent>
          </ProgramCard>
        </div>
      </ProgramsSection>

      <Section className="container">
        <SectionTitle>
          <h2>학습 진행 방식</h2>
          <Divider />
        </SectionTitle>
        <ProcessContainer>
          <ProcessStep>
            <StepNumber>01</StepNumber>
            <StepContent>
              <h4>개인별 학습 진단</h4>
              <p>학생의 현재 학습 수준과 성향을 정확하게 진단합니다</p>
            </StepContent>
          </ProcessStep>
          <ProcessArrow>→</ProcessArrow>
          <ProcessStep>
            <StepNumber>02</StepNumber>
            <StepContent>
              <h4>맞춤형 학습 설계</h4>
              <p>진단 결과를 바탕으로 개인별 맞춤 커리큘럼을 설계합니다</p>
            </StepContent>
          </ProcessStep>
          <ProcessArrow>→</ProcessArrow>
          <ProcessStep>
            <StepNumber>03</StepNumber>
            <StepContent>
              <h4>체계적 학습 진행</h4>
              <p>소규모 그룹 또는 1:1 수업으로 체계적인 학습을 진행합니다</p>
            </StepContent>
          </ProcessStep>
          <ProcessArrow>→</ProcessArrow>
          <ProcessStep>
            <StepNumber>04</StepNumber>
            <StepContent>
              <h4>정기적 평가 및 피드백</h4>
              <p>학습 성과를 정기적으로 평가하고 개선점을 도출합니다</p>
            </StepContent>
          </ProcessStep>
        </ProcessContainer>
      </Section>

      <CtaSection>
        <div className="container">
          <CtaContent>
            <h2>지금 바로 상담 신청하세요</h2>
            <p>아이에게 맞는 최적의 학습 프로그램을 안내해 드립니다</p>
            <CtaButton to="/consult">무료 상담 신청</CtaButton>
          </CtaContent>
        </div>
      </CtaSection>
    </ProgramsContainer>
  );
};

const ProgramsContainer = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.section} 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
  margin: 0 auto;

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.darkText};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h2 {
    color: ${({ theme }) => theme.colors.darkText};
  }
`;

const Divider = styled.div`
  height: 3px;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ProgramCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.quaternary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  transition: transform ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
  
  h3 {
    margin: ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgramsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: ${({ theme }) => theme.spacing.section} 0;
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const ProgramCard = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgramImage = styled.div`
  flex: 1;
  max-width: 350px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: none;
    height: 250px;
  }
`;

const ProgramContent = styled.div`
  flex: 2;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  
  h3 {
    margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProgramBadge = styled.span<{ color?: 'primary' | 'secondary' | 'tertiary' }>`
  display: inline-block;
  background-color: ${({ theme, color }) => 
    color === 'secondary' ? theme.colors.secondary :
    color === 'tertiary' ? theme.colors.tertiary :
    theme.colors.primary
  };
  color: ${({ theme, color }) => 
    color === 'secondary' || color === 'tertiary' ? theme.colors.darkText : theme.colors.white
  };
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ProgramInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-right: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.lightText};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkText};
`;

const MoreButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
    transform: translateY(-3px);
  }
`;

const ProcessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ProcessStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing.md};
  }
`;

const StepContent = styled.div`
  text-align: center;
  
  h4 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: left;
  }
`;

const ProcessArrow = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    transform: rotate(90deg);
    margin: ${({ theme }) => theme.spacing.xs} 0;
    text-align: center;
  }
`;

const CtaSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const CtaContent = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  
  h2 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkText};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-3px);
  }
`;

export default Programs; 