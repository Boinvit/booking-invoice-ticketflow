
export const validateBusinessForm = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  if (!name?.trim()) {
    errors.name = 'Business name is required';
  }
  
  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return errors;
};
