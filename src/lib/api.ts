/**
 * Cliente HTTP centralizado para comunicação com a API
 * Este arquivo fornece uma interface unificada para todas as requisições HTTP
 */

import { 
  LoginRequest, 
  LoginResponse, 
  SignupRequest, 
  SignupResponse, 
  ForgotPasswordRequest, 
  ForgotPasswordResponse,
  ApiResponse 
} from '@/types/auth';

// Configuração base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Classe para gerenciar requisições HTTP
 * Centraliza toda a lógica de comunicação com a API
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Método genérico para fazer requisições HTTP
   * @param endpoint - Endpoint da API (ex: '/auth/login')
   * @param options - Opções da requisição (método, body, headers, etc.)
   * @returns Promise com a resposta da API
   */
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Obtém o token de autorização do localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    // Configurações padrão da requisição
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🚀 Fazendo requisição para: ${url}`);
      console.log('📋 Configurações:', config);

      const response = await fetch(url, config);
      const data = await response.json();

      console.log(`📥 Resposta recebida:`, data);

      // Se a resposta não for ok, retorna erro
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Erro na requisição',
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      return {
        success: false,
        message: 'Erro de conexão com o servidor',
      };
    }
  }

  /**
   * Realiza login do usuário
   * @param credentials - Email e senha do usuário
   * @returns Promise com dados do usuário autenticado
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Realiza cadastro de novo usuário
   * @param userData - Dados do novo usuário
   * @returns Promise com dados do usuário criado
   */
  async signup(userData: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    return this.request<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Solicita recuperação de senha
   * @param email - Email para recuperação
   * @returns Promise com confirmação do envio
   */
  async forgotPassword(email: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> {
    return this.request<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(email),
    });
  }

  /**
   * Obtém dados do usuário atual
   * @returns Promise com dados do usuário
   */
  async getCurrentUser(): Promise<ApiResponse<{ user: any }>> {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  /**
   * Realiza logout do usuário
   * Remove o token do localStorage e opcionalmente faz requisição para o servidor
   * @returns Promise com resposta do logout
   */
  async logout(): Promise<ApiResponse<{}>> {
    try {
      // Remove o token do localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }

      // Opcionalmente, faz requisição para invalidar o token no servidor
      // Em um app real, isso seria importante para segurança
      return {
        success: true,
        message: 'Logout realizado com sucesso',
        data: {}
      };
    } catch (error) {
      console.error('Erro durante logout:', error);
      return {
        success: false,
        message: 'Erro durante logout'
      };
    }
  }
}

// Instância única do cliente API para ser usada em todo o projeto
export const apiClient = new ApiClient();

// Exporta também a classe para casos especiais
export { ApiClient };