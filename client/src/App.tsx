import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import MarketingLanding from "./pages/MarketingLanding";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminDashboard from "./pages/AdminDashboard";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Demo from "./pages/Demo";
import CaseStudies from "./pages/CaseStudies";
import Resources from "./pages/Resources";
import ThankYou from "./pages/ThankYou";
import VsBookingCom from "./pages/VsBookingCom";
import VsExpedia from "./pages/VsExpedia";
import Alternatives from "./pages/Alternatives";
import BestHotelChatbot from "./pages/BestHotelChatbot";
import WhatIsNightDesk from "./pages/WhatIsNightDesk";
import BoutiqueHotels from "./pages/hotels/BoutiqueHotels";
import BedAndBreakfast from "./pages/hotels/BedAndBreakfast";
import IndependentHotels from "./pages/hotels/IndependentHotels";
import SmallHotelChains from "./pages/hotels/SmallHotelChains";
import London from "./pages/location/London";
import Paris from "./pages/location/Paris";
import NewYork from "./pages/location/NewYork";
import Barcelona from "./pages/location/Barcelona";
import Dubai from "./pages/location/Dubai";
import Amsterdam from "./pages/location/Amsterdam";
import Rome from "./pages/location/Rome";
import Miami from "./pages/location/Miami";
import Lisbon from "./pages/location/Lisbon";
import Tokyo from "./pages/location/Tokyo";
import AiReceptionist from "./pages/AiReceptionist";
import GoogleAds from "./pages/GoogleAds";
import DirectBooking from "./pages/DirectBooking";
import CompletePackage from "./pages/CompletePackage";
import WhyHotelsLoseBookingsToOtas from "./pages/blog/WhyHotelsLoseBookingsToOtas";
import WhatIsAiReceptionistForHotels from "./pages/blog/WhatIsAiReceptionistForHotels";
import GoogleAdsForHotels from "./pages/blog/GoogleAdsForHotels";
import TrueCostOfBookingComCommission from "./pages/blog/TrueCostOfBookingComCommission";
import DirectBookingVsOta from "./pages/blog/DirectBookingVsOta";

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
        <Route path={"/"} component={MarketingLanding} />
        <Route path={"/home-v1"} component={Home} />
        <Route path={"/privacy"} component={PrivacyPolicy} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/about"} component={About} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/demo"} component={Demo} />
        <Route path={"/case-studies"} component={CaseStudies} />
        <Route path={"/resources"} component={Resources} />
        <Route path={"/thank-you"} component={ThankYou} />
        <Route path={"/vs-booking-com"} component={VsBookingCom} />
        <Route path={"/vs-expedia"} component={VsExpedia} />
        <Route path={"/alternatives"} component={Alternatives} />
        <Route path={"/best-hotel-chatbot-2026"} component={BestHotelChatbot} />
        <Route path={"/what-is-nightdesk"} component={WhatIsNightDesk} />
        <Route path={"/hotels/boutique-hotels"} component={BoutiqueHotels} />
        <Route path={"/hotels/bed-and-breakfast"} component={BedAndBreakfast} />
        <Route path={"/hotels/independent-hotels"} component={IndependentHotels} />
        <Route path={"/hotels/small-hotel-chains"} component={SmallHotelChains} />
        <Route path={"/location/london"} component={London} />
        <Route path={"/location/paris"} component={Paris} />
        <Route path={"/location/new-york"} component={NewYork} />
        <Route path={"/location/barcelona"} component={Barcelona} />
        <Route path={"/location/dubai"} component={Dubai} />
        <Route path={"/location/amsterdam"} component={Amsterdam} />
        <Route path={"/location/rome"} component={Rome} />
        <Route path={"/location/miami"} component={Miami} />
        <Route path={"/location/lisbon"} component={Lisbon} />
        <Route path={"/location/tokyo"} component={Tokyo} />
        <Route path={"/ai-receptionist"} component={AiReceptionist} />
        <Route path={"/google-ads"} component={GoogleAds} />
        <Route path={"/direct-booking"} component={DirectBooking} />
        <Route path={"/complete-package"} component={CompletePackage} />
        <Route path={"/blog/why-hotels-lose-bookings-to-otas"} component={WhyHotelsLoseBookingsToOtas} />
        <Route path={"/blog/what-is-ai-receptionist-for-hotels"} component={WhatIsAiReceptionistForHotels} />
        <Route path={"/blog/google-ads-for-hotels"} component={GoogleAdsForHotels} />
        <Route path={"/blog/true-cost-of-booking-com-commission"} component={TrueCostOfBookingComCommission} />
        <Route path={"/blog/direct-booking-vs-ota"} component={DirectBookingVsOta} />
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
