import { Link } from 'react-router-dom';
import { ChefHat, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from './NavLink';

/**
 * Main navigation bar component
 */
const Navbar = () => {
    return (
        <nav
            className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div>
                        <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Recipes App
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <NavLink to="/">Home</NavLink>

                    <Link to="/add">
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Recipe
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
