const express = require('express');
const router = express.Router();
const {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

/**
 * Recipe Routes
 * All routes are prefixed with /api/recipes
 */

// @route   POST /api/recipes
// @desc    Create a new recipe
router.post('/', createRecipe);

// @route   GET /api/recipes
// @desc    Get all recipes
router.get('/', getAllRecipes);

// @route   GET /api/recipes/:id
// @desc    Get single recipe by ID
router.get('/:id', getRecipeById);

// @route   PUT /api/recipes/:id
// @desc    Update recipe by ID
router.put('/:id', updateRecipe);

// @route   DELETE /api/recipes/:id
// @desc    Delete recipe by ID
router.delete('/:id', deleteRecipe);

module.exports = router;
