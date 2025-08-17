import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../data.json"; // static import avoids runtime import issues

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // guard against bad JSON shape
    setRecipes(Array.isArray(data) ? data : []);
  }, []);

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Latest Recipes</h1>
          <p className="text-sm text-gray-500">Browse {recipes.length} tasty ideas.</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          + Add Recipe
        </a>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <li
            key={r.id}
            className="group overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Link to={`/recipe/${r.id}`} className="block">
              <img
                src={r.image}
                alt={r.title}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="space-y-2 p-4">
                <h2 className="text-lg font-semibold transition-colors group-hover:text-blue-600">
                  {r.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">{r.summary}</p>
                <span className="inline-flex text-sm font-medium text-blue-600 group-hover:underline">
                  View details →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
