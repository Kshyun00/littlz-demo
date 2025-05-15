import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/학원hero.png';

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>아이의 꿈을 키우는 리틀즈 학원</h1>
            <p>교육 철학과 체계적인 프로그램으로 아이들의 성장을 지원합니다</p>
          </HeroContent>
        </div>
      </Hero>

      <Section className="container">
        <SectionTitle>
          <h2>리틀즈 학원 소개</h2>
          <Divider />
        </SectionTitle>
        <SectionContent>
          <ImageContainer>
            <img src={heroImage} alt="리틀즈 학원" />
          </ImageContainer>
          <TextContent>
            <h3>아이들의 행복한 성장</h3>
            <p>
              리틀즈 학원은 2015년 설립된 이래로 아이들이 즐겁게 학습하고 성장할 수 있는 환경을 만들기 위해 노력해왔습니다. 
              우리는 단순히 지식을 전달하는 것이 아니라, 아이들의 호기심과 창의성을 자극하여 스스로 학습하는 능력을 키우는 데 초점을 맞추고 있습니다.
            </p>
            <p>
              숙련된 교사진과 함께 최신 교육 트렌드를 반영한 커리큘럼으로 아이들의 잠재력을 최대한 끌어올릴 수 있도록 지원합니다.
              모든 학생들이 자신의 속도에 맞게 배우고 성장할 수 있는 개인 맞춤형 교육 방식을 추구합니다.
            </p>
          </TextContent>
        </SectionContent>
      </Section>

      <ColorSection>
        <div className="container">
          <SectionTitle>
            <h2>교육 철학</h2>
            <Divider />
          </SectionTitle>
          <ValueGrid>
            <ValueCard>
              <ValueIcon>💡</ValueIcon>
              <h4>창의적 사고</h4>
              <p>
                틀에 박힌 교육이 아닌 다양한 관점에서 사고하고 
                문제를 해결할 수 있는 창의적 사고력을 키웁니다.
              </p>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🌱</ValueIcon>
              <h4>성장 마인드셋</h4>
              <p>
                실패를 두려워하지 않고 도전하며 끊임없이 성장하는 
                마인드셋을 길러줍니다.
              </p>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🤝</ValueIcon>
              <h4>협력과 소통</h4>
              <p>
                다른 사람들과 효과적으로 협력하고 소통하는 
                능력을 기르는 데 중점을 둡니다.
              </p>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🔍</ValueIcon>
              <h4>비판적 사고</h4>
              <p>
                정보를 분석하고 평가하여 합리적인 결론을 도출하는 
                비판적 사고 능력을 배양합니다.
              </p>
            </ValueCard>
          </ValueGrid>
        </div>
      </ColorSection>

      <Section className="container">
        <SectionTitle>
          <h2>우리의 장점</h2>
          <Divider />
        </SectionTitle>
        <FeatureGrid>
          <FeatureItem>
            <FeatureNumber>01</FeatureNumber>
            <FeatureContent>
              <h4>전문 교사진</h4>
              <p>각 분야에서 풍부한 경험을 가진 전문 교사진이 아이들을 지도합니다.</p>
            </FeatureContent>
          </FeatureItem>
          <FeatureItem>
            <FeatureNumber>02</FeatureNumber>
            <FeatureContent>
              <h4>소규모 맞춤 수업</h4>
              <p>10명 이내 소규모 클래스로 개인별 맞춤형 교육을 제공합니다.</p>
            </FeatureContent>
          </FeatureItem>
          <FeatureItem>
            <FeatureNumber>03</FeatureNumber>
            <FeatureContent>
              <h4>체계적인 커리큘럼</h4>
              <p>체계적으로 설계된 커리큘럼으로 단계별 학습이 가능합니다.</p>
            </FeatureContent>
          </FeatureItem>
          <FeatureItem>
            <FeatureNumber>04</FeatureNumber>
            <FeatureContent>
              <h4>학부모 소통</h4>
              <p>정기적인 상담과 피드백으로 아이의 성장 과정을 공유합니다.</p>
            </FeatureContent>
          </FeatureItem>
        </FeatureGrid>
      </Section>

      <CtaSection>
        <div className="container">
          <CtaContent>
            <h2>리틀즈 학원과 함께 시작하세요</h2>
            <p>자녀의 성장과 미래를 위한 첫걸음, 상담 문의하기</p>
            <CtaButton to="/consult">상담 신청하기</CtaButton>
          </CtaContent>
        </div>
      </CtaSection>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiary};
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
    color: ${({ theme }) => theme.colors.lightText};
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

const SectionContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform ${({ theme }) => theme.transitions.normal};
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const TextContent = styled.div`
  flex: 1;
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
  }
`;

const ColorSection = styled.section`
  background-color: ${({ theme }) => theme.colors.quaternary};
  padding: ${({ theme }) => theme.spacing.section} 0;
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  text-align: center;
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
  
  h4 {
    margin: ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FeatureItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FeatureNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1;
`;

const FeatureContent = styled.div`
  h4 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.darkText};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
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
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkText};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-3px);
  }
`;

export default About; 