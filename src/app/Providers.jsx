"use client";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 10,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <div className="min-h-screen text-slate-800 dark:text-slate-100 select-none transition-colors duration-300">
          {children}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
