import HomePage from "./components/HomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">Recipe Share</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <HomePage />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
          Built with React + Tailwind
        </div>
      </footer>
    </div>
  );
}
