import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Truck, RefreshCw, HelpCircle, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HelpModal: React.FC = () => {
  const { activeHelpModal, setActiveHelpModal } = useStore();

  if (!activeHelpModal) return null;

  const renderContent = () => {
    switch (activeHelpModal) {
      case 'size':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="p-2.5 bg-black text-white rounded-xs">
                <Ruler size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-black">Size Guide</h3>
                <p className="text-xs text-neutral-500 font-medium">Standard Fit Measurements in Inches</p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              All LEOR garments feature custom streetwear sizing designed for maximum comfort and dynamic layering.
            </p>

            {/* Size Table */}
            <div className="overflow-x-auto border border-black/10 rounded-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#111111] text-white uppercase text-[10px] tracking-widest font-black">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Waist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-semibold text-neutral-800">
                  <tr className="hover:bg-black/5 transition-colors">
                    <td className="py-2.5 px-4 font-black">S</td>
                    <td className="py-2.5 px-4">38 - 40"</td>
                    <td className="py-2.5 px-4">19.5"</td>
                    <td className="py-2.5 px-4">27.5"</td>
                    <td className="py-2.5 px-4">28 - 30"</td>
                  </tr>
                  <tr className="hover:bg-black/5 transition-colors">
                    <td className="py-2.5 px-4 font-black">M</td>
                    <td className="py-2.5 px-4">40 - 42"</td>
                    <td className="py-2.5 px-4">20.5"</td>
                    <td className="py-2.5 px-4">28.5"</td>
                    <td className="py-2.5 px-4">31 - 33"</td>
                  </tr>
                  <tr className="hover:bg-black/5 transition-colors">
                    <td className="py-2.5 px-4 font-black">L</td>
                    <td className="py-2.5 px-4">42 - 44"</td>
                    <td className="py-2.5 px-4">21.5"</td>
                    <td className="py-2.5 px-4">29.5"</td>
                    <td className="py-2.5 px-4">34 - 36"</td>
                  </tr>
                  <tr className="hover:bg-black/5 transition-colors">
                    <td className="py-2.5 px-4 font-black">XL</td>
                    <td className="py-2.5 px-4">44 - 46"</td>
                    <td className="py-2.5 px-4">22.5"</td>
                    <td className="py-2.5 px-4">30.5"</td>
                    <td className="py-2.5 px-4">37 - 39"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-400 italic">
              * For an oversized boxy drop-shoulder fit, order your regular size. For a tailored fit, size down by one.
            </p>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="p-2.5 bg-black text-white rounded-xs">
                <Truck size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-black">Shipping Policy</h3>
                <p className="text-xs text-neutral-500 font-medium">Worldwide Dispatch & Delivery</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
              <div className="bg-[#f2f2ef] p-4 rounded-xs border border-black/5">
                <p className="font-extrabold text-black uppercase tracking-wider text-[11px] mb-1">Standard Domestic Shipping</p>
                <p>Free standard shipping on all orders across India above ₹1,999. Orders are processed within 24-48 hours and delivered within 3-5 business days.</p>
              </div>

              <div className="bg-[#f2f2ef] p-4 rounded-xs border border-black/5">
                <p className="font-extrabold text-black uppercase tracking-wider text-[11px] mb-1">Express Dispatch</p>
                <p>Express 48-hour delivery is available at checkout for priority metro orders.</p>
              </div>

              <div className="bg-[#f2f2ef] p-4 rounded-xs border border-black/5">
                <p className="font-extrabold text-black uppercase tracking-wider text-[11px] mb-1">Order Tracking</p>
                <p>Once your parcel is dispatched, a tracking link with real-time updates will be sent via email & WhatsApp.</p>
              </div>
            </div>
          </div>
        );

      case 'returns':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="p-2.5 bg-black text-white rounded-xs">
                <RefreshCw size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-black">Returns & Exchanges</h3>
                <p className="text-xs text-neutral-500 font-medium">Hassle-Free 7-Day Window</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
              <p>
                We want you to love your LEOR gear. If a size isn't right or you'd like to make a return, we offer a hassle-free 7-day exchange & return policy.
              </p>

              <ul className="space-y-2 list-disc list-inside bg-[#f2f2ef] p-4 rounded-xs border border-black/5 font-medium">
                <li>Items must be unworn, unwashed, with all original tags attached.</li>
                <li>Free doorstep pickup for size exchanges.</li>
                <li>Store credit or original payment refund processed within 48 hours of inspection.</li>
              </ul>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="p-2.5 bg-black text-white rounded-xs">
                <HelpCircle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-black">Frequently Asked Questions</h3>
                <p className="text-xs text-neutral-500 font-medium">Everything You Need to Know</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="border border-black/10 p-4 rounded-xs space-y-1">
                <p className="font-extrabold text-black text-xs uppercase tracking-wider">What materials are LEOR products made of?</p>
                <p className="text-neutral-600 leading-relaxed">We use 100% heavyweight combed cotton, custom selvedge denim, and premium fleece fabrics engineered for durability and breathability.</p>
              </div>

              <div className="border border-black/10 p-4 rounded-xs space-y-1">
                <p className="font-extrabold text-black text-xs uppercase tracking-wider">How do I care for my garments?</p>
                <p className="text-neutral-600 leading-relaxed">Machine wash cold inside out with like colors. Hang dry or tumble dry low. Do not iron directly on graphics.</p>
              </div>

              <div className="border border-black/10 p-4 rounded-xs space-y-1">
                <p className="font-extrabold text-black text-xs uppercase tracking-wider">How can I contact support?</p>
                <p className="text-neutral-600 leading-relaxed">Reach out to our customer support team anytime at support@leor.co.in or call +91 8388595003.</p>
              </div>
            </div>
          </div>
        );

      case 'privacy':
      case 'terms':
      case 'disclaimer':
      case 'refund':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="p-2.5 bg-black text-white rounded-xs">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-black">
                  {activeHelpModal.toUpperCase()} POLICY
                </h3>
                <p className="text-xs text-neutral-500 font-medium">LEOR Legal Terms & Security</p>
              </div>
            </div>

            <div className="text-xs text-neutral-700 leading-relaxed space-y-3 bg-[#f2f2ef] p-4 rounded-xs border border-black/5">
              <p className="font-semibold text-black">
                LEOR™ is committed to customer privacy, secure transactions, and transparent store guidelines.
              </p>
              <p>
                All payment transactions are encrypted using bank-grade SSL protocol. Customer data is handled strictly in accordance with international data privacy standards and is never shared with third parties.
              </p>
              <p>For custom inquiries or detailed legal documentation, please email support@leor.co.in.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveHelpModal(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        <div className="relative min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-[#F8F8F6] shadow-2xl rounded-xs p-6 md:p-8 z-10 border border-black/10"
          >
            <button
              onClick={() => setActiveHelpModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {renderContent()}

            <div className="mt-8 pt-4 border-t border-black/10 flex justify-end">
              <button
                onClick={() => setActiveHelpModal(null)}
                className="bg-black text-white px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
