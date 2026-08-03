'use client'

import { useState, useTransition } from 'react';
import { Calendar, Check, X, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { bookingStatusUpdate } from '../../_action/bookingStatusUpdate';
import { IncomingBook } from '@/lib/interface';
import { toast } from 'sonner';


function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
}

const IncomingBooking = ({ booking }: { booking: IncomingBook }) => {
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState<'ACCEPTED' | 'DECLINED' | null>(null);

  const formattedDate = new Date(booking.scheduledDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'bdt',
    maximumFractionDigits: 0,
  }).format(Number(booking.totalAmount));

  const updateStatus = (status: 'ACCEPTED' | 'DECLINED') => {
    setPendingAction(status);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('status', status);

      const result = await bookingStatusUpdate(booking.bookingId, null, formData);

      if (result.success) {
        toast.success(result.message ?? 'status updated successfully')
      }
      else {
        toast.error(result.message ?? 'failed update')
      }
      setPendingAction(null);
    });
  };

  const handleAccept = () => updateStatus('ACCEPTED');
  const handleDecline = () => updateStatus('DECLINED');

  const isAcceptPending = isPending && pendingAction === 'ACCEPTED';
  const isDeclinePending = isPending && pendingAction === 'DECLINED';

  return (
    <Card className="flex w-full flex-row flex-nowrap items-center gap-4 rounded-full border-gray-100 px-5 py-3 shadow-sm">
      {/* Avatar + name */}
      <div className="flex shrink-0 items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={booking.profileImage} alt={booking.customerName} />
          <AvatarFallback className="bg-gray-100 text-sm font-medium text-gray-600">
            {getInitials(booking.customerName)}
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-nowrap text-sm font-semibold capitalize text-gray-900">
          {booking.customerName}
        </span>
      </div>

      {/* Service */}
      <span className="flex-1 truncate text-sm font-medium uppercase tracking-wide text-gray-500">
        {booking.serviceName}
      </span>

      {/* Date */}
      <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-600">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className="whitespace-nowrap">{formattedDate}</span>
      </div>

      {/* Amount */}
      <span className="shrink-0 text-sm font-semibold text-gray-900">
        {formattedAmount}
      </span>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Button
          onClick={handleAccept}
          disabled={isPending}
          variant="outline"
          size="sm"
          className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700"
        >
          {isAcceptPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          Accept
        </Button>
        <Button
          onClick={handleDecline}
          disabled={isPending}
          variant="outline"
          size="sm"
          className="rounded-full border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        >
          {isDeclinePending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <X className="h-3.5 w-3.5" />
          )}
          Declined
        </Button>
      </div>
    </Card>
  );
};

export default IncomingBooking;