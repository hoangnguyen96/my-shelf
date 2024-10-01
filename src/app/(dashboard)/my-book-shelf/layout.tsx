import { SkeletonMyBookShelf } from "@app/components";
import { MyBookShelfLayout } from "@app/layouts";
import { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <MyBookShelfLayout>
    <Suspense fallback={<SkeletonMyBookShelf />}>{children}</Suspense>
  </MyBookShelfLayout>
);

export default Layout;
