import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';

import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Notice from './pages/Notice';
import Consult from './pages/Consult';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import NoticeForm from './pages/NoticeForm';
import AdminUsers from './pages/AdminUsers';

// 페이지 임포트 (나중에 실제 파일 생성 후 주석 해제)
// import About from './pages/About';
// import Courses from './pages/Courses';
// import Instructors from './pages/Instructors';
// import Contact from './pages/Contact';

// 보호된 라우트 컴포넌트
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// 인증 상태에 따른 리디렉션 라우트
const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  if (currentUser) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  // useAuth hook으로부터 isAdmin 값을 가져올 수 없으므로 
  // 테마 속성에 직접 전달하는 방식으로 변경
  
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// 중첩된 컴포넌트를 만들어 useAuth 사용
const AppContent: React.FC = () => {
  const { isAdmin } = useAuth();
  
  return (
    <ThemeProvider theme={{ ...theme, isAdmin }}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Routes>
            {/* 공개 라우트 */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/consult" element={<Consult />} />
            
            {/* 인증 관련 라우트 */}
            <Route 
              path="/login" 
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <RedirectIfAuthenticated>
                  <Signup />
                </RedirectIfAuthenticated>
              } 
            />
            
            {/* 보호된 라우트 */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/change-password" 
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } 
            />
            
            {/* 공지사항 관련 라우트 */}
            <Route 
              path="/notice/create" 
              element={
                <ProtectedRoute>
                  <NoticeForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notice/edit/:id" 
              element={
                <ProtectedRoute>
                  <NoticeForm />
                </ProtectedRoute>
              } 
            />
            
            {/* 관리자 전용 페이지 */}
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 페이지 */}
            <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
