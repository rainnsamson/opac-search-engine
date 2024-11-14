// types.ts (or wherever you define types)3

// types.ts (or wherever you define types)
export interface SearchResultsProps {
  results: Book[];
  loading: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  callNumber: string;
  copyright: string;
  location: string;
  availability: number;
}
