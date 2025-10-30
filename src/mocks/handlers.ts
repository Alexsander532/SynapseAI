/**
 * Handlers do Mock Service Worker (MSW)
 * Este arquivo define todos os interceptadores de requisições HTTP para desenvolvimento e testes
 */

import { http, HttpResponse } from 'msw';
import { 
  LoginRequest, 
  LoginResponse, 
  SignupRequest, 
  SignupResponse, 
  ForgotPasswordRequest, 
  ForgotPasswordResponse 
} from '@/types/auth';

// Base URL da API (deve corresponder ao que está configurado no cliente)
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Dados mockados de usuários para simulação
 * Em um projeto real, estes dados viriam de um banco de dados
 */
const mockUsers = [
  {
    id: '1',
    email: 'admin@synapseai.com',
    password: 'Admin123!', // Em produção, seria um hash
    name: 'Administrador',
    role: 'admin' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@synapseai.com',
    password: 'User123!',
    name: 'Usuário Teste',
    role: 'user' as const,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

/**
 * Função utilitária para simular delay de rede
 * Torna a experiência mais realista durante o desenvolvimento
 */
const simulateNetworkDelay = () => {
  const delay = Math.random() * 1000 + 500; // Entre 500ms e 1.5s
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Função para gerar token JWT mockado
 * Em produção, seria gerado pelo backend com chave secreta
 */
const generateMockToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    userId, 
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
  }));
  const signature = 'mock-signature';
  return `${header}.${payload}.${signature}`;
};

/**
 * Array de handlers do MSW
 * Cada handler intercepta uma rota específica da API
 */
export const handlers = [
  /**
   * Handler para login de usuário
   * POST /api/auth/login
   */
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    console.log('🔐 MSW: Interceptando requisição de login');
    
    // Simula delay de rede
    await simulateNetworkDelay();

    try {
      const body = await request.json() as LoginRequest;
      console.log('📋 Dados recebidos:', { email: body.email, password: '***' });

      // Validação básica
      if (!body.email || !body.password) {
        console.log('❌ Dados inválidos');
        return HttpResponse.json(
          {
            success: false,
            message: 'Email e senha são obrigatórios',
            errors: {
              email: !body.email ? ['Email é obrigatório'] : [],
              password: !body.password ? ['Senha é obrigatória'] : [],
            }
          },
          { status: 400 }
        );
      }

      // Busca usuário no "banco de dados" mockado
      const user = mockUsers.find(u => u.email === body.email);
      
      if (!user || user.password !== body.password) {
        console.log('❌ Credenciais inválidas');
        return HttpResponse.json(
          {
            success: false,
            message: 'Email ou senha incorretos',
          },
          { status: 401 }
        );
      }

      // Login bem-sucedido
      const token = generateMockToken(user.id);
      const response = {
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        },
      };

      console.log('✅ Login bem-sucedido para:', user.email);
      return HttpResponse.json(response);

    } catch (error) {
      console.error('❌ Erro no handler de login:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Erro interno do servidor',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * Handler para cadastro de usuário
   * POST /api/auth/signup
   */
  http.post(`${API_BASE_URL}/auth/signup`, async ({ request }) => {
    console.log('📝 MSW: Interceptando requisição de cadastro');
    
    await simulateNetworkDelay();

    try {
      const body = await request.json() as SignupRequest;
      console.log('📋 Dados recebidos:', { 
        name: body.name, 
        email: body.email, 
        password: '***' 
      });

      // Validações
      const errors: Record<string, string[]> = {};

      if (!body.name) errors.name = ['Nome é obrigatório'];
      if (!body.email) errors.email = ['Email é obrigatório'];
      if (!body.password) errors.password = ['Senha é obrigatória'];
      if (body.password !== body.confirmPassword) {
        errors.confirmPassword = ['Senhas não coincidem'];
      }

      // Verifica se email já existe
      if (mockUsers.find(u => u.email === body.email)) {
        errors.email = ['Este email já está em uso'];
      }

      if (Object.keys(errors).length > 0) {
        console.log('❌ Dados inválidos:', errors);
        return HttpResponse.json(
          {
            success: false,
            message: 'Dados inválidos',
            errors,
          },
          { status: 400 }
        );
      }

      // Simula criação do usuário
      const newUser = {
        id: String(mockUsers.length + 1),
        email: body.email,
        password: body.password,
        name: body.name,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Adiciona ao "banco de dados" mockado
      mockUsers.push(newUser);

      const response: SignupResponse = {
        success: true,
        message: 'Conta criada com sucesso',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      };

      console.log('✅ Usuário criado com sucesso:', newUser.email);
      return HttpResponse.json(response);

    } catch (error) {
      console.error('❌ Erro no handler de cadastro:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Erro interno do servidor',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * Handler para recuperação de senha
   * POST /api/auth/forgot-password
   */
  http.post(`${API_BASE_URL}/auth/forgot-password`, async ({ request }) => {
    console.log('🔑 MSW: Interceptando requisição de recuperação de senha');
    
    await simulateNetworkDelay();

    try {
      const body = await request.json() as ForgotPasswordRequest;
      console.log('📋 Email para recuperação:', body.email);

      if (!body.email) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Email é obrigatório',
          },
          { status: 400 }
        );
      }

      // Verifica se o email existe (em produção, sempre retornaria sucesso por segurança)
      const user = mockUsers.find(u => u.email === body.email);
      
      if (!user) {
        console.log('❌ Email não encontrado');
        return HttpResponse.json(
          {
            success: false,
            message: 'Email não encontrado',
          },
          { status: 404 }
        );
      }

      const response: ForgotPasswordResponse = {
        success: true,
        message: 'Email de recuperação enviado com sucesso',
      };

      console.log('✅ Email de recuperação "enviado" para:', body.email);
      return HttpResponse.json(response);

    } catch (error) {
      console.error('❌ Erro no handler de recuperação:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Erro interno do servidor',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * Handler para logout
   * POST /api/auth/logout
   */
  http.post(`${API_BASE_URL}/auth/logout`, async () => {
    console.log('🚪 MSW: Interceptando requisição de logout');
    
    await simulateNetworkDelay();

    console.log('✅ Logout realizado com sucesso');
    return HttpResponse.json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  }),

  /**
   * Handler para obter dados do usuário atual
   * GET /api/auth/me
   */
  http.get(`${API_BASE_URL}/auth/me`, async ({ request }) => {
    console.log('👤 MSW: Interceptando requisição de dados do usuário');
    
    await simulateNetworkDelay();

    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Token de acesso não fornecido',
        },
        { status: 401 }
      );
    }

    // Em um cenário real, validaríamos o token JWT
    // Aqui vamos simular retornando o primeiro usuário
    const user = mockUsers[0];

    console.log('✅ Dados do usuário retornados');
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  }),
];