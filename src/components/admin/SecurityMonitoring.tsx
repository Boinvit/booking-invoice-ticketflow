
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Globe,
  Database,
  Server,
  Lock,
  Eye
} from 'lucide-react';

interface SecurityMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  lastChecked: string;
}

interface SystemHealth {
  uptime: string;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
}

const SecurityMonitoring = () => {
  const [securityMetrics] = useState<SecurityMetric[]>([
    {
      name: 'SSL Certificate',
      value: 'Valid',
      status: 'good',
      lastChecked: '2 minutes ago'
    },
    {
      name: 'Database Encryption',
      value: 'Enabled',
      status: 'good',
      lastChecked: '5 minutes ago'
    },
    {
      name: 'Rate Limiting',
      value: 'Active',
      status: 'good',
      lastChecked: '1 minute ago'
    },
    {
      name: 'Failed Login Attempts',
      value: '3 in last hour',
      status: 'warning',
      lastChecked: '30 seconds ago'
    },
    {
      name: 'API Rate Limits',
      value: '95% capacity',
      status: 'warning',
      lastChecked: '1 minute ago'
    },
    {
      name: 'Backup Status',
      value: 'Completed',
      status: 'good',
      lastChecked: '6 hours ago'
    }
  ]);

  const [systemHealth] = useState<SystemHealth>({
    uptime: '99.9%',
    responseTime: 150,
    errorRate: 0.1,
    activeUsers: 1247
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Security & Monitoring</h1>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            System Secure
          </Badge>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.uptime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.responseTime}ms</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.errorRate}%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="security">Security Status</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Metrics</CardTitle>
              <CardDescription>Real-time security status of your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-gray-600">Last checked: {metric.lastChecked}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Server Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disk Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network I/O</span>
                    <span className="font-medium">1.2 GB/h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Active Connections</span>
                    <span className="font-medium">12/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Query Time (avg)</span>
                    <span className="font-medium">23ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cache Hit Rate</span>
                    <span className="font-medium">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Used</span>
                    <span className="font-medium">2.3 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup Status
              </CardTitle>
              <CardDescription>Automated database backups and recovery options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Daily Backup</p>
                    <p className="text-sm text-gray-600">Last backup: 6 hours ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Weekly Backup</p>
                    <p className="text-sm text-gray-600">Last backup: 2 days ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Monthly Archive</p>
                    <p className="text-sm text-gray-600">Last backup: 15 days ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-royal-red hover:bg-royal-red-accent">
                  Create Manual Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityMonitoring;
