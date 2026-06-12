import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AllergenInfoPage } from "./pages/AllergenInfoPage";
import { ContactPage } from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";
import { FaqPage } from "./pages/FaqPage";
import { HomePage } from "./pages/HomePage";
import { LocationsPage } from "./pages/LocationsPage";
import { MenuPage } from "./pages/MenuPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { VipComingSoonPage } from "./pages/VipComingSoonPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-menu" element={<MenuPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/allergen-info" element={<AllergenInfoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/suesprivacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="/sues-vip" element={<VipComingSoonPage />} />
          <Route path="/sues-vip-terms-and-conditions" element={<VipComingSoonPage />} />
          <Route path="/suesviptsandcs" element={<VipComingSoonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
