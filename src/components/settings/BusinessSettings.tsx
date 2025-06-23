
import React from 'react';
import { useBusinessSettings } from '@/hooks/useBusinessSettings';
import { BusinessSettingsContainer } from '@/components/settings/business/BusinessSettingsContainer';
import { BusinessSettingsForm } from '@/components/settings/business/BusinessSettingsForm';

export const BusinessSettings = () => {
  const {
    business,
    isLoading,
    errors,
    isUpdating,
    handleSubmit
  } = useBusinessSettings();

  return (
    <BusinessSettingsContainer isLoading={isLoading} business={business}>
      <BusinessSettingsForm
        business={business}
        errors={errors}
        isLoading={isUpdating}
        onSubmit={handleSubmit}
      />
    </BusinessSettingsContainer>
  );
};
