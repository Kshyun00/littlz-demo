import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

// 스타일 컴포넌트
const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 80px auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.darkText};
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.quaternary};
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.lightText};
`;

const ProfileValue = styled.span`
  color: ${({ theme }) => theme.colors.darkText};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.quaternary};
    cursor: not-allowed;
  }
`;

const DangerButton = styled(Button)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const AlertMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
  background-color: ${({ type }) => 
    type === 'success' ? '#e8f5e9' : '#ffebee'};
  color: ${({ type }) => 
    type === 'success' ? '#2e7d32' : '#c62828'};
  border: 1px solid ${({ type }) => 
    type === 'success' ? '#c8e6c9' : '#ffcdd2'};
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    
    button {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'error'
  });

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      setAlert({
        show: true,
        message: '로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 변경 페이지로 이동
  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <ProfileContainer>
      <Title>내 프로필</Title>
      
      {alert.show && (
        <AlertMessage type={alert.type}>
          {alert.message}
        </AlertMessage>
      )}
      
      <ProfileSection>
        <SectionTitle>계정 정보</SectionTitle>
        <ProfileInfo>
          <ProfileLabel>이메일</ProfileLabel>
          <ProfileValue>{currentUser?.email}</ProfileValue>
        </ProfileInfo>
        <ProfileInfo>
          <ProfileLabel>계정 생성일</ProfileLabel>
          <ProfileValue>
            {currentUser?.metadata.creationTime 
              ? new Date(currentUser.metadata.creationTime).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : '정보 없음'}
          </ProfileValue>
        </ProfileInfo>
        <ProfileInfo>
          <ProfileLabel>마지막 로그인</ProfileLabel>
          <ProfileValue>
            {currentUser?.metadata.lastSignInTime
              ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : '정보 없음'}
          </ProfileValue>
        </ProfileInfo>
      </ProfileSection>
      
      <ButtonGroup>
        <Button onClick={handleChangePassword} disabled={loading}>
          비밀번호 변경
        </Button>
        <DangerButton onClick={handleLogout} disabled={loading}>
          {loading ? '처리 중...' : '로그아웃'}
        </DangerButton>
      </ButtonGroup>
    </ProfileContainer>
  );
};

export default Profile; 