import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/routes';
import '@/index.css';
import { ThemeProvider } from '@/contexts/theme-context';
import { Toaster } from '@/components/ui/sonner';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
