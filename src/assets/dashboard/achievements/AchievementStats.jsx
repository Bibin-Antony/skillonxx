const AchievementStats = ({ stats }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Achievements"
          value={stats.total}
          icon={<Trophy className="w-6 h-6 text-yellow-600" />}
          bgColor="bg-yellow-100"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={<Target className="w-6 h-6 text-green-600" />}
          bgColor="bg-green-100"
        />
        <StatCard
          title="Recent Unlocks"
          value={stats.recentUnlocks}
          icon={<Star className="w-6 h-6 text-purple-600" />}
          bgColor="bg-purple-100"
        />
        <StatCard
          title="Ranking"
          value={`#${stats.ranking}`}
          icon={<Award className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-100"
        />
      </div>
    );
  };