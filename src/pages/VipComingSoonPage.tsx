import { Navigate, useLocation } from "react-router-dom";
import { isVipComingSoonPath, vipComingSoonContent } from "../data/vipPages";
import "./VipComingSoonPage.css";

export function VipComingSoonPage() {
  const { pathname } = useLocation();

  if (!isVipComingSoonPath(pathname)) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="vip-page section" aria-labelledby="vip-page-title">
      <div className="container vip-page__inner">
        <header className="vip-page__header">
          <h2 className="vip-page__brand">{vipComingSoonContent.brand}</h2>
          <span className="vip-page__badge">{vipComingSoonContent.badge}</span>
          <h1 id="vip-page-title" className="vip-page__title">
            {vipComingSoonContent.title}
          </h1>
          <p className="vip-page__rule" aria-hidden="true" />
          <p className="vip-page__subheading">{vipComingSoonContent.subheading}</p>
          <p className="vip-page__tagline">{vipComingSoonContent.tagline}</p>
        </header>
      </div>
    </section>
  );
}
