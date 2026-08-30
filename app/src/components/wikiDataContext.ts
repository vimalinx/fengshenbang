import { createContext, useContext } from 'react';

export interface WikiDataState {
  source: 'wiki' | 'snapshot';
  lastModified: string | null;
  warnings: string[];
  error: string | null;
}

export const WikiDataContext = createContext<WikiDataState>({
  source: 'snapshot',
  lastModified: null,
  warnings: [],
  error: null,
});

export function useWikiData(): WikiDataState {
  return useContext(WikiDataContext);
}
