import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminDashboard from "./pages/AdminDashboard";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

/** Lightweight page view tracker — fires on every route change */
function PageViewTracker() {
  const [location] = useLocation();
  const trackPageView = trpc.analytics.pageView.useMutation();

  useEffect(() => {
    trackPageView.mutate({
      path: location,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <PageViewTracker />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/privacy"} component={PrivacyPolicy} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
