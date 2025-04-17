import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/app/page";

type RecipeCardProps = {
  recipe: Recipe;
};
const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={300}
        height={200}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold">{recipe.strArea}</h3>
      <Link href={`/recipe/${recipe.idMeal}`
        
      }
      className="text-blue-500 mt-2 inline-block"
      >View Recipe</Link>
    </div>
  );
};

export default RecipeCard;
