import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getAllNotices, getNoticesByCategory, deleteNotice } from '../services/firestore';
import { Notice as NoticeType } from '../types/notice';
import { useAuth } from '../context/AuthContext';

const Notice: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // 공지사항 불러오기
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedNotices: NoticeType[];
        if (activeCategory === '전체') {
          fetchedNotices = await getAllNotices();
        } else {
          fetchedNotices = await getNoticesByCategory(activeCategory);
        }
        
        setNotices(fetchedNotices);
      } catch (err) {
        console.error('공지사항 불러오기 오류:', err);
        setError('공지사항을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotices();
  }, [activeCategory]);
  
  // 공지사항 삭제 처리
  const handleDeleteNotice = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
    
    if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
      try {
        await deleteNotice(id);
        // 삭제 후 목록 다시 불러오기
        setNotices(notices.filter(notice => notice.id !== id));
        // 선택된 공지사항이 삭제된 경우 선택 해제
        if (selectedNotice === id) {
          setSelectedNotice(null);
        }
      } catch (err) {
        console.error('공지사항 삭제 오류:', err);
        alert('공지사항 삭제 중 오류가 발생했습니다.');
      }
    }
  };
  
  // 카테고리 추출
  const categories = ['전체', ...Array.from(new Set(notices.map(notice => notice.category)))];
  
  return (
    <NoticeContainer>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>공지사항</h1>
            <p>리틀즈 학원의 새로운 소식과 중요 안내사항을 확인하세요</p>
          </HeroContent>
        </div>
      </Hero>

      <Section className="container">
        {isAdmin && (
          <AdminControls>
            <AdminButton onClick={() => navigate('/notice/create')}>
              + 새 공지사항 작성
            </AdminButton>
          </AdminControls>
        )}
        
        <CategoryFilter>
          {categories.map(category => (
            <CategoryButton 
              key={category} 
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        {loading ? (
          <LoadingWrapper>
            <LoadingSpinner />
            <p>공지사항을 불러오는 중입니다...</p>
          </LoadingWrapper>
        ) : error ? (
          <ErrorMessage>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>다시 시도</button>
          </ErrorMessage>
        ) : (
          <NoticeList>
            <NoticeHeader>
              <span className="number">번호</span>
              <span className="category">분류</span>
              <span className="title">제목</span>
              <span className="date">등록일</span>
              {isAdmin && <span className="actions">관리</span>}
            </NoticeHeader>
            
            {notices.length > 0 ? (
              notices.map((notice, index) => (
                <NoticeItem 
                  key={notice.id} 
                  onClick={() => setSelectedNotice(selectedNotice === notice.id ? null : notice.id || null)}
                  active={selectedNotice === notice.id}
                >
                  <div className="notice-row">
                    <span className="number">{notices.length - index}</span>
                    <span className="category">{notice.category}</span>
                    <span className="title">{notice.title}</span>
                    <span className="date">{notice.date}</span>
                    {isAdmin && (
                      <span className="actions">
                        <ActionButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/notice/edit/${notice.id}`);
                          }}
                          title="수정"
                        >
                          ✏️
                        </ActionButton>
                        <ActionButton 
                          onClick={(e) => handleDeleteNotice(notice.id!, e)}
                          title="삭제"
                          danger
                        >
                          🗑️
                        </ActionButton>
                      </span>
                    )}
                  </div>
                  {selectedNotice === notice.id && (
                    <NoticeContent>
                      <p>{notice.content}</p>
                    </NoticeContent>
                  )}
                </NoticeItem>
              ))
            ) : (
              <EmptyNotice>
                <p>등록된 공지사항이 없습니다.</p>
                {isAdmin && (
                  <button onClick={() => navigate('/notice/create')}>
                    첫 공지사항 작성하기
                  </button>
                )}
              </EmptyNotice>
            )}
          </NoticeList>
        )}
      </Section>

      <CtaSection>
        <div className="container">
          <CtaContent>
            <h2>궁금한 점이 있으신가요?</h2>
            <p>학원 프로그램이나 운영에 관한 문의사항은 언제든지 연락주세요</p>
            <ButtonGroup>
              <CtaButton to="/consult" primary>상담 신청하기</CtaButton>
              <CtaButton to="/about">학원 소개 보기</CtaButton>
            </ButtonGroup>
          </CtaContent>
        </div>
      </CtaSection>
    </NoticeContainer>
  );
};

const NoticeContainer = styled.div`
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
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CategoryButton = styled.button<{ active: boolean }>`
  background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, active }) => active ? theme.colors.white : theme.colors.text};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme, active }) => active ? theme.colors.buttonHover : theme.colors.quaternary};
  }
`;

const NoticeList = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  overflow: hidden;
`;

const NoticeHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 120px 1fr 120px ${({ theme }) => theme.isAdmin === true ? '100px' : '0'};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.quaternary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  
  .title {
    text-align: left;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 60px 100px 1fr 100px ${({ theme }) => theme.isAdmin === true ? '80px' : '0'};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NoticeItem = styled.div<{ active: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.quaternary};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  .notice-row {
    display: grid;
    grid-template-columns: 80px 120px 1fr 120px auto;
    padding: ${({ theme }) => theme.spacing.md};
    text-align: center;
    
    .title {
      text-align: left;
      font-weight: ${({ active }) => active ? 600 : 400};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: 60px 100px 1fr 100px auto;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, auto);
      gap: ${({ theme }) => theme.spacing.xs};
      text-align: left;
      
      .number {
        display: none;
      }
      
      .title {
        grid-row: 1;
        font-size: ${({ theme }) => theme.fontSizes.lg};
      }
      
      .category {
        grid-row: 2;
        color: ${({ theme }) => theme.colors.primary};
      }
      
      .date {
        grid-row: 3;
        color: ${({ theme }) => theme.colors.lightText};
        font-size: ${({ theme }) => theme.fontSizes.sm};
      }
      
      .actions {
        grid-row: 4;
        display: flex;
        justify-content: flex-start;
        margin-top: ${({ theme }) => theme.spacing.xs};
      }
    }
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.quaternary};
  }
  
  background-color: ${({ theme, active }) => active ? theme.colors.quaternary : 'transparent'};
`;

const NoticeContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.quaternary};
  border-top: 1px dashed ${({ theme }) => theme.colors.secondary};
  
  p {
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const EmptyNotice = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.lightText};
  
  button {
    margin-top: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    cursor: pointer;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.buttonHover};
    }
  }
`;

const CtaSection = styled.section`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const CtaContent = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  
  h2 {
    color: ${({ theme }) => theme.colors.darkText};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const CtaButton = styled(Link)<{ primary?: boolean }>`
  display: inline-block;
  background-color: ${({ theme, primary }) => primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme, primary }) => primary ? theme.colors.white : theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.colors.buttonHover : theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-3px);
  }
`;

const AdminControls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AdminButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
  
  svg {
    font-size: 1.2em;
  }
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, danger }) => danger ? theme.colors.error : theme.colors.quaternary};
  color: ${({ theme, danger }) => danger ? 'white' : theme.colors.text};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 2px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme, danger }) => danger ? '#d32f2f' : theme.colors.secondary};
  }
  
  svg {
    font-size: 1.2em;
  }
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

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  
  button {
    margin-top: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.darkText};
    border: none;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    cursor: pointer;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;

export default Notice; 