import Image from "next/image"
import Link from "next/link"
const RecipeCard = ({recipe}) => {
  return (
    <div>
        <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={300}
        height={200}
        />
        <h3>{recipe.strArea}</h3>
        <Link href={`/recipe/${recipe.idMeal}`}>View Recipe</Link>
    </div>
  )
}

export default RecipeCard