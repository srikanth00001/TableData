// src/app/page.tsx
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslations } from "next-intl";

export default function Translation() {
  const t = useTranslations("HomePage")
  const th = useTranslations("TabTitle");
  return (
    <div>
      <h3 className="text-3xl font-bold text-blue text-center mt-8">{th("home")}</h3>
      <div className="flex justify-center mt-4">
        <ModeToggle />
      </div>

      <div>
        <ol>
          <li className="mb-2">
{t("list1")}

          </li>
          <li>
{t("list2")}
          </li>
        </ol>
      </div>
    </div>
  );
}