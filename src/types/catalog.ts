export type CategoryId =
  | "wigs"
  | "bundles"
  | "closures"
  | "frontals"
  | "braidingHair"
  | "hairCare"
  | "accessories";

export type Category = {
  id: CategoryId;
  title: string;
  benefit: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  benefit: string;
  image: string;
  /** Indicative price in GHS for cart & checkout (final price confirmed by store). */
  priceGhs?: number;
  featured?: boolean;
  deal?: boolean;
  priceLabel?: string;
};

export type Catalog = {
  categories: Category[];
  products: Product[];
};
