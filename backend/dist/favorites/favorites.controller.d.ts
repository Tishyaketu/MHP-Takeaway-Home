import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(): Promise<import("./favorite.entity").Favorite[]>;
    addFavorite(movie: any): Promise<import("./favorite.entity").Favorite | {
        error: string;
    }>;
    removeFavorite(imdbID: string): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
    }>;
}
