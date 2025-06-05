export default function PokemonSkeleton() {
    return (
      <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
        <div className="w-32 h-32 mx-auto bg-gray-200 rounded"></div>
        <div className="mt-4 h-4 bg-gray-200 rounded mx-auto w-24"></div>
      </div>
    );
  }