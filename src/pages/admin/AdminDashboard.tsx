import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  LogOut, 
  Menu,
  X,
  TrendingUp,
  IndianRupee,
  PackageCheck,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/dashboard/products', icon: Package },
  { name: 'Orders', path: '/admin/dashboard/orders', icon: ShoppingCart },
  { name: 'Users', path: '/admin/dashboard/users', icon: Users },
];

const stats = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: IndianRupee, change: '+12%' },
  { label: 'Total Orders', value: '48', icon: ShoppingCart, change: '+8%' },
  { label: 'Products', value: '5', icon: Package, change: '0' },
  { label: 'Customers', value: '127', icon: Users, change: '+15%' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Rajesh Mehta', amount: 2100, status: 'delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Priya Sharma', amount: 2450, status: 'shipped', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Amit Patel', amount: 1850, status: 'paid', date: '2024-01-13' },
  { id: 'ORD-004', customer: 'Neha Gupta', amount: 2200, status: 'pending', date: '2024-01-12' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('sama-admin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('sama-admin');
    navigate('/admin');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400';
      case 'paid':
        return 'bg-gold/20 text-gold';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isDashboardHome = location.pathname === '/admin/dashboard';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold text-gradient">SAMA</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-lg font-semibold">
              {sidebarLinks.find(l => l.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              View Store
            </Button>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {isDashboardHome ? (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        stat.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'
                      )}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-display font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl"
              >
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order ID</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4 font-medium">₹{order.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={cn("px-2 py-1 rounded-full text-xs font-medium capitalize", getStatusColor(order.status))}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
