import { OpenTalentContainer } from "@/src/feature/landing/profile/container/OpenTalentContainer";
import { ProtectedRoute } from "@/src/feature/auth/components/ProtectedRoute";

export default function page() {
  return (
    <ProtectedRoute>
      <OpenTalentContainer />
    </ProtectedRoute>
  );
}
