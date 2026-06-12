import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getPageSeoConfig } from "../../data/seo";
import { applyPageMeta } from "../../utils/pageMeta";
import { buildJsonLdDocument, getStructuredDataForPath } from "../../utils/structuredData";

export function PageSeo() {
  const { pathname } = useLocation();
  const config = useMemo(() => getPageSeoConfig(pathname), [pathname]);
  const jsonLd = useMemo(
    () => buildJsonLdDocument(getStructuredDataForPath(pathname)),
    [pathname],
  );

  useEffect(() => {
    applyPageMeta(config);
  }, [config]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
