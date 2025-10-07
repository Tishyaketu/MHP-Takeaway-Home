import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    search(query: string, page?: string): Promise<{
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
