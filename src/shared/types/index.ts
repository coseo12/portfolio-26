// 공통 타입 정의
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};
