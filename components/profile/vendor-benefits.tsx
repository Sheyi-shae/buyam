import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format-currency';
import {
    Award,
    BarChart3,
    CheckCircle,
    Globe,
    ShieldCheck,
    Sparkles,
    Store,
    TrendingUp,
    Zap
} from 'lucide-react';

export function VendorBenefits() {
 
  return (
    <div className="space-y-8">
     

      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-emerald-900 mb-2">Why Verify Your Store?</h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li>• Verified sellers get 3x more customer inquiries</li>
              <li>• Build credibility and trust with customers</li>
              <li>• Unlock exclusive premium features</li>
              <li>• One-time payment of {formatCurrency(2000)}, lifetime benefits</li>
              <li>• Stand out from unverified competitors</li>
              <li>• Your products are intelligently recommended to relevant customers</li>
              <li>• Build customer trust with our official verification badge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
