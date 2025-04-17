"use client";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEALDB_API_URL}/search.php?s=${search}`
      );
      const data = await res.json();
      console.log(data)
      
      setRecipes(data.meals || []);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);
  return <div>
    <input type="text" 
    placeholder="Search recipes..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    />
    {loading && <div>Loading...</div>}
    {error && <div>{error}</div>}
    <div>
      {
        recipes.map((recipe,index)=>(
          <RecipeCard key={recipe.idMeal} recipe={recipe}/>
        ))
      }
    </div>
  </div>;
}
