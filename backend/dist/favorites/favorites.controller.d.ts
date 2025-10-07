import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(): any[];
    addFavorite(movie: any): any;
    removeFavorite(imdbID: string): {
        error: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
    };
}
