import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const orders = [
  { id: 'ORD-001', customer: 'Rajesh Mehta', email: 'rajesh@example.com', amount: 2100, status: 'delivered', date: '2024-01-15', items: 1 },
  { id: 'ORD-002', customer: 'Priya Sharma', email: 'priya@example.com', amount: 2450, status: 'shipped', date: '2024-01-14', items: 1 },
  { id: 'ORD-003', customer: 'Amit Patel', email: 'amit@example.com', amount: 1850, status: 'paid', date: '2024-01-13', items: 1 },
  { id: 'ORD-004', customer: 'Neha Gupta', email: 'neha@example.com', amount: 2200, status: 'pending', date: '2024-01-12', items: 1 },
  { id: 'ORD-005', customer: 'Vikram Singh', email: 'vikram@example.com', amount: 3050, status: 'paid', date: '2024-01-11', items: 2 },
  { id: 'ORD-006', customer: 'Ananya Rao', email: 'ananya@example.com', amount: 1200, status: 'shipped', date: '2024-01-10', items: 1 },
];

const statusColors: Record<string, string> = {
  delivered: 'bg-green-500/20 text-green-400',
  shipped: 'bg-blue-500/20 text-blue-400',
  paid: 'bg-gold/20 text-gold',
  pending: 'bg-orange-500/20 text-orange-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const statusFlow = ['pending', 'paid', 'shipped', 'delivered'];

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersList, setOrdersList] = useState(orders);

  const filteredOrders = ordersList.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrdersList(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{filteredOrders.length} orders</span>
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Items</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4 font-medium">₹{order.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium capitalize", statusColors[order.status])}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{order.date}</td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          Update Status
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {statusFlow.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => updateStatus(order.id, status)}
                            className="capitalize"
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
