# Concept

Requests from IMDB | Letterboxd | RottenTomatoes | Allociné

## DB

```typescript
movies {
    id: string;
    type: "movie" | "series";
    title: string;
    year: number;
}
```

```typescript
type MovieSourceType =
    | "Rotten Tomatoes"
    | "Rotten Audience"
    | "IMDB"
    | "Letterboxd"
    | "Allociné";
```

```typescript
rating_sources {
    name: string;
    scale_type: string;
    unit: "points" | "stars" | "percentage";
}
```

```typescript
movie_ratings {
    id: string;
    movieId: string;
    sourceId: string;
    original_score: string;
    extra: string;
    last_updated: Date;
}
```
