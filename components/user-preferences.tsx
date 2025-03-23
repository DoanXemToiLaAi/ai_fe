interface UserPreferencesProps {
  preferences: string[];
}

export default function UserPreferences({ preferences }: UserPreferencesProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Sở thích của bạn
      </h2>
      <div className="flex flex-wrap gap-2">
        {preferences.map((preference, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
            {preference}
          </span>
        ))}
      </div>
    </div>
  );
}
