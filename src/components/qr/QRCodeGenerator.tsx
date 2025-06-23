
import React from 'react';
import { PrintableQRCode } from './PrintableQRCode';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type QRCodeGeneratorProps = {
  businessId: string;
  businessName: string;
};

export const QRCodeGenerator = ({ businessId, businessName }: QRCodeGeneratorProps) => {
  const { data: business } = useQuery({
    queryKey: ['business-qr-details', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('address, phone')
        .eq('id', businessId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!businessId,
  });

  return (
    <PrintableQRCode 
      businessId={businessId} 
      businessName={businessName}
      businessAddress={business?.address}
      businessPhone={business?.phone}
    />
  );
};
