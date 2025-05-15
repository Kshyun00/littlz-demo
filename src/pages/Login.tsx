import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';

// 스타일 컴포넌트 (Signup 페이지와 동일한 스타일 사용)
const LoginContainer = styled.div`
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

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    
    &:hover {
      text-decoration: underline;
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
  email: yup.string()
    .email('유효한 이메일 주소를 입력해주세요')
    .required('이메일을 입력해주세요'),
  password: yup.string()
    .required('비밀번호를 입력해주세요')
});

// 폼 데이터 타입
interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
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
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  // 로그인 제출 처리
  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setAlert({ show: false, message: '', type: 'error' });
      
      // Firebase로 로그인
      await login(data.email, data.password);
      
      // 성공 시 홈페이지로 이동
      navigate('/');
    } catch (error: any) {
      console.error('로그인 오류:', error);
      console.error('오류 코드:', error.code);
      console.error('오류 메시지:', error.message);
      
      // 오류 메시지 표시
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = '너무 많은 로그인 시도가 있었습니다. 나중에 다시 시도해주세요.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = '잘못된 인증 정보입니다. 이메일과 비밀번호를 확인해주세요.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 형식입니다.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.';
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

  return (
    <LoginContainer>
      <Title>로그인</Title>
      
      {alert.show && (
        <AlertMessage type={alert.type}>
          {alert.message}
        </AlertMessage>
      )}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </SubmitButton>
      </Form>
      
      <SignupLink>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </SignupLink>
    </LoginContainer>
  );
};

export default Login; 