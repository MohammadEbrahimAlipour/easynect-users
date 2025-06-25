import React from 'react';

const sampleData = [
//   {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     price: 0,
//     final_price: 0,
//     discount: 0,
//     ref_id: 0,
//     username: "string",
//     state: "string",
//     payment_at: "2025-06-25T14:33:58.195Z"
//   },
//   {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     price: 0,
//     final_price: 0,
//     discount: 0,
//     ref_id: 0,
//     username: "string",
//     state: "string",
//     payment_at: "2025-06-25T14:33:58.195Z"
//   }, 
//   {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     price: 0,
//     final_price: 0,
//     discount: 0,
//     ref_id: 0,
//     username: "string",
//     state: "string",
//     payment_at: "2025-06-25T14:33:58.195Z"
//   },
//   {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     price: 0,
//     final_price: 0,
//     discount: 0,
//     ref_id: 0,
//     username: "string",
//     state: "string",
//     payment_at: "2025-06-25T14:33:58.195Z"
//   },
//   {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     price: 0,
//     final_price: 0,
//     discount: 0,
//     ref_id: 0,
//     username: "string",
//     state: "string",
//     payment_at: "2025-06-25T14:33:58.195Z"
//   },
];

const PaymentTable = ({ data = sampleData }) => {
  return (
    <div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-center border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">آی‌دی</th>
              <th className="px-4 py-2 border">نام کاربری</th>
              <th className="px-4 py-2 border">قیمت</th>
              <th className="px-4 py-2 border">قیمت نهایی</th>
              <th className="px-4 py-2 border">تخفیف</th>
              <th className="px-4 py-2 border">وضعیت</th>
              <th className="px-4 py-2 border">تاریخ پرداخت</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2 border break-words">{item.id}</td>
                <td className="px-4 py-2 border">{item.username}</td>
                <td className="px-4 py-2 border">{item.price}</td>
                <td className="px-4 py-2 border">{item.final_price}</td>
                <td className="px-4 py-2 border">{item.discount}</td>
                <td className="px-4 py-2 border">{item.state}</td>
                <td className="px-4 py-2 border">{new Date(item.payment_at).toLocaleString('fa-IR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
