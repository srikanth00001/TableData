"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          {t("language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          {t("language.spanish")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ta")}>
          {t("language.tamil")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}