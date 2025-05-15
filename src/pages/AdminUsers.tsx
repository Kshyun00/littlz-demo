import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { User, UserRole } from '../types/user';
import { setUserAsAdmin, removeAdminRole } from '../services/firestore';

const AdminUsers: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 관리자가 아니면 홈으로 리디렉션
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // 사용자 목록 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const usersRef = collection(db, 'users');
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        
        const fetchedUsers: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const createdAt = userData.createdAt;
          
          let formattedCreatedAt: Date;
          if (createdAt && typeof createdAt === 'object' && 'seconds' in createdAt) {
            // Firebase Timestamp 객체인 경우
            formattedCreatedAt = new Date(createdAt.seconds * 1000);
          } else if (createdAt instanceof Date) {
            // 이미 Date 객체인 경우
            formattedCreatedAt = createdAt;
          } else {
            // 기본값
            formattedCreatedAt = new Date();
          }
          
          fetchedUsers.push({
            ...userData,
            uid: doc.id,
            createdAt: formattedCreatedAt,
            role: userData.role || UserRole.USER // 역할이 없는 경우 기본값 설정
          } as User);
        });
        
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('사용자 목록 불러오기 오류:', err);
        setError('사용자 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  // 관리자 권한 부여
  const handleSetAdmin = async (uid: string) => {
    if (window.confirm('이 사용자를 관리자로 설정하시겠습니까?')) {
      try {
        setActionLoading(uid);
        await setUserAsAdmin(uid);
        
        // 상태 업데이트
        setUsers(users.map(user => 
          user.uid === uid ? { ...user, role: UserRole.ADMIN } : user
        ));
        
        alert('관리자 권한이 부여되었습니다.');
      } catch (err) {
        console.error('관리자 설정 오류:', err);
        alert('관리자 권한 부여 중 오류가 발생했습니다.');
      } finally {
        setActionLoading(null);
      }
    }
  };

  // 관리자 권한 제거
  const handleRemoveAdmin = async (uid: string) => {
    if (window.confirm('이 사용자의 관리자 권한을 제거하시겠습니까?')) {
      try {
        setActionLoading(uid);
        await removeAdminRole(uid);
        
        // 상태 업데이트
        setUsers(users.map(user => 
          user.uid === uid ? { ...user, role: UserRole.USER } : user
        ));
        
        alert('관리자 권한이 제거되었습니다.');
      } catch (err) {
        console.error('관리자 권한 제거 오류:', err);
        alert('관리자 권한 제거 중 오류가 발생했습니다.');
      } finally {
        setActionLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingWrapper>
          <LoadingSpinner />
          <p>사용자 목록을 불러오는 중입니다...</p>
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>사용자 관리</h1>
        <p>사용자 권한을 관리합니다</p>
      </Header>

      {error ? (
        <ErrorMessage>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </ErrorMessage>
      ) : (
        <UserList>
          <UserHeader>
            <span className="name">이름</span>
            <span className="email">이메일</span>
            <span className="role">역할</span>
            <span className="created">가입일</span>
            <span className="actions">관리</span>
          </UserHeader>
          
          {users.length > 0 ? (
            users.map((user) => (
              <UserItem key={user.uid}>
                <span className="name">{user.displayName || '이름 없음'}</span>
                <span className="email">{user.email}</span>
                <span className="role">
                  {user.role === UserRole.ADMIN ? (
                    <RoleBadge isAdmin>관리자</RoleBadge>
                  ) : (
                    <RoleBadge>일반 사용자</RoleBadge>
                  )}
                </span>
                <span className="created">
                  {user.createdAt.toLocaleDateString()}
                </span>
                <span className="actions">
                  {user.role === UserRole.ADMIN ? (
                    <ActionButton 
                      onClick={() => handleRemoveAdmin(user.uid)}
                      disabled={actionLoading === user.uid}
                      danger
                    >
                      {actionLoading === user.uid ? '처리 중...' : '관리자 권한 제거'}
                    </ActionButton>
                  ) : (
                    <ActionButton 
                      onClick={() => handleSetAdmin(user.uid)}
                      disabled={actionLoading === user.uid}
                    >
                      {actionLoading === user.uid ? '처리 중...' : '관리자로 설정'}
                    </ActionButton>
                  )}
                </span>
              </UserItem>
            ))
          ) : (
            <EmptyMessage>
              <p>등록된 사용자가 없습니다.</p>
            </EmptyMessage>
          )}
        </UserList>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
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

const UserList = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  overflow: hidden;
`;

const UserHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.quaternary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const UserItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.quaternary};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, auto);
    gap: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.md};
    
    .name {
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
    
    .email {
      color: ${({ theme }) => theme.colors.text};
    }
    
    .created {
      color: ${({ theme }) => theme.colors.lightText};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
    
    .actions {
      margin-top: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

const RoleBadge = styled.span<{ isAdmin?: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme, isAdmin }) => isAdmin ? theme.colors.primary : theme.colors.quaternary};
  color: ${({ theme, isAdmin }) => isAdmin ? theme.colors.white : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  background-color: ${({ theme, danger }) => danger ? theme.colors.error : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme, danger }) => danger ? '#d32f2f' : theme.colors.buttonHover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightText};
    cursor: not-allowed;
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
  background-color: #ffebee;
  color: #c62828;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-align: center;
  border: 1px solid #ffcdd2;
  
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

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.lightText};
`;

export default AdminUsers; 