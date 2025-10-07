import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
export declare class FavoritesService {
    private favoritesRepository;
    constructor(favoritesRepository: Repository<Favorite>);
    getAllFavorites(): Promise<Favorite[]>;
    addFavorite(movie: any): Promise<Favorite | {
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
