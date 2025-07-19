import React, { useState } from "react";

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddFaq = () => {
    if (title && description) {
      setFaqs((prev) => [...prev, { title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">سوالات متداول</h2>

      <div className="mb-6">
        {/* Title Input */}
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
              required
            />
          </div>
        </div>

        {/* Description Input */}
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
              required
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

      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <h4 className="text-lg font-semibold text-gray-800">{faq.title}</h4>
            <p className="text-gray-600 mt-1">{faq.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
