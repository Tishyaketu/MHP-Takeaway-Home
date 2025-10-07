export declare class FavoritesService {
    private favorites;
    constructor();
    getAllFavorites(): any[];
    addFavorite(movie: any): any;
    removeFavorite(imdbID: string): {
        error: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
    };
}
