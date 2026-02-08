import { usePlan } from '../plans/PlanContext';
import { PLAN_CATALOG } from '../plans/planCatalog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function PlansPage() {
  const { currentPlan, purchasePlan } = usePlan();
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">VPS Plans</h1>
        <p className="text-gray-400">Choose the perfect plan for your server</p>
      </div>
      
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
              <p className="text-gray-400">
                {currentPlan.ram} GB RAM • {currentPlan.cpu} vCores • {currentPlan.storage} GB {currentPlan.storageType}
              </p>
            </div>
            <Badge className="text-lg px-4 py-2">
              {currentPlan.price === 0 ? 'Free' : `${currentPlan.currency}${currentPlan.price}/mo`}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLAN_CATALOG.map(plan => {
          const isActive = plan.id === currentPlan.id;
          
          return (
            <Card key={plan.id} className={`border-yellow-500/20 ${isActive ? 'ring-2 ring-yellow-500' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.processor}</CardDescription>
                  </div>
                  {isActive && <Badge>Active</Badge>}
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    {plan.price === 0 ? 'Free' : `${plan.currency}${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-gray-400">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">RAM:</span>
                    <span className="font-medium">{plan.ram} GB DDR4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU:</span>
                    <span className="font-medium">{plan.cpu} vCores</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage:</span>
                    <span className="font-medium">{plan.storage} GB {plan.storageType}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => purchasePlan(plan.id)}
                  disabled={isActive}
                  className={isActive ? '' : 'bg-yellow-500 hover:bg-yellow-600 text-black w-full'}
                  variant={isActive ? 'secondary' : 'default'}
                >
                  {isActive ? 'Current Plan' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
