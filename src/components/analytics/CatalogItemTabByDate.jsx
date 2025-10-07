const CatalogItemTabByDate = ({ data }) => {
  if (!data || data.length === 0) return <p>هیچ داده‌ای موجود نیست</p>;

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
          <img src={item.s3_icon_url} alt={item.title} className="w-12 h-12 object-cover rounded" />
          <div className="flex-1">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">Taps: {item.taps}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogItemTabByDate;
