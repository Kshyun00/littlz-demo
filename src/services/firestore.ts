import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Notice } from '../types/notice';
import { User, UserRole } from '../types/user';

// 컬렉션 참조 상수
const USERS_COLLECTION = 'users';
const NOTICES_COLLECTION = 'notices';

// ===== 사용자 관련 함수 =====

// 사용자 생성 또는 업데이트
export const createOrUpdateUser = async (user: User): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, user.uid);
  await setDoc(userRef, {
    ...user,
    createdAt: serverTimestamp(),
  }, { merge: true });
};

// 사용자 정보 가져오기
export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data() as User;
    return {
      ...userData,
      createdAt: userData.createdAt instanceof Timestamp 
        ? userData.createdAt.toDate() 
        : userData.createdAt
    };
  }

  return null;
};

// 사용자 권한 확인
export const isAdmin = async (uid: string): Promise<boolean> => {
  const user = await getUser(uid);
  return user?.role === UserRole.ADMIN;
};

// 사용자에게 관리자 권한 부여
export const setUserAsAdmin = async (uid: string): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    await updateDoc(userRef, {
      role: UserRole.ADMIN
    });
  } else {
    throw new Error('존재하지 않는 사용자입니다.');
  }
};

// 사용자의 관리자 권한 제거
export const removeAdminRole = async (uid: string): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    await updateDoc(userRef, {
      role: UserRole.USER
    });
  } else {
    throw new Error('존재하지 않는 사용자입니다.');
  }
};

// ===== 공지사항 관련 함수 =====

// 모든 공지사항 가져오기
export const getAllNotices = async (): Promise<Notice[]> => {
  const noticesRef = collection(db, NOTICES_COLLECTION);
  const q = query(noticesRef, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data() as Notice;
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt instanceof Timestamp 
        ? data.createdAt.toDate() 
        : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp 
        ? data.updatedAt.toDate() 
        : data.updatedAt
    };
  });
};

// 공지사항 생성
export const createNotice = async (notice: Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const noticesRef = collection(db, NOTICES_COLLECTION);
  const newNotice = {
    ...notice,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  const docRef = await addDoc(noticesRef, newNotice);
  return docRef.id;
};

// 공지사항 상세 정보 가져오기
export const getNotice = async (id: string): Promise<Notice | null> => {
  const noticeRef = doc(db, NOTICES_COLLECTION, id);
  const noticeDoc = await getDoc(noticeRef);

  if (noticeDoc.exists()) {
    const data = noticeDoc.data() as Notice;
    return {
      ...data,
      id: noticeDoc.id,
      createdAt: data.createdAt instanceof Timestamp 
        ? data.createdAt.toDate() 
        : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp 
        ? data.updatedAt.toDate() 
        : data.updatedAt
    };
  }

  return null;
};

// 공지사항 업데이트
export const updateNotice = async (id: string, noticeData: Partial<Notice>): Promise<void> => {
  const noticeRef = doc(db, NOTICES_COLLECTION, id);
  
  await updateDoc(noticeRef, {
    ...noticeData,
    updatedAt: serverTimestamp()
  });
};

// 공지사항 삭제
export const deleteNotice = async (id: string): Promise<void> => {
  const noticeRef = doc(db, NOTICES_COLLECTION, id);
  await deleteDoc(noticeRef);
};

// 카테고리별 공지사항 가져오기
export const getNoticesByCategory = async (category: string): Promise<Notice[]> => {
  const noticesRef = collection(db, NOTICES_COLLECTION);
  const q = query(
    noticesRef, 
    where('category', '==', category),
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data() as Notice;
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt instanceof Timestamp 
        ? data.createdAt.toDate() 
        : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp 
        ? data.updatedAt.toDate() 
        : data.updatedAt
    };
  });
}; 