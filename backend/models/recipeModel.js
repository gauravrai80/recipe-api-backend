const mongoose = require('mongoose');

/**
 * Recipe Schema
 * Defines the structure and validation for recipe documents
 */
const recipeSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: false, // Optional field for recipe image URL
            trim: true
        },
        title: {
            type: String,
            required: [true, 'Recipe title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        ingredients: {
            type: [String],
            required: [true, 'At least one ingredient is required'],
            validate: {
                validator: function (arr) {
                    return arr && arr.length > 0;
                },
                message: 'Recipe must have at least one ingredient'
            }
        },
        instructions: {
            type: String,
            required: [true, 'Cooking instructions are required'],
            trim: true
        },
        cookingTime: {
            type: Number,
            min: [1, 'Cooking time must be at least 1 minute'],
            max: [1440, 'Cooking time cannot exceed 24 hours (1440 minutes)']
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Create and export the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
