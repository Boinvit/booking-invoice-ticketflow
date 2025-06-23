
export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly?: number;
  description: string;
  features: string[];
}

export interface UserBusiness {
  id: string;
  subscription_plan: string;
  subscription_status: string;
}
