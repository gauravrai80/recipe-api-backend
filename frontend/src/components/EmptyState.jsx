import { ChefHat, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * Empty state component for when no recipes exist
 */
const EmptyState = ({
    title = 'No recipes found',
    description = 'Get started by creating your first recipe!',
    showAction = true
}) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col items-center justify-center min-h-[500px] gap-6 px-4"
        >
            <div className="rounded-full bg-primary/10 p-6">
                <ChefHat className="h-16 w-16 text-primary" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-muted-foreground max-w-md">{description}</p>
            </div>

            {showAction && (
                <Button
                    onClick={() => navigate('/add')}
                    size="lg"
                    className="gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Create Your First Recipe
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
