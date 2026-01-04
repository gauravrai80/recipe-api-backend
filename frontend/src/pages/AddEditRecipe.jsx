import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from '@/services/api';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';

/**
 * Add/Edit recipe page - form for creating or updating recipes
 */
const AddEditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        ingredients: [''],
        instructions: '',
        cookingTime: ''
    });
    const [errors, setErrors] = useState({});

    // Fetch recipe data if editing
    useEffect(() => {
        if (isEditMode) {
            fetchRecipe();
        }
    }, [id]);

    const fetchRecipe = async () => {
        try {
            setLoading(true);
            const response = await recipeService.getRecipeById(id);
            const recipe = response.data;
            setFormData({
                title: recipe.title,
                image: recipe.image || '',
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                cookingTime: recipe.cookingTime || ''
            });
        } catch (err) {
            alert(`Failed to load recipe: ${err.message}`);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
        if (errors.ingredients) {
            setErrors(prev => ({ ...prev, ingredients: '' }));
        }
    };

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, '']
        }));
    };

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            setFormData(prev => ({
                ...prev,
                ingredients: prev.ingredients.filter((_, i) => i !== index)
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        const validIngredients = formData.ingredients.filter(i => i.trim());
        if (validIngredients.length === 0) {
            newErrors.ingredients = 'At least one ingredient is required';
        }

        if (!formData.instructions.trim()) {
            newErrors.instructions = 'Instructions are required';
        }

        if (formData.cookingTime && (isNaN(formData.cookingTime) || formData.cookingTime < 1)) {
            newErrors.cookingTime = 'Cooking time must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);

            // Prepare data
            const recipeData = {
                title: formData.title.trim(),
                ...(formData.image.trim() && { image: formData.image.trim() }),
                ingredients: formData.ingredients.filter(i => i.trim()),
                instructions: formData.instructions.trim(),
                ...(formData.cookingTime && { cookingTime: parseInt(formData.cookingTime) })
            };

            if (isEditMode) {
                await recipeService.updateRecipe(id, recipeData);
            } else {
                await recipeService.createRecipe(recipeData);
            }

            navigate('/');
        } catch (err) {
            alert(`Failed to ${isEditMode ? 'update' : 'create'} recipe: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Loader message="Loading recipe..." />;
    }

    return (
        <div
            className="container py-12 max-w-3xl"
        >
            {/* Back Button */}
            <Button
                variant="ghost"
                className="mb-6 gap-2"
                onClick={() => navigate(isEditMode ? `/recipe/${id}` : '/')}
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                    {isEditMode ? 'Edit Recipe' : 'Create New Recipe'}
                </h1>
                <p className="text-muted-foreground">
                    {isEditMode ? 'Update your recipe details below' : 'Fill in the details to create a new recipe'}
                </p>
            </div>

            {/* Form */}
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Recipe Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Recipe Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Chocolate Chip Cookies"
                                    className={errors.title ? 'border-destructive' : ''}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label htmlFor="image">Recipe Image URL</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="e.g., https://example.com/image.jpg"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Optional: Add a URL to an image of your recipe
                                </p>
                            </div>

                            {/* Cooking Time */}
                            <div className="space-y-2">
                                <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
                                <Input
                                    id="cookingTime"
                                    name="cookingTime"
                                    type="number"
                                    min="1"
                                    value={formData.cookingTime}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 30"
                                    className={errors.cookingTime ? 'border-destructive' : ''}
                                />
                                {errors.cookingTime && (
                                    <p className="text-sm text-destructive">{errors.cookingTime}</p>
                                )}
                            </div>

                            {/* Ingredients */}
                            <div className="space-y-2">
                                <Label>
                                    Ingredients <span className="text-destructive">*</span>
                                </Label>
                                <div className="space-y-2">
                                    {formData.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={ingredient}
                                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                                placeholder={`Ingredient ${index + 1}`}
                                                className={errors.ingredients ? 'border-destructive' : ''}
                                            />
                                            {formData.ingredients.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => removeIngredient(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addIngredient}
                                    className="gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Ingredient
                                </Button>
                                {errors.ingredients && (
                                    <p className="text-sm text-destructive">{errors.ingredients}</p>
                                )}
                            </div>

                            {/* Instructions */}
                            <div className="space-y-2">
                                <Label htmlFor="instructions">
                                    Instructions <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="instructions"
                                    name="instructions"
                                    value={formData.instructions}
                                    onChange={handleInputChange}
                                    placeholder="Describe the cooking steps..."
                                    rows={8}
                                    className={errors.instructions ? 'border-destructive' : ''}
                                />
                                {errors.instructions && (
                                    <p className="text-sm text-destructive">{errors.instructions}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(isEditMode ? `/recipe/${id}` : '/')}
                                    disabled={submitting}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {submitting ? 'Saving...' : (isEditMode ? 'Update Recipe' : 'Create Recipe')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddEditRecipe;
