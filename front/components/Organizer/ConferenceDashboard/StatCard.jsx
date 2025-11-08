const StatCard = ({ title, value }) => {
  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
      <p className="mt-3 text-3xl font-semibold text-text-primary md:text-4xl">{value}</p>
    </div>
  );
};

export default StatCard;
