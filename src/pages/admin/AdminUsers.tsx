import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

const users = [
  { id: 'USR-001', name: 'Rajesh Mehta', email: 'rajesh@example.com', phone: '+91 98765 43210', orders: 5, joined: '2023-11-15' },
  { id: 'USR-002', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43211', orders: 3, joined: '2023-12-01' },
  { id: 'USR-003', name: 'Amit Patel', email: 'amit@example.com', phone: '+91 98765 43212', orders: 8, joined: '2023-10-20' },
  { id: 'USR-004', name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 98765 43213', orders: 2, joined: '2024-01-05' },
  { id: 'USR-005', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214', orders: 12, joined: '2023-09-10' },
  { id: 'USR-006', name: 'Ananya Rao', email: 'ananya@example.com', phone: '+91 98765 43215', orders: 1, joined: '2024-01-10' },
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <span className="text-sm text-muted-foreground">{filteredUsers.length} customers</span>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Phone className="h-3 w-3" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="font-semibold">{user.orders}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm">{user.joined}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
