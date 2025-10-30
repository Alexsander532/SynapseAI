/**
 * Provider do Mock Service Worker
 * Este componente inicializa o MSW no lado do cliente de forma assíncrona
 */

'use client';

import { useEffect, useState } from 'react';
import { initMSW } from '@/lib/msw';

interface MSWProviderProps {
  children: React.ReactNode;
}

/**
 * Componente que inicializa o MSW antes de renderizar os filhos
 * Garante que o MSW esteja ativo antes de qualquer requisição HTTP
 */
export function MSWProvider({ children }: MSWProviderProps) {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    const setupMSW = async () => {
      // Só executa no browser e em desenvolvimento
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('🔄 Inicializando MSW Provider...');
        
        try {
          await initMSW();
          console.log('✅ MSW Provider pronto!');
        } catch (error) {
          console.error('❌ Erro no MSW Provider:', error);
        }
      }
      
      // Marca como pronto independentemente do ambiente
      setIsMSWReady(true);
    };

    setupMSW();
  }, []);

  // Em desenvolvimento, aguarda o MSW estar pronto
  // Em produção, renderiza imediatamente
  if (process.env.NODE_ENV === 'development' && !isMSWReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Inicializando Mock Service Worker...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}