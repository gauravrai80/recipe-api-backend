import { useNavigate } from 'react-router-dom';
import { Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * Recipe card component for displaying recipe summary
 */
const RecipeCard = ({ recipe, onDelete }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/recipe/${recipe._id}`);
    };

    const handleEdit = () => {
        navigate(`/edit/${recipe._id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(recipe);
    };

    return (
        <Card className="h-full flex flex-col overflow-hidden cursor-pointer" onClick={handleView}>
            {/* Recipe Image */}
            {recipe.image && (
                <div className="w-full h-48 overflow-hidden bg-muted">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2">
                        {recipe.title}
                    </CardTitle>
                    {recipe.cookingTime && (
                        <Badge variant="secondary" className="shrink-0 gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.cookingTime}m
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-1 pb-3">
                <div className="space-y-2">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Ingredients</p>
                        <p className="text-sm line-clamp-2">
                            {recipe.ingredients.slice(0, 3).join(', ')}
                            {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Instructions</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {recipe.instructions}
                        </p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-3 border-t gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleView();
                    }}
                >
                    <Eye className="h-4 w-4" />
                    View
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                >
                    <Edit className="h-4 w-4" />
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RecipeCard;
