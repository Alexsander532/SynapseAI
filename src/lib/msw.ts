/**
 * Inicializador do Mock Service Worker
 * Este arquivo é responsável por inicializar o MSW de forma assíncrona
 */

/**
 * Função para inicializar o MSW
 * Importa dinamicamente o MSW apenas quando necessário (desenvolvimento)
 */
export const initMSW = async () => {
  // Só executa em desenvolvimento e no browser
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('🔧 Configurando Mock Service Worker...');
    
    try {
      // Importação dinâmica para evitar incluir MSW no bundle de produção
      const { startMSW } = await import('@/mocks/browser');
      await startMSW();
    } catch (error) {
      console.error('❌ Falha ao inicializar MSW:', error);
    }
  }
};