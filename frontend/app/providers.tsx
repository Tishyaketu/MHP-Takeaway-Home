// frontend/app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Update frontend/app/layout.tsx to wrap with Providers:
import { Providers } from './providers';

// In the body:
<body>
  <Providers>
    {/* nav and main content */}
  </Providers>
</body>