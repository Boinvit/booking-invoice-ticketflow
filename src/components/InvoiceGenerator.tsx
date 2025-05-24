
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const InvoiceGenerator = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Haircut & Styling", quantity: 1, rate: 45 }
  ]);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setInvoiceItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
          <p className="text-gray-600">Create professional invoices for your clients</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Generate Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business & Client Info */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input id="invoiceNumber" defaultValue="INV-001" />
                </div>
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input id="invoiceDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Bill From</h4>
                  <div className="space-y-2">
                    <Input placeholder="Business Name" defaultValue="Blue Salon & Spa" />
                    <Input placeholder="Email" defaultValue="info@bluesalon.com" />
                    <Input placeholder="Phone" defaultValue="(555) 123-4567" />
                    <Textarea placeholder="Business Address" className="resize-none" rows={3} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Bill To</h4>
                  <div className="space-y-2">
                    <Input placeholder="Client Name" />
                    <Input placeholder="Client Email" />
                    <Input placeholder="Client Phone" />
                    <Textarea placeholder="Client Address" className="resize-none" rows={3} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
              <CardDescription>Add services and products to your invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoiceItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      {index === 0 && <Label className="text-xs">Description</Label>}
                      <Input
                        placeholder="Service description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      {index === 0 && <Label className="text-xs">Qty</Label>}
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="col-span-2">
                      {index === 0 && <Label className="text-xs">Rate</Label>}
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      {index === 0 && <Label className="text-xs">Amount</Label>}
                      <div className="h-10 px-3 py-2 border rounded-md bg-gray-50 flex items-center">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        disabled={invoiceItems.length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" onClick={addItem} className="w-full">
                  + Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Payment on receipt</SelectItem>
                      <SelectItem value="net7">Net 7 days</SelectItem>
                      <SelectItem value="net15">Net 15 days</SelectItem>
                      <SelectItem value="net30">Net 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Payment instructions, thank you message, etc."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Preview & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Badge variant="outline" className="w-full justify-center">
                  INV-001
                </Badge>
                <p className="text-xs text-gray-500 text-center">
                  Invoice will be sent via WhatsApp & Email
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                📧 Send via Email
              </Button>
              <Button className="w-full" variant="outline">
                📱 Send via WhatsApp
              </Button>
              <Button className="w-full" variant="outline">
                📄 Download PDF
              </Button>
              <Button className="w-full" variant="outline">
                🖨️ Print Invoice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Mark as Paid
              </Button>
              <Button className="w-full" variant="outline">
                Send Reminder
              </Button>
              <Button className="w-full" variant="outline">
                Duplicate Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
