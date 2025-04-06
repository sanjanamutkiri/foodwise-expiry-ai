
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
}

interface MealSuggestionsProps {
  recipes: Recipe[];
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ recipes }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Meal Suggestions Based on Your Inventory</h2>
      <p className="text-sm text-muted-foreground">
        Use these items before they expire with these recipe ideas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{recipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="bg-muted px-2 py-1 rounded text-muted-foreground">
                  {recipe.difficulty}
                </span>
                <span className="text-muted-foreground">{recipe.prepTime}</span>
              </div>
              <p className="text-sm font-medium mt-2">Ingredients you have:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {recipe.ingredients.map((ingredient, idx) => (
                  <span 
                    key={idx} 
                    className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealSuggestions;
