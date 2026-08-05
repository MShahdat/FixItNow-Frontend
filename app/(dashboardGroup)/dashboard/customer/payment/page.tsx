



import { getMyPayment } from "../../_action/customer/myPayment";
import { MyPaymentTable } from "../../_components/customer/MyPaymentTable";
import PaymentStats from "../../_components/customer/PaymentStats";



const PaymentPage = async () => {

  const payments = await getMyPayment();

  if (!payments.success) {
    return (
      <p>payment not found!</p>
    )
  }


  return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      <div className="flex flex-col space-y-6">
        <p className="text-xl md:text-2xl font-semibold">Payment Status</p>
        <PaymentStats />
        <div className="mt-8">
          <MyPaymentTable payments={payments} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;