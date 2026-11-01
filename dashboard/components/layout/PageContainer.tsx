import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[960px] px-gutter py-space-xl">
      {children}
    </div>
  );
}
