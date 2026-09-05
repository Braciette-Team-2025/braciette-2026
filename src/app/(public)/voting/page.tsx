import { ProtectedRoute } from "@/src/feature/auth/components/ProtectedRoute";
import { VotingContainer } from "@/src/feature/landing/voting/container/VotingContainer";

export default function page() {
  return (
    <ProtectedRoute allowedRoles={["User"]}>
      <VotingContainer />
    </ProtectedRoute>
  );
}
