import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    search(query: string): Promise<{
        movies: never[];
        error: any;
    } | {
        movies: any;
        error?: undefined;
    }>;
}
