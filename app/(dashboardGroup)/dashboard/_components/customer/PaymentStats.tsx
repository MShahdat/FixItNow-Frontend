'use server'

import { IPaymentHistory } from "@/lib/interface";
import { getMyPayment } from "../../_action/customer/myPayment";
import { Banknote, BarChart3, Calendar, CirclePoundSterling } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";



const PaymentStats = async () => {
  const payments = await getMyPayment();

  if (!payments.success) {
    return
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const succeeded = payments?.data?.filter(
    (p: IPaymentHistory) => p.status === 'PAID' && p.paidAt
  );

  const totalSpend = succeeded.reduce((sum: number, p: any) => sum + p.amount, 0);

  const thisMonthSpend = succeeded
    .filter((p: any) => {
      const d = new Date(p.paidAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const thisYearSpend = succeeded
    .filter((p: any) => new Date(p.paidAt).getFullYear() === currentYear)
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const stats = [
    { label: "Total Spend", value: totalSpend, icon: Banknote, iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600 dark:text-blue-400" },
    { label: "This Month", value: thisMonthSpend, icon: Calendar, iconBg: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600 dark:text-green-400" },
    { label: "This Year", value: thisYearSpend, icon: BarChart3, iconBg: "bg-amber-100 dark:bg-amber-900/30", iconColor: "text-amber-600 dark:text-amber-400" },
  ];
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <Card key={label} className="w-[270px]">
            <CardContent className="flex flex-col items-center text-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${iconBg} mb-2.5`}>
                <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="text-xl font-semibold">{value.toLocaleString()} tk</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentStats;