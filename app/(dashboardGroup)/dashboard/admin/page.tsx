import React from 'react';
import { getUsers } from '../_action/admin/getUsers';
import { getBooking } from '../_action/admin/getBooking';
import { paymentHistory } from '../_action/admin/paymentHistory';
import { getServices } from '@/app/(publicGroup)/(serviceTechnicianGroup)/_action/getServices';
import { computeDashboardStats } from '@/lib/adminState';
import { StatsCards } from '../_components/admin/StatsCards';
import { RevenueChart } from '../_components/admin/RevenueChard';
import { BookingStatusChart } from '../_components/admin/BookingStatusCart';
import { UserRoleChart } from '../_components/admin/UserRoleChart';

const AdminDashboardPage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const search = await searchParams;

  const dashboardSearch = {
    ...search,
    page: "1",
    limit: "99999",
  };

  const [users, bookings, payHistory, services] = await Promise.all([
    getUsers(dashboardSearch),
    getBooking(dashboardSearch),
    paymentHistory(dashboardSearch),
    getServices(dashboardSearch),
  ]);

  const stats = computeDashboardStats(
    users?.data ?? [],
    bookings?.data ?? [],
    payHistory?.data ?? [],
    services?.data ?? [],
    {
      totalUsers: users?.meta?.total,
      totalBookings: bookings?.meta?.total,
      totalServices: services?.meta?.total,
    }
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of platform activity and performance
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart data={stats.revenueData} />
        <BookingStatusChart data={stats.bookingStatusData} />
      </div>

      <UserRoleChart data={stats.roleData} />
    </div>
  );
};

export default AdminDashboardPage;