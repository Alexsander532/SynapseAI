/**
 * Tipos relacionados à autenticação
 * Este arquivo define todas as interfaces e tipos usados nas operações de autenticação
 */

// Tipo para dados de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Tipo para resposta de login bem-sucedido
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'user';
    };
    token: string;
  };
}

// Tipo para dados de cadastro
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipo para resposta de cadastro
export interface SignupResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Tipo para solicitação de recuperação de senha
export interface ForgotPasswordRequest {
  email: string;
}

// Tipo para resposta de recuperação de senha
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// Tipo para resposta de erro da API
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Tipo para resposta de sucesso da API
export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

// Tipo genérico para respostas da API
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Tipo para usuário autenticado
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}