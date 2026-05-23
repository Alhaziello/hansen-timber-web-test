/**
 * @file SpeciesCardGrid.tsx
 * @description Displays a static grid of timber species options available for a specific product.
 * Handles the visual presentation and deep-linking into species-specific nested product pages.
 * @dependencies next/image, next/link
 * @state Stateless functional component, relies on props passed from ProductDisplay.
 */
/* eslint-disable */
import Link from "next/link";
import Image from "next/image";

interface VariantImage {
  url: string;
  hotspot?: any;
  crop?: any;
}

interface Species {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  tagline?: string;
  features?: string[];
}

interface BoardOption {
  species: Species;
  sizes?: string[];
  notes?: string;
  variantImages?: VariantImage[];
  variantDescription?: string;
}

/**
 * Configuration properties for the SpeciesCardGrid component.
 */
interface SpeciesCardGridProps {
  /** Complex board options array combining species with available dimensions and variant imagery. */
  boardOptions?: BoardOption[];
  /** Simpler fallback array of standalone species objects. */
  species?: Species[];
  /** The parent category slug used for constructing the deep-link URL. */
  categorySlug: string;
  /** The parent product slug used for constructing the deep-link URL. */
  productSlug: string;
}

/**
 * Renders a grid of cards representing the different timber species variants available for a product.
 */
export default function SpeciesCardGrid({
  boardOptions,
  species,
  categorySlug,
  productSlug,
}: SpeciesCardGridProps) {
  // NOTE: Unify `boardOptions` (which contain rich dimension/variant data) and `species` 
  // (which is just a basic list) into a single, predictable `items` array for rendering.
  // EDGE CASE: If a product only defines a basic `species` array, we map it into the shape of a `BoardOption`.
  const items: BoardOption[] = boardOptions && boardOptions.length > 0
    ? boardOptions
    : (species || []).map((s) => ({
        species: s,
        sizes: [],
        notes: s.description || s.tagline || "",
      }));

  if (items.length === 0) return null;

  return (
    <div className="w-full pt-16">
      <div className="flex items-center gap-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-charcoal lowercase italic">
          Available Timber Species
        </h2>
        <div className="h-px flex-1 bg-muted-oak/20"></div>
      </div>

      {/* Static Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => {
          const cardImageUrl = item.variantImages?.[0]?.url ?? "/placeholder.png";
          const hasSizes = item.sizes && item.sizes.length > 0;
          const speciesSlug = item.species.slug;

          return (
            <div key={speciesSlug || idx} className="relative aspect-[4/3] w-full">
              <Link
                href={`/products/${categorySlug}/${productSlug}/${speciesSlug}`}
                className="group absolute inset-0 cursor-pointer overflow-hidden rounded-lg border border-muted-oak/10 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-end p-8"
              >
                {/* Background Variant Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={cardImageUrl}
                    alt={item.species.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent group-hover:via-charcoal/20 transition-all duration-500"></div>
                </div>

                {/* Card Meta Content */}
                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-muted-oak">
                    {hasSizes ? `${item.sizes?.length} standard sizes` : "Timber Spec Profile"}
                  </span>
                  <h3 className="text-3xl font-serif text-sand lowercase italic">
                    {item.species.name}
                  </h3>
                  {item.notes && (
                    <p className="text-xs text-sand/70 font-sans line-clamp-1 group-hover:text-sand transition-colors">
                      {item.notes}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
