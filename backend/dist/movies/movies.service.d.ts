export declare class MoviesService {
    private readonly apiKey;
    private readonly baseUrl;
    searchMovies(query: string): Promise<{
        movies: never[];
        error: any;
    } | {
        movies: any;
        error?: undefined;
    }>;
}
