import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';

// 스타일 컴포넌트
const SignupContainer = styled.div`
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

const LoginLink = styled.div`
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
  name: yup.string().required('이름을 입력해주세요'),
  email: yup.string()
    .email('유효한 이메일 주소를 입력해주세요')
    .required('이메일을 입력해주세요'),
  password: yup.string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .required('비밀번호를 입력해주세요'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
    .required('비밀번호 확인을 입력해주세요')
});

// 폼 데이터 타입
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const { signup } = useAuth();
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
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: yupResolver(schema)
  });

  // 회원가입 제출 처리
  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setAlert({ show: false, message: '', type: 'error' });
      
      // Firebase로 회원가입
      await signup(data.email, data.password, data.name);
      
      // 성공 메시지 표시
      setAlert({
        show: true,
        message: '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.',
        type: 'success'
      });
      
      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('회원가입 오류:', error);
      console.error('오류 코드:', error.code);
      console.error('오류 메시지:', error.message);
      
      // 오류 메시지 표시
      let errorMessage = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = '이미 사용 중인 이메일 주소입니다.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 형식입니다.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = '보안에 취약한 비밀번호입니다. 더 복잡한 비밀번호를 사용해주세요.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = '이메일/비밀번호 인증이 사용 중지되었습니다. 관리자에게 문의하세요.';
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
    <SignupContainer>
      <Title>회원가입</Title>
      
      {alert.show && (
        <AlertMessage type={alert.type}>
          {alert.message}
        </AlertMessage>
      )}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            type="text"
            {...register('name')}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        
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
        
        <FormGroup>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? '처리 중...' : '회원가입'}
        </SubmitButton>
      </Form>
      
      <LoginLink>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </LoginLink>
    </SignupContainer>
  );
};

export default Signup; 