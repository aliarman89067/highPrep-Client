import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}) {
  return (
    <section className={cn(classNames, "max-w-6xl mx-auto w-full")}>
      {children}
    </section>
  );
}
