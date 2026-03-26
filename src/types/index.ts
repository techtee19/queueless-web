export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: "CUSTOMER" | "STAFF" | "ADMIN" | "SUPER_ADMIN";
  avatarUrl?: string;
  isVerified: boolean;
  staffProfile?: { counterNumber?: number; isOnDuty?: boolean };
}

export interface Institution {
  id: string;
  name: string;
  slug: string;
  type: "BANK" | "HOSPITAL" | "GOVERNMENT" | "UNIVERSITY" | "TELECOM" | "OTHER";
  description?: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  logoUrl?: string;
  services: ServiceWithQueue[];
}

export interface ServiceWithQueue {
  id: string;
  name: string;
  description?: string;
  estimatedTime: number;
  maxQueueSize: number;
  waitingCount: number;
  currentServing: number;
  isOpen: boolean;
  estimatedWaitMinutes: number;
}

export interface QueueEntry {
  id: string;
  ticketNumber: number;
  status: "WAITING" | "CALLED" | "CHECKED_IN" | "SERVING" | "COMPLETED" | "SKIPPED" | "CANCELLED" | "EXPIRED";
  qrToken: string;
  qrCodeDataUrl?: string;
  position: number;
  estimatedWaitMinutes: number;
  checkedInAt?: string;
  calledAt?: string;
  completedAt?: string;
  createdAt: string;
  queue: {
    id: string;
    currentServing?: number;
    service: { name: string; estimatedTime: number };
    institution: { id: string; name: string; address: string; type?: string };
  };
}
