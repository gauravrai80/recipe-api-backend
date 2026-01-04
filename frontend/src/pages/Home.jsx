import { useState, useEffect } from 'react';
import recipeService from '@/services/api';
import RecipeCard from '@/components/RecipeCard';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * Home page - displays all recipes
 */
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, recipe: null });
    const [deleting, setDeleting] = useState(false);

    // Fetch recipes on mount
    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await recipeService.getAllRecipes();
            setRecipes(response.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (recipe) => {
        setDeleteModal({ isOpen: true, recipe });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.recipe) return;

        try {
            setDeleting(true);
            await recipeService.deleteRecipe(deleteModal.recipe._id);

            // Remove from local state
            setRecipes(recipes.filter(r => r._id !== deleteModal.recipe._id));

            // Close modal
            setDeleteModal({ isOpen: false, recipe: null });
        } catch (err) {
            alert(`Failed to delete recipe: ${err.message}`);
        } finally {
            setDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, recipe: null });
    };

    if (loading) {
        return <Loader message="Loading recipes..." />;
    }

    if (error) {
        return (
            <div className="container py-12">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <h3 className="text-xl font-semibold">Error Loading Recipes</h3>
                    <p className="text-muted-foreground">{error}</p>
                    <Button onClick={fetchRecipes}>Try Again</Button>
                </div>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="container py-12">
                <EmptyState />
            </div>
        );
    }

    return (
        <div className="container py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">All Recipes</h1>
                <p className="text-muted-foreground">
                    Discover and manage your collection of {recipes.length} delicious {recipes.length === 1 ? 'recipe' : 'recipes'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteCancel}
                title="Delete Recipe"
                footer={
                    <>
                        <Button variant="outline" onClick={handleDeleteCancel} disabled={deleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleting}>
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </>
                }
            >
                <p>
                    Are you sure you want to delete <strong>{deleteModal.recipe?.title}</strong>?
                    This action cannot be undone.
                </p>
            </Modal>
        </div>
    );
};

export default Home;
