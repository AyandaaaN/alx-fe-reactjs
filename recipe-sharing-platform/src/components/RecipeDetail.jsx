import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Load the specific recipe on mount / when id changes
  useEffect(() => {
    const arr = Array.isArray(data) ? data : [];
    const found = arr.find((r) => String(r.id) === String(id));
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-blue-600 hover:underline">← Back</Link>
        <h1 className="mt-4 text-2xl font-bold">Recipe not found</h1>
        <p className="text-gray-600">We couldn’t find that recipe.</p>
      </div>
    );
  }

  // Support either `instructions` or `steps` field
  const instructions = recipe.instructions ?? recipe.steps ?? [];

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/" className="text-blue-600 hover:underline">← Back to recipes</Link>

      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow">
        <img src={recipe.image} alt={recipe.title} className="h-64 w-full object-cover" />
        <div className="space-y-4 p-6">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="text-gray-600">{recipe.summary}</p>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-gray-50 p-4">
              <h2 className="mb-2 font-semibold">Ingredients</h2>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <h2 className="mb-2 font-semibold">Instructions</h2>
              <ol className="list-decimal space-y-2 pl-5 text-gray-700">
                {instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
