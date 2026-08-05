


export function getStatusVariant(status: string) {
  switch (status) {
    case "ACCEPTED":
    case "ACTIVE":
    case 'PAID':
      return "accepted"
    case "REQUESTED":
      return "requested"
    case 'DECLINED':
    case 'IN_ACTIVE':
    case 'DEACTIVATE':
    case 'BLOCKED':
      return "declined"
    case "CANCELLED":
      return "cancelled"
    case "COMPLETED":
      return "completed"
    case "IN_PROGRESS":
      return "inProgress"
    default:
      return "secondary"
  }
}

export function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}