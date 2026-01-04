import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import AddEditRecipe from './pages/AddEditRecipe';
import NotFound from './pages/NotFound';

/**
 * Main App component with routing
 */
function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                        <Route path="/add" element={<AddEditRecipe />} />
                        <Route path="/edit/:id" element={<AddEditRecipe />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
