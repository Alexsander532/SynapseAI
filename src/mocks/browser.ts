/**
 * Configuração do Mock Service Worker para o browser
 * Este arquivo configura o MSW para interceptar requisições no navegador durante o desenvolvimento
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * Cria e configura o worker do MSW
 * O worker roda em background no browser e intercepta todas as requisições HTTP
 */
export const worker = setupWorker(...handlers);

/**
 * Função para inicializar o MSW no browser
 * Deve ser chamada antes de qualquer requisição HTTP
 */
export const startMSW = async () => {
  // Só inicia o MSW em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Iniciando Mock Service Worker...');
    
    try {
      await worker.start({
        // Configurações do worker
        onUnhandledRequest: 'warn', // Avisa sobre requisições não interceptadas
        serviceWorker: {
          // Caminho para o service worker (será criado automaticamente)
          url: '/mockServiceWorker.js',
        },
      });
      
      console.log('✅ Mock Service Worker iniciado com sucesso!');
      console.log('📡 Interceptando requisições para:', handlers.length, 'endpoints');
    } catch (error) {
      console.error('❌ Erro ao iniciar MSW:', error);
    }
  }
};