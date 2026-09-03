import { ProtectedRoute } from "@/src/feature/auth/components/ProtectedRoute";
import { OpenTalentFormContainer } from "@/src/feature/landing/open-talent/container/OpenTalentFormContainer";

export default function OpenTalentPage() {
  return (
    <ProtectedRoute>
      <OpenTalentFormContainer />
    </ProtectedRoute>
  );
}
