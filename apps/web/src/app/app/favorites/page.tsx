import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function FavoritesPage() {
  // Mock data
  const favorites: Array<{
    id: string;
    from: string;
    to: string;
    name: string;
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          Favorites
        </h1>
        <p className="text-ink-muted mt-1">
          Your saved conversion pairs for quick access.
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Star className="w-8 h-8" />}
          title="No favorites yet"
          description="Save your frequently used conversions for quick access."
        />
      ) : (
        <div className="space-y-2">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center gap-4 p-4 bg-surface border border-rule rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Badge variant="accent">{fav.from}</Badge>
                <ArrowRight className="w-3 h-3 text-ink-faint" />
                <Badge variant="default">{fav.to}</Badge>
              </div>
              <p className="flex-1 text-sm text-ink">{fav.name}</p>
              <Button variant="ghost" size="sm">
                Convert
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
