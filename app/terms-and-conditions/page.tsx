import { LegalPage } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { termsAndConditions } from "@/lib/legal/terms";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, webPageSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata(routes.terms, {
  title: termsAndConditions.title,
  description: termsAndConditions.description,
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={graph(webPageSchema(routes.terms, { title: termsAndConditions.title, description: termsAndConditions.description }))}
      />
      <LegalPage doc={termsAndConditions} related={{ href: routes.privacy.path, label: routes.privacy.name }} />
    </>
  );
}
