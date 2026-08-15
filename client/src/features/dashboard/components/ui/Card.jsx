const Card = ({ title, children, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {title && (
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
