
import { useNavigate } from 'react-router-dom';

export const useDashboardHandlers = () => {
  const navigate = useNavigate();

  const handleNewBooking = () => {
    navigate('/app/bookings');
  };

  const handleCreateInvoice = () => {
    navigate('/app/invoices');
  };

  const handleViewClients = () => {
    navigate('/app/clients');
  };

  const handleManageServices = () => {
    navigate('/app/services');
  };

  const handleUpdateSettings = () => {
    navigate('/app/settings');
  };

  const handleSubscription = () => {
    navigate('/app/subscription');
  };

  return {
    handleNewBooking,
    handleCreateInvoice,
    handleViewClients,
    handleManageServices,
    handleUpdateSettings,
    handleSubscription,
    navigate
  };
};
