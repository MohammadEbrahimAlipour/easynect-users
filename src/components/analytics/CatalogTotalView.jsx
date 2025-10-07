const CatalogTotalView = ({ data }) => {
  if (!data) return <p>هیچ داده‌ای موجود نیست</p>;

  return (
    <div className="p-4 border rounded text-center">
      <p className="text-gray-500">کل بازدیدها</p>
      <p className="text-2xl font-bold">{data.views}</p>
    </div>
  );
};

export default CatalogTotalView;
