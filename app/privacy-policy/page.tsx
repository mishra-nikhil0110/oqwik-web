import { LegalPage } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPolicy } from "@/lib/legal/privacy";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, webPageSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata(routes.privacy, {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema(routes.privacy, { title: privacyPolicy.title, description: privacyPolicy.description }))} />
      <LegalPage doc={privacyPolicy} related={{ href: routes.terms.path, label: routes.terms.name }} />
    </>
  );
}
