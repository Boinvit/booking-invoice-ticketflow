import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  RefreshCw, 
  Settings,
  Crown,
  ArrowUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardKPISectionProps {
  business: any;
  stats: {
    activeBookings: number;
    todayRevenue: number;
    monthlyBookings: number;
    totalClients: number;
  };
  currency: string;
  formatPrice: (amount: number) => string;
  onRefresh: () => void;
  onEditBusiness: () => void;
}

export const DashboardKPISection = ({ 
  business,
  stats, 
  currency, 
  formatPrice, 
  onRefresh, 
  onEditBusiness 
}: DashboardKPISectionProps) => {
  const navigate = useNavigate();

  const kpis = [
    {
      title: "Today's Bookings",
      value: stats.activeBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Today's Revenue",
      value: formatPrice(stats.todayRevenue),
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Monthly Bookings",
      value: stats.monthlyBookings,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const handleUpgradeClick = () => {
    navigate('/app/subscription');
  };

  return (
    <div className="space-y-6">
      {/* Business Status and Subscription Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {business?.name || 'Your Business'}
                {business?.is_verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Complete business management platform - bookings, invoicing, staff management & more
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Trial Plan
              </Badge>
              <Button variant="outline" size="sm" onClick={onEditBusiness}>
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${kpi.bgColor}`}>
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {kpi.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh Data
        </Button>
      </div>

      {/* Subscription Notice */}
      <Card className="border-royal-red bg-gradient-to-r from-royal-red/5 to-royal-red/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-royal-red">Upgrade Your Business Management</h3>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Medium Plan: KES 2,900/month</strong> • <strong>Premium Plan: KES 9,900/month</strong>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Complete business management: bookings, invoicing, staff management, analytics, payments & more
              </p>
            </div>
            <Button 
              onClick={handleUpgradeClick}
              size="sm" 
              className="bg-royal-red hover:bg-royal-red/90 text-white"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
