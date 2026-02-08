import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaidPlugin } from '../plugins/paidPluginCatalog';
import { generateFakeQrCode } from '../utils/fakeQr';
import { CheckCircle2 } from 'lucide-react';

interface PaidPluginPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plugin: PaidPlugin | null;
  onPurchaseComplete: (pluginId: string) => void;
}

export default function PaidPluginPurchaseDialog({
  open,
  onOpenChange,
  plugin,
  onPurchaseComplete
}: PaidPluginPurchaseDialogProps) {
  const [qrCode, setQrCode] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && plugin) {
      setQrCode(generateFakeQrCode());
      setRedeemCode('');
      setPaymentAmount(plugin.price.toString());
      setPurchaseSuccess(false);
    }
    onOpenChange(newOpen);
  };
  
  const handleRedeemCode = () => {
    if (redeemCode.trim() && plugin) {
      setPurchaseSuccess(true);
      setTimeout(() => {
        onPurchaseComplete(plugin.id);
        handleOpenChange(false);
      }, 1500);
    }
  };
  
  const handleDirectPayment = () => {
    if (plugin) {
      setPurchaseSuccess(true);
      setTimeout(() => {
        onPurchaseComplete(plugin.id);
        handleOpenChange(false);
      }, 1500);
    }
  };
  
  const handleRefreshQr = () => {
    setQrCode(generateFakeQrCode());
  };
  
  if (!plugin) return null;
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase {plugin.name}</DialogTitle>
          <DialogDescription>
            Choose your payment method - ${plugin.price}
          </DialogDescription>
        </DialogHeader>
        
        {purchaseSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-semibold">Purchase Successful!</h3>
            <p className="text-gray-400 text-center">
              {plugin.name} has been added to your server
            </p>
          </div>
        ) : (
          <Tabs defaultValue="qr" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="qr">QR Code</TabsTrigger>
              <TabsTrigger value="redeem">Redeem Code</TabsTrigger>
              <TabsTrigger value="direct">Direct Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="qr" className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-sm text-gray-400 text-center">
                  Scan this QR code with your payment app
                </p>
                {qrCode && (
                  <img 
                    src={qrCode} 
                    alt="Payment QR Code" 
                    className="w-48 h-48 border-2 border-gray-700 rounded"
                  />
                )}
                <Button 
                  variant="outline" 
                  onClick={handleRefreshQr}
                  className="w-full"
                >
                  Refresh QR Code
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Payment will be processed automatically after scanning
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="redeem" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="redeem-code">Enter Redeem Code</Label>
                  <Input
                    id="redeem-code"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Enter any valid redeem code to unlock this plugin
                  </p>
                </div>
                <Button 
                  onClick={handleRedeemCode}
                  disabled={!redeemCode.trim()}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Redeem Code
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="direct" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Payment Amount</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">$</span>
                    <Input
                      id="payment-amount"
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Confirm the amount to complete your purchase
                  </p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Plugin:</span>
                    <span>{plugin.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price:</span>
                    <span>${plugin.price}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-yellow-500">${paymentAmount}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleDirectPayment}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Confirm Payment
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
