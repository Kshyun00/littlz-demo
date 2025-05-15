import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { createOrUpdateUser, getUser, isAdmin } from '../services/firestore';
import { User, UserRole } from '../types/user';

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  isAdmin: boolean;
  signup: (email: string, password: string, name: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

// 기본값으로 컨텍스트 생성
const AuthContext = createContext<AuthContextType | null>(null);

// 인증 컨텍스트 프로바이더 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // 회원가입 함수
  const signup = async (email: string, password: string, name: string) => {
    console.log('회원가입 시도:', email);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // 사용자 프로필 생성
    const newUser: User = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: name,
      role: UserRole.USER, // 기본 역할은 일반 사용자
      createdAt: new Date()
    };
    
    await createOrUpdateUser(newUser);
    return result;
  };

  // 로그인 함수
  const login = (email: string, password: string) => {
    console.log('로그인 시도:', email);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 로그아웃 함수
  const logout = () => {
    console.log('로그아웃 시도');
    return signOut(auth);
  };

  // 사용자 프로필 로드
  const loadUserProfile = async (user: FirebaseUser) => {
    try {
      const userDoc = await getUser(user.uid);
      
      if (userDoc) {
        setUserProfile(userDoc);
        
        // 관리자 권한 확인
        const adminStatus = await isAdmin(user.uid);
        setIsAdminUser(adminStatus);
      } else {
        // 사용자 정보가 없는 경우 기본 정보로 생성
        const newUser: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: UserRole.USER,
          createdAt: new Date()
        };
        
        await createOrUpdateUser(newUser);
        setUserProfile(newUser);
        setIsAdminUser(false);
      }
    } catch (error) {
      console.error('사용자 프로필 로드 오류:', error);
    }
  };

  // 사용자 인증 상태 변화 감지
  useEffect(() => {
    try {
      console.log('인증 상태 감시 시작');
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('사용자 인증됨:', user.email);
          setCurrentUser(user);
          await loadUserProfile(user);
        } else {
          console.log('사용자 인증되지 않음');
          setCurrentUser(null);
          setUserProfile(null);
          setIsAdminUser(false);
        }
        
        setLoading(false);
      });

      // 컴포넌트 언마운트 시 리스너 제거
      return unsubscribe;
    } catch (error) {
      console.error('인증 상태 감시 오류:', error);
      setLoading(false);
      return () => {};
    }
  }, []);

  // 컨텍스트 값
  const value = {
    currentUser,
    userProfile,
    loading,
    isAdmin: isAdminUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 인증 컨텍스트 사용을 위한 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다');
  }
  return context;
}; 