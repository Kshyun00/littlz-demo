import React, { useState } from 'react';
import styled from 'styled-components';

const Consult: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    program: '',
    message: '',
    agreeTerm: false
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 실제 API 호출을 통해 데이터를 서버로 전송할 수 있습니다.
    console.log('상담 신청 데이터:', formData);
    setFormSubmitted(true);
    // 폼 초기화
    setFormData({
      parentName: '',
      childName: '',
      childAge: '',
      phone: '',
      email: '',
      program: '',
      message: '',
      agreeTerm: false
    });
  };

  return (
    <ConsultContainer>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>상담 신청</h1>
            <p>자녀의 학습 방향에 대한 전문적인 상담을 제공해 드립니다</p>
          </HeroContent>
        </div>
      </Hero>

      <Section className="container">
        <TwoColumnsContainer>
          <InfoColumn>
            <InfoCard>
              <InfoTitle>상담 안내</InfoTitle>
              <InfoText>
                리틀즈 학원은 아이의 특성과 적성에 맞는 맞춤형 학습 방향을 제시해 드립니다. 
                개인별 학습 진단을 통해 최적의 교육 솔루션을 찾아드립니다.
              </InfoText>
              <InfoList>
                <InfoItem>
                  <IconSpan>📝</IconSpan>
                  <p>온라인 상담 신청 (24시간)</p>
                </InfoItem>
                <InfoItem>
                  <IconSpan>🔍</IconSpan>
                  <p>학습 수준 및 성향 진단</p>
                </InfoItem>
                <InfoItem>
                  <IconSpan>💬</IconSpan>
                  <p>맞춤형 학습 방향 제시</p>
                </InfoItem>
                <InfoItem>
                  <IconSpan>✅</IconSpan>
                  <p>학부모님과 지속적인 소통</p>
                </InfoItem>
              </InfoList>
              
              <ContactInfo>
                <ContactTitle>직접 문의하기</ContactTitle>
                <ContactItem>
                  <IconSpan>📞</IconSpan>
                  <p>02-123-4567</p>
                </ContactItem>
                <ContactItem>
                  <IconSpan>📱</IconSpan>
                  <p>010-9876-5432</p>
                </ContactItem>
                <ContactItem>
                  <IconSpan>📧</IconSpan>
                  <p>info@littlz.co.kr</p>
                </ContactItem>
                <ContactItem>
                  <IconSpan>🕒</IconSpan>
                  <p>평일 09:00 - 18:00 (토요일 09:00 - 15:00)</p>
                </ContactItem>
              </ContactInfo>
            </InfoCard>
          </InfoColumn>
          
          <FormColumn>
            {formSubmitted ? (
              <ThankYouCard>
                <IconSpan className="large">✅</IconSpan>
                <h2>상담 신청이 완료되었습니다!</h2>
                <p>
                  소중한 상담 신청 감사합니다. 담당 선생님이 확인 후 1-2일 이내에 
                  입력해 주신 연락처로 연락드리겠습니다.
                </p>
                <ResetButton onClick={() => setFormSubmitted(false)}>
                  다시 작성하기
                </ResetButton>
              </ThankYouCard>
            ) : (
              <FormCard>
                <FormTitle>상담 신청서</FormTitle>
                <ConsultForm onSubmit={handleSubmit}>
                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="parentName">학부모 성함 *</Label>
                      <Input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="childName">자녀 이름 *</Label>
                      <Input
                        type="text"
                        id="childName"
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="childAge">자녀 연령/학년 *</Label>
                      <Input
                        type="text"
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        placeholder="예: 10세 / 초3"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup className="full-width">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                      />
                    </FormGroup>
                    
                    <FormGroup className="full-width">
                      <Label htmlFor="program">관심 프로그램</Label>
                      <Select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                      >
                        <option value="">선택해주세요</option>
                        <option value="초등 종합반">초등 종합반</option>
                        <option value="창의사고력반">창의사고력반</option>
                        <option value="영어 마스터반">영어 마스터반</option>
                        <option value="기타">기타 (메시지에 기재)</option>
                      </Select>
                    </FormGroup>
                    
                    <FormGroup className="full-width">
                      <Label htmlFor="message">상담 내용</Label>
                      <TextArea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="궁금하신 점이나 자녀의 학습 상황 등을 자유롭게 작성해주세요."
                      />
                    </FormGroup>
                    
                    <FormGroup className="full-width">
                      <CheckboxContainer>
                        <Checkbox
                          type="checkbox"
                          id="agreeTerm"
                          name="agreeTerm"
                          checked={formData.agreeTerm}
                          onChange={handleCheckboxChange}
                          required
                        />
                        <CheckboxLabel htmlFor="agreeTerm">
                          개인정보 수집 및 이용에 동의합니다. *
                        </CheckboxLabel>
                      </CheckboxContainer>
                    </FormGroup>
                  </FormGrid>
                  
                  <SubmitButton type="submit">상담 신청하기</SubmitButton>
                </ConsultForm>
              </FormCard>
            )}
          </FormColumn>
        </TwoColumnsContainer>
      </Section>

      <MapSection>
        <div className="container">
          <SectionTitle>
            <h2>찾아오시는 길</h2>
            <Divider />
          </SectionTitle>
          <MapContainer>
            {/* 실제로는 여기에 Google Maps나 Kakao Maps API를 사용하여 지도를 표시할 수 있습니다 */}
            {/* 예시 이미지로 대체합니다 */}
            <MapPlaceholder>
              <p>지도가 표시될 영역입니다</p>
              <p>실제 구현 시 Google Maps 또는 Kakao Maps API를 연동하세요</p>
            </MapPlaceholder>
            
            <AddressInfo>
              <AddressItem>
                <AddressLabel>주소</AddressLabel>
                <AddressText>서울특별시 강남구 테헤란로 123 리틀즈빌딩 5층</AddressText>
              </AddressItem>
              <AddressItem>
                <AddressLabel>지하철</AddressLabel>
                <AddressText>2호선 강남역 4번 출구에서 도보 5분</AddressText>
              </AddressItem>
              <AddressItem>
                <AddressLabel>버스</AddressLabel>
                <AddressText>강남역 정류장 하차 (간선: 140, 144, 지선: 4412)</AddressText>
              </AddressItem>
              <AddressItem>
                <AddressLabel>주차</AddressLabel>
                <AddressText>건물 내 지하 주차장 이용 가능 (2시간 무료)</AddressText>
              </AddressItem>
            </AddressInfo>
          </MapContainer>
        </div>
      </MapSection>
    </ConsultContainer>
  );
};

const ConsultContainer = styled.div`
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

const TwoColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const InfoColumn = styled.div``;

const FormColumn = styled.div``;

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const InfoList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const IconSpan = styled.span`
  font-size: 1.2rem;
  margin-right: ${({ theme }) => theme.spacing.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  
  &.large {
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ContactInfo = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.quaternary};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

const ContactTitle = styled.h4`
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const FormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ThankYouCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const ResetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
`;

const ConsultForm = styled.form``;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
  
  .full-width {
    grid-column: 1 / -1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Noto Sans KR', sans-serif;
  resize: vertical;
  min-height: 120px;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
    transform: translateY(-3px);
  }
`;

const MapSection = styled.section`
  background-color: ${({ theme }) => theme.colors.quaternary};
  padding: ${({ theme }) => theme.spacing.section} 0;
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

const MapContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MapPlaceholder = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.lightText};
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.secondary};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const AddressInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const AddressItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddressLabel = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const AddressText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export default Consult; 