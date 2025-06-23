import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, CreditCard, Smartphone, Building, Banknote } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'bank' | 'mobile' | 'card' | 'cash';
  name: string;
  details: string;
  is_active: boolean;
}

interface EnhancedPaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[];
  onAddPayment: (method: Omit<PaymentMethod, 'id'>) => void;
  onUpdatePayment: (id: string, updates: Partial<PaymentMethod>) => void;
  onRemovePayment: (id: string) => void;
}

const paymentTypeConfig = {
  bank: {
    label: 'Bank Account',
    icon: Building,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    placeholder: 'Account number or IBAN'
  },
  mobile: {
    label: 'Mobile Money',
    icon: Smartphone,
    color: 'bg-green-100 text-green-800 border-green-200',
    placeholder: 'Phone number'
  },
  card: {
    label: 'Card Payment',
    icon: CreditCard,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    placeholder: 'Processor name'
  },
  cash: {
    label: 'Cash Payment',
    icon: Banknote,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    placeholder: 'Cash handling instructions'
  }
};

export const EnhancedPaymentMethodsSection: React.FC<EnhancedPaymentMethodsSectionProps> = ({
  paymentMethods,
  onAddPayment,
  onUpdatePayment,
  onRemovePayment
}) => {
  const [newMethod, setNewMethod] = React.useState({
    type: 'bank' as const,
    name: '',
    details: ''
  });

  const handleAddMethod = () => {
    if (newMethod.name && newMethod.details) {
      onAddPayment({ ...newMethod, is_active: true });
      setNewMethod({ type: 'bank', name: '', details: '' });
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CreditCard className="w-5 h-5" />
          Payment Methods
        </CardTitle>
        <p className="text-sm text-gray-600">
          Configure how clients can pay for your services
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Existing Payment Methods */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Active Payment Methods</h4>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No payment methods configured</p>
              <p className="text-sm">Add your first payment method below</p>
            </div>
          ) : (
            paymentMethods.map((method) => {
              const config = paymentTypeConfig[method.type];
              const Icon = config.icon;
              
              return (
                <div key={method.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{method.name}</span>
                      <Badge variant={method.is_active ? 'default' : 'secondary'}>
                        {method.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{method.details}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={method.is_active}
                      onCheckedChange={(checked) => 
                        onUpdatePayment(method.id, { is_active: checked })
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemovePayment(method.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add New Payment Method */}
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-gray-900">Add Payment Method</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="payment-type">Payment Type</Label>
              <select
                id="payment-type"
                value={newMethod.type}
                onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(paymentTypeConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment-name">Method Name</Label>
                <Input
                  id="payment-name"
                  placeholder="e.g., Main Business Account"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="payment-details">Payment Details</Label>
                <Input
                  id="payment-details"
                  placeholder={paymentTypeConfig[newMethod.type].placeholder}
                  value={newMethod.details}
                  onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
                />
              </div>
            </div>
            
            <Button
              onClick={handleAddMethod}
              className="w-full md:w-auto"
              disabled={!newMethod.name || !newMethod.details}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        {/* Payment Integration Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Payment Gateway Integration</h5>
          <p className="text-sm text-blue-800">
            For automated payment processing, configure your Paystack integration in the subscription settings.
            This will enable real-time payment verification and automatic booking confirmations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
