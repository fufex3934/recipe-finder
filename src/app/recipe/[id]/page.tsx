'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | undefined;
};

type ErrorState = string | null;

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>(); 
  const [recipe, setRecipe] = useState<Recipe | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<ErrorState>(null); 

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MEALDB_API_URL}/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No recipe found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={500}
        height={300}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p>{recipe.strInstructions}</p>

      <h3 className="text-lg font-semibold mt-4">Ingredients</h3>
      <ul>
        {[...Array(20)].map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          if (ingredient && measure) {
            return (
              <li key={i}>
                {measure} {ingredient}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
