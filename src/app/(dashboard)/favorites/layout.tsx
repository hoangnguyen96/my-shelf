import { SkeletonSearchList } from "@app/components";
import { MyBookShelfLayout } from "@app/layouts";
import { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <MyBookShelfLayout>
    <Suspense fallback={<SkeletonSearchList />}>{children}</Suspense>
  </MyBookShelfLayout>
);

export default Layout;
