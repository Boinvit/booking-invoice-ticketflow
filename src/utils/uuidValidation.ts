
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const logQRCodeDebugInfo = (businessId: string) => {
  console.log('QR Code Debug: Business ID from URL:', businessId);
  console.log('QR Code Debug: Current URL:', window.location.href);
  console.log('QR Code Debug: UUID Valid:', isValidUUID(businessId));
  
  // Check if this came from a QR code scan
  if (!document.referrer) {
    console.log('QR Code Debug: Direct access detected (likely QR scan)');
  }
};
