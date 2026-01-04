const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');

/**
 * @desc    Create a new recipe
 * @route   POST /api/recipes
 * @access  Public
 */
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime } = req.body;

        // Validate required fields
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, ingredients, and instructions'
            });
        }

        // Validate ingredients is an array
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Ingredients must be a non-empty array'
            });
        }

        // Create new recipe
        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            cookingTime
        });

        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            data: recipe
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating recipe',
            error: error.message
        });
    }
};

/**
 * @desc    Get all recipes
 * @route   GET /api/recipes
 * @access  Public
 */
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recipes',
            error: error.message
        });
    }
};

/**
 * @desc    Get single recipe by ID
 * @route   GET /api/recipes/:id
 * @access  Public
 */
const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid recipe ID format'
            });
        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recipe',
            error: error.message
        });
    }
};

/**
 * @desc    Update recipe by ID
 * @route   PUT /api/recipes/:id
 * @access  Public
 */
const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, ingredients, instructions, cookingTime } = req.body;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid recipe ID format'
            });
        }

        // Validate ingredients if provided
        if (ingredients && (!Array.isArray(ingredients) || ingredients.length === 0)) {
            return res.status(400).json({
                success: false,
                message: 'Ingredients must be a non-empty array'
            });
        }

        const recipe = await Recipe.findByIdAndUpdate(
            id,
            { title, ingredients, instructions, cookingTime },
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Recipe updated successfully',
            data: recipe
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating recipe',
            error: error.message
        });
    }
};

/**
 * @desc    Delete recipe by ID
 * @route   DELETE /api/recipes/:id
 * @access  Public
 */
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid recipe ID format'
            });
        }

        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully',
            data: recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while deleting recipe',
            error: error.message
        });
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};
