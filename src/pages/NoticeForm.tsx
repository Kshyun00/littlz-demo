import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createNotice, getNotice, updateNotice } from '../services/firestore';
import { useAuth } from '../context/AuthContext';

// 폼 필드 타입 정의
interface NoticeFormData {
  title: string;
  category: string;
  content: string;
}

// 유효성 검사 스키마
const schema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요'),
  category: yup.string().required('카테고리를 입력해주세요'),
  content: yup.string().required('내용을 입력해주세요')
});

const NoticeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, userProfile, isAdmin } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!id;

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset, 
    setValue 
  } = useForm<NoticeFormData>({
    resolver: yupResolver(schema)
  });

  // 관리자가 아니면 리디렉션
  useEffect(() => {
    if (!isAdmin) {
      navigate('/notice');
    }
  }, [isAdmin, navigate]);

  // 편집 모드인 경우 기존 공지사항 데이터 로드
  useEffect(() => {
    if (isEditMode) {
      const fetchNotice = async () => {
        try {
          setInitialLoading(true);
          const noticeData = await getNotice(id);
          
          if (noticeData) {
            setValue('title', noticeData.title);
            setValue('category', noticeData.category);
            setValue('content', noticeData.content);
          } else {
            setError('찾을 수 없는 공지사항입니다.');
            navigate('/notice');
          }
        } catch (err) {
          console.error('공지사항 조회 오류:', err);
          setError('공지사항을 불러오는 중 오류가 발생했습니다.');
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchNotice();
    }
  }, [id, isEditMode, navigate, setValue]);

  // 폼 제출 처리
  const onSubmit = async (data: NoticeFormData) => {
    if (!currentUser || !userProfile) {
      setError('로그인이 필요합니다.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      
      if (isEditMode) {
        // 공지사항 업데이트
        await updateNotice(id, {
          ...data,
          date: formattedDate,
          updatedAt: today
        });
      } else {
        // 새 공지사항 작성
        await createNotice({
          ...data,
          date: formattedDate,
          authorId: currentUser.uid,
          authorName: userProfile.displayName || '관리자'
        });
      }
      
      navigate('/notice');
    } catch (err) {
      console.error('공지사항 저장 오류:', err);
      setError('공지사항 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  if (initialLoading) {
    return (
      <Container>
        <LoadingWrapper>
          <LoadingSpinner />
          <p>공지사항을 불러오는 중입니다...</p>
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>{isEditMode ? '공지사항 수정' : '새 공지사항 작성'}</h1>
        <p>학원 관련 공지사항을 {isEditMode ? '수정' : '작성'}하세요</p>
      </Header>

      <FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              type="text"
              {...register('title')}
              placeholder="공지사항 제목을 입력하세요"
            />
            {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">카테고리</Label>
            <Input
              id="category"
              type="text"
              {...register('category')}
              placeholder="카테고리를 입력하세요 (예: 프로그램, 학부모, 일정)"
            />
            {errors.category && <ErrorText>{errors.category.message}</ErrorText>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              {...register('content')}
              rows={10}
              placeholder="공지사항 내용을 입력하세요"
            />
            {errors.content && <ErrorText>{errors.content.message}</ErrorText>}
          </FormGroup>
          
          <ButtonGroup>
            <BackButton 
              type="button" 
              onClick={() => navigate('/notice')}
            >
              ← 목록으로 돌아가기
            </BackButton>
            <SubmitButton 
              type="submit" 
              disabled={loading}
            >
              💾 {loading ? '저장 중...' : (isEditMode ? '수정하기' : '등록하기')}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h1 {
    color: ${({ theme }) => theme.colors.darkText};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.darkText};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  resize: vertical;
  min-height: 200px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    font-size: 1.2em;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.darkText};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.quaternary};
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.quaternary};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid #ffcdd2;
`;

const ErrorText = styled.span`
  color: #c62828;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const LoadingWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.lightText};
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  width: 40px;
  height: 40px;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default NoticeForm; 