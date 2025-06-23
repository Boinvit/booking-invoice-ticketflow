
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Building, Smartphone, Banknote, CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentAccount {
  id: string;
  type: 'bank' | 'mobile' | 'cash' | 'card';
  name: string;
  details: string;
  is_active: boolean;
}

interface PaymentAccountSettingsProps {
  paymentAccounts: PaymentAccount[];
  onAddAccount: (account: Omit<PaymentAccount, 'id'>) => void;
  onUpdateAccount: (id: string, updates: Partial<PaymentAccount>) => void;
  onRemoveAccount: (id: string) => void;
}

const accountTypeConfig = {
  bank: {
    label: 'Bank Account',
    icon: Building,
    placeholder: 'Account Number (e.g., 1234567890)',
    description: 'Bank account number for bank transfers'
  },
  mobile: {
    label: 'Mobile Money',
    icon: Smartphone,
    placeholder: 'Phone Number (e.g., +254712345678)',
    description: 'M-Pesa, Airtel Money, or other mobile money'
  },
  cash: {
    label: 'Cash Payments',
    icon: Banknote,
    placeholder: 'Instructions (e.g., Pay at reception)',
    description: 'Cash payment instructions for clients'
  },
  card: {
    label: 'Card Payments',
    icon: CreditCard,
    placeholder: 'Processor name (e.g., Paystack)',
    description: 'Credit/debit card payment processor'
  }
};

export const PaymentAccountSettings: React.FC<PaymentAccountSettingsProps> = ({
  paymentAccounts,
  onAddAccount,
  onUpdateAccount,
  onRemoveAccount
}) => {
  const [newAccount, setNewAccount] = useState({
    type: 'mobile' as const,
    name: '',
    details: ''
  });

  const handleAddAccount = () => {
    if (!newAccount.name.trim() || !newAccount.details.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    onAddAccount({ ...newAccount, is_active: true });
    setNewAccount({ type: 'mobile', name: '', details: '' });
    toast.success('Payment account added successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Collection Accounts
        </CardTitle>
        <p className="text-sm text-gray-600">
          Configure where clients should send payments
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Payment Accounts */}
        <div className="space-y-4">
          <h4 className="font-medium">Your Payment Accounts</h4>
          {paymentAccounts.length === 0 ? (
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No payment accounts configured</p>
              <p className="text-sm">Add an account below to start receiving payments</p>
            </div>
          ) : (
            paymentAccounts.map((account) => {
              const config = accountTypeConfig[account.type];
              const Icon = config.icon;
              
              return (
                <div key={account.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium">{account.name}</h5>
                          <Badge variant={account.is_active ? 'default' : 'secondary'} className="text-xs">
                            {account.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{config.label}</p>
                        <p className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">
                          {account.details}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Switch
                        checked={account.is_active}
                        onCheckedChange={(checked) => 
                          onUpdateAccount(account.id, { is_active: checked })
                        }
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveAccount(account.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Separator />

        {/* Add New Account Form */}
        <div className="space-y-4">
          <h4 className="font-medium">Add Payment Account</h4>
          
          {/* Account Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(accountTypeConfig).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => setNewAccount({ ...newAccount, type: type as any })}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    newAccount.type === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{config.label}</span>
                  </div>
                  <p className="text-xs text-gray-600">{config.description}</p>
                </button>
              );
            })}
          </div>

          {/* Account Details Form */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="account-name">Account Name/Label</Label>
              <Input
                id="account-name"
                placeholder="e.g., Main Business Account, Shop Till"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="account-details">
                {accountTypeConfig[newAccount.type].label} Details
              </Label>
              <Input
                id="account-details"
                placeholder={accountTypeConfig[newAccount.type].placeholder}
                value={newAccount.details}
                onChange={(e) => setNewAccount({ ...newAccount, details: e.target.value })}
              />
            </div>
            
            <Button
              onClick={handleAddAccount}
              disabled={!newAccount.name.trim() || !newAccount.details.trim()}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Account
            </Button>
          </div>
        </div>

        {/* Paystack Integration Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-green-900 mb-1">Paystack Integration Active</h5>
              <p className="text-sm text-green-800">
                Clients can also pay directly through cards, bank transfers, and mobile money via our secure Paystack integration. 
                No additional setup required.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
