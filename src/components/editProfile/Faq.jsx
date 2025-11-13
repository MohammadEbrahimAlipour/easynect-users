import React, { useState, useEffect } from "react";

export default function Faq({handleApiDelete, existList = [], handleRouterBack, handleApiSubmit }) {
  const [faqs, setFaqs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // مقداردهی اولیه با existList
  useEffect(() => {
    const mappedExistList = existList.map(f => ({
      ...f,
      isExisting: true, // مشخص می‌کنیم که از قبل موجود است
    }));
    setFaqs(mappedExistList);
  }, [existList]);

  const handleAddFaq = () => {
    if (title && description) {
      setFaqs((prev) => [
        ...prev,
        { id: Date.now(), title, description, isExisting: false },
      ]);
      setTitle("");
      setDescription("");
    }
  };

  const handleRemoveFaq = (id) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    handleApiDelete(id);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">سوالات متداول</h2>
        <div className="text-sm flex items-center gap-2 justify-center">
          <span
            onClick={handleRouterBack}
            className="me-2 border-[1px] border-black px-4 py-1 rounded-lg cursor-pointer"
          >
            انصراف
          </span>
          <button
            onClick={() => handleApiSubmit(faqs)}
            type="button"
            className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black"
          >
            ذخیره
          </button>
        </div>
      </div>

      {/* Add New FAQ */}
      <div className="mb-6">
        <div className="bg-lightMenu rounded-lg mb-3 border-2 overflow-hidden">
          <div className="flex items-center py-3">
            <label className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4 whitespace-nowrap" htmlFor="title">
              عنوان
            </label>
            <input
              id="title"
              name="title"
              value={title}
              placeholder="عنوان سوال"
              className="bg-lightMenu outline-0 font-medium w-full pr-4"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-lightMenu rounded-lg mb-3 border-2 overflow-hidden">
          <div className="flex items-start py-3">
            <label className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4 whitespace-nowrap mt-1" htmlFor="description">
              توضیح
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              placeholder="توضیح مربوط به سوال"
              rows={3}
              className="bg-lightMenu outline-0 font-medium w-full pr-4 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleAddFaq}
          className="bg-[#D1AB48] text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          اضافه کردن سوال
        </button>
      </div>

      {/* Display FAQs */}
      <div>
        {faqs.length ? (
          faqs.map((faq) => (
            <div key={faq.id} className="mb-4 border-b pb-2 flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{faq.title}</h4>
                <p className="text-gray-600 mt-1">{faq.description}</p>
              </div>
              <button
                onClick={() => handleRemoveFaq(faq.id)}
                className="text-red-500 font-bold text-xl ms-2 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">هیچ سوالی وجود ندارد</div>
        )}
      </div>
    </div>
  );
}
