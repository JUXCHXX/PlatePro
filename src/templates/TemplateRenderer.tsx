import type { TemplateData } from "./shared";
import type { TemplateId } from "@/types";
import Template1 from "./Template1";
import BaseTemplate, { Variant } from "./BaseTemplate";

const VARIANT_MAP: Record<Exclude<TemplateId, "template_1">, Variant> = {
  template_2: "fresco",
  template_3: "noche",
  template_4: "minimal",
  template_5: "street",
  template_6: "mar",
  template_7: "pizza",
  template_8: "cafe",
  template_9: "fast",
  template_10: "tradicional",
};

export function TemplateRenderer({ data }: { data: TemplateData }) {
  const id = data.restaurant.template_id;
  if (id === "template_1") return <Template1 data={data} />;
  return <BaseTemplate data={data} variant={VARIANT_MAP[id]} />;
}
