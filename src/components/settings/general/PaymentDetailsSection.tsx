import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'bank' | 'mobile' | 'card' | 'cash';
  name: string;
  details: string;
  is_active: boolean;
}

interface PaymentDetailsSectionProps {
  paymentMethods: PaymentMethod[];
  onAddPayment: (method: Omit<PaymentMethod, 'id'>) => void;
  onUpdatePayment: (id: string, updates: Partial<PaymentMethod>) => void;
  onRemovePayment: (id: string) => void;
}

export const PaymentDetailsSection: React.FC<PaymentDetailsSectionProps> = ({
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

  const paymentTypeLabels = {
    bank: 'Bank Account',
    mobile: 'Mobile Money',
    card: 'Card',
    cash: 'Cash'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <p className="text-sm text-gray-600">
          Configure payment methods for client bookings
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Payment Methods */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{method.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {paymentTypeLabels[method.type]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{method.details}</p>
              </div>
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
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Payment Method */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-4">Add Payment Method</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="payment-type">Type</Label>
              <select
                id="payment-type"
                value={newMethod.type}
                onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="bank">Bank Account</option>
                <option value="mobile">Mobile Money</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <div>
              <Label htmlFor="payment-name">Name/Label</Label>
              <Input
                id="payment-name"
                placeholder="e.g., Main Bank Account"
                value={newMethod.name}
                onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="payment-details">Details</Label>
              <Input
                id="payment-details"
                placeholder="Account number, phone, etc."
                value={newMethod.details}
                onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
              />
            </div>
          </div>
          <Button
            onClick={handleAddMethod}
            className="mt-4"
            disabled={!newMethod.name || !newMethod.details}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
