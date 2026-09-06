import { Suspense } from "react";
import OrmawaListContainer from "@/src/feature/ormawa/list/components/OrmawaListContainer";

export const metadata = {
  title: "Daftar Ormawa",
  description: "Daftar seluruh ormawa yang telah mendaftar.",
};

export default function OrmawaListPage() {
  return (
    <Suspense>
      <OrmawaListContainer />
    </Suspense>
  );
}
