export interface Notice {
  id?: string; // Firestore 문서 ID
  title: string;
  content: string;
  category: string;
  date: string; // ISO 문자열 형식 (YYYY-MM-DD)
  createdAt: Date; // 타임스탬프
  updatedAt: Date; // 타임스탬프
  authorId: string; // 작성자 ID
  authorName?: string; // 작성자 이름
} 