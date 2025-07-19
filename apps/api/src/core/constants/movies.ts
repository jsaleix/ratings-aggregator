export const MovieRatingsStatus = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
} as const;

type ObjectValues<T> = T[keyof T];
export type MovieRatingsStatusType = ObjectValues<typeof MovieRatingsStatus>;
