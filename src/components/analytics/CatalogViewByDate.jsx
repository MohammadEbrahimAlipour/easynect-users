const CatalogViewByDate = ({ data }) => {
  if (!data || !data.views) return <p>هیچ داده‌ای موجود نیست</p>;

  return (
    <div className="space-y-2">
      <p className="font-medium">کل بازدیدها: {data.total_view}</p>
      {data.views.map((item, idx) => (
        <div key={idx} className="flex justify-between border-b py-1">
          <span>{item.date}</span>
          <span>{item.views}</span>
        </div>
      ))}
    </div>
  );
};

export default CatalogViewByDate;
