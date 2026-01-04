import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ChefHat } from 'lucide-react';

/**
 * 404 Not Found page
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="container flex items-center justify-center min-h-[calc(100vh-4rem)]"
        >
            <div
                className="text-center space-y-6 max-w-md"
            >
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-8">
                        <ChefHat className="h-24 w-24 text-primary" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-6xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Oops! The recipe you're looking for doesn't exist.
                        It might have been removed or the URL might be incorrect.
                    </p>
                </div>

                <Button
                    size="lg"
                    onClick={() => navigate('/')}
                    className="gap-2"
                >
                    <Home className="h-5 w-5" />
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
