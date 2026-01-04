import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * Navigation link component
 */
const NavLink = ({ to, children, className }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className="relative">
            <span
                className={cn(
                    "text-sm font-medium hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground",
                    className
                )}
            >
                {children}
            </span>
            {isActive && (
                <div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
            )}
        </Link>
    );
};

export default NavLink;
