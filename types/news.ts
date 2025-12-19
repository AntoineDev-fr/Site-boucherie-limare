export type NewsItem = {
  id: number;
  titre: string;
  petite_description: string | null;
  longue_description: string;
  image: string | null;
  pdf: string | null;
  epingle: number;
  created_at: string;
};
