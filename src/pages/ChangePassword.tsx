import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

// 스타일 컴포넌트 (Login 페이지와 동일한 스타일 사용)
const ChangePasswordContainer = styled.div`
  max-width: 500px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.darkText};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  color: #c62828;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.quaternary};
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s;
  margin-right: 1rem;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    
    button {
      margin-right: 0;
    }
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

// 유효성 검사 스키마
const schema = yup.object().shape({
  currentPassword: yup.string()
    .required('현재 비밀번호를 입력해주세요'),
  newPassword: yup.string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .required('새 비밀번호를 입력해주세요'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다')
    .required('비밀번호 확인을 입력해주세요')
});

// 폼 데이터 타입
interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const { currentUser } = useAuth();
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

  // react-hook-form 설정
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordChangeFormData>({
    resolver: yupResolver(schema)
  });

  // 비밀번호 변경 제출 처리
  const onSubmit = async (data: PasswordChangeFormData) => {
    if (!currentUser) {
      setAlert({
        show: true,
        message: '로그인 상태가 아닙니다. 다시 로그인해주세요.',
        type: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      setAlert({ show: false, message: '', type: 'error' });
      
      // 현재 비밀번호로 재인증
      const credential = EmailAuthProvider.credential(
        currentUser.email || '',
        data.currentPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      
      // 비밀번호 변경
      await updatePassword(currentUser, data.newPassword);
      
      // 성공 메시지 표시
      setAlert({
        show: true,
        message: '비밀번호가 성공적으로 변경되었습니다.',
        type: 'success'
      });
      
      // 폼 초기화
      reset();
      
      // 2초 후 프로필 페이지로 이동
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error: any) {
      console.error('비밀번호 변경 오류:', error);
      
      // 오류 메시지 표시
      let errorMessage = '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = '현재 비밀번호가 올바르지 않습니다.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = '너무 많은 요청이 있었습니다. 나중에 다시 시도해주세요.';
      }
      
      setAlert({
        show: true,
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // 취소 처리
  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <ChangePasswordContainer>
      <Title>비밀번호 변경</Title>
      
      {alert.show && (
        <AlertMessage type={alert.type}>
          {alert.message}
        </AlertMessage>
      )}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="currentPassword">현재 비밀번호</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register('currentPassword')}
          />
          {errors.currentPassword && <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="newPassword">새 비밀번호</Label>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword')}
          />
          {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            취소
          </CancelButton>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? '처리 중...' : '비밀번호 변경'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </ChangePasswordContainer>
  );
};

export default ChangePassword; 