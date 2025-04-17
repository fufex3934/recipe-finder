"use client";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState, useCallback } from "react";

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!search) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEALDB_API_URL}/search.php?s=${search}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search recipes..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
