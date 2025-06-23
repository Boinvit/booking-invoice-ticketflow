
# QR Code System Documentation

## Overview
The QR code system enables businesses to generate unique QR codes that customers can scan to access their booking page directly.

## Components

### QRCodeGenerator
- **Location**: `src/components/qr/QRCodeGenerator.tsx`
- **Purpose**: Wrapper component that delegates to BusinessQRGenerator
- **Props**: `businessId`, `businessName`

### BusinessQRGenerator
- **Location**: `src/components/business/BusinessQRGenerator.tsx`
- **Purpose**: Generates and displays QR codes for business booking pages
- **Features**:
  - QR code generation using qrcode library
  - Multiple URL formats for reliability
  - Download functionality
  - Print support

## URL Structure
QR codes generate URLs in the format:
- Primary: `/book/{businessId}`
- Fallback: `/booking/{businessId}`
- Alternative: `/public-booking/{businessId}`

## Usage
```typescript
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';

<QRCodeGenerator 
  businessId="uuid" 
  businessName="Business Name" 
/>
```

## Maintenance
- Keep QR generation simple and focused
- Ensure URLs are always accessible
- Test QR codes regularly
- Maintain fallback URL patterns
