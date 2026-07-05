import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="secondary">
        Detail
      </Button>

      <Button size="sm" variant="secondary">
        Edit
      </Button>

      <Button size="sm" variant="destructive">
        Hapus
      </Button>
    </div>
  );
}
