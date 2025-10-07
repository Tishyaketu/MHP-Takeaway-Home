export declare class MoviesService {
    private readonly apiKey;
    private readonly baseUrl;
    searchMovies(query: string, page?: number): Promise<{
        movies: never[];
        error: any;
        totalResults: number;
        currentPage: number;
        totalPages: number;
    } | {
        movies: any;
        totalResults: number;
        currentPage: number;
        totalPages: number;
        error?: undefined;
    }>;
}
