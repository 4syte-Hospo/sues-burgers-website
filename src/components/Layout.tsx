import { Outlet } from "react-router-dom";
import { GoogleAnalytics } from "./analytics/GoogleAnalytics";
import { PageSeo } from "./seo/PageSeo";
import { ScrollToTop } from "./ScrollToTop";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <GoogleAnalytics />
      <ScrollToTop />
      <PageSeo />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
