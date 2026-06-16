import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MapPin,
  Calendar,
  MessageCircle,
  CreditCard,
  QrCode,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { useCart } from "@/context/CartContext";
import { formatINRPrice } from "@/lib/countries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/mobile-view/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart - Vicky Ryoko Tours" },
      { name: "description", content: "View and manage your tour packages." },
    ],
  }),
  component: MobileViewCartPage,
});

const WHATSAPP_NUMBER = "918639888490";

function buildWhatsAppMessage(
  items: ReturnType<typeof useCart>["items"],
  totalItems: number,
): string {
  const lines: string[] = [
    "🌟 *New Booking Request - Vicky Ryoko Tours and Party's* 🌟",
    "",
    "I would like to proceed with the following booking:",
    "",
  ];

  items.forEach((item) => {
    lines.push(`*${item.package.name}* (${item.countryName})`);
    lines.push(`   Duration: ${item.package.duration}`);
    lines.push(
      `   Price: ${formatINRPrice(item.package.price)} x ${item.quantity} = ${formatINRPrice(
        item.package.price * item.quantity,
      )}`,
    );
    lines.push("");
  });

  const totalAmount = items.reduce((s, i) => s + i.package.price * i.quantity, 0);

  lines.push("--------------------------");
  lines.push(`📦 *Total Packages:* ${items.length}`);
  lines.push(`🧾 *Total Quantity:* ${totalItems}`);
  lines.push(`💰 *Total Amount:* ${formatINRPrice(totalAmount)}`);
  lines.push("--------------------------");
  lines.push("");
  lines.push("Please let me know the next steps for confirmation. Thank you!");
  return lines.join("\n");
}

function TierBadge({ tier }: { tier: string }) {
  const cfg: Record<string, { bg: string; text: string }> = {
    luxury: { bg: "bg-amber-100", text: "text-amber-700" },
    medium: { bg: "bg-blue-100", text: "text-blue-700" },
    budget: { bg: "bg-green-100", text: "text-green-700" },
  };
  const c = cfg[tier] ?? cfg.budget;
  return (
    <span
      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${c.bg} ${c.text}`}
    >
      {tier}
    </span>
  );
}

function MobileViewCartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const waMsg = buildWhatsAppMessage(items, totalItems);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  if (items.length === 0) {
    return (
      <MobileViewLayout title="Your Cart">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center mb-6 shadow-inner">
            <ShoppingCart className="h-14 w-14 text-orange-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-[260px]">
            Start exploring amazing destinations and add your dream packages!
          </p>
          <Link
            to="/mobile-view/countries"
            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all"
          >
            Explore Countries <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </MobileViewLayout>
    );
  }

  return (
    <MobileViewLayout title="Your Cart">
      <div className="pb-36 pt-16 relative z-10">
        {/* Cart Items */}
        <div className="p-4 space-y-3">
          {items.map((item) => (
            <div
              key={`${item.countryCode}-${item.package.name}`}
              className="bg-white rounded-2xl p-4 shadow-md shadow-gray-100 border border-gray-50"
            >
              {/* Header row */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                  🌍
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 text-sm leading-tight truncate">
                    {item.package.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                    <MapPin className="h-3 w-3" /> {item.countryName}
                  </div>
                  <div className="mt-1.5">
                    <TierBadge tier={item.package.tier} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-gray-400 font-medium">Price</p>
                  <p className="text-base font-black text-orange-600 leading-tight">
                    {formatINRPrice(item.package.price)}
                  </p>
                  <p className="text-[9px] text-gray-400">per person</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-3" />

              {/* Footer row: qty + delete */}
              <div className="flex items-center justify-between">
                {/* Qty controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() =>
                      updateQuantity(item.countryCode, item.package.name, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                  <span className="text-sm font-black text-gray-900 w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.countryCode, item.package.name, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.countryCode, item.package.name)}
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>

              {/* Subtotal */}
              <div className="mt-2 flex justify-end">
                <span className="text-[10px] text-gray-400">
                  Subtotal:{" "}
                  <span className="font-black text-gray-800">
                    {formatINRPrice(item.package.price * item.quantity)}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mx-4 bg-white rounded-2xl p-5 shadow-md shadow-gray-100 border border-gray-50">
          <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full" />
            Order Summary
          </h3>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">{totalItems} Package(s)</span>
              <span className="font-bold text-gray-900">{formatINRPrice(totalPrice)}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex justify-between items-center">
              <span className="font-black text-gray-900">Total Amount</span>
              <span className="text-xl font-black text-orange-600">
                {formatINRPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY BOTTOM ACTION BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 pt-3 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="flex items-center gap-3">
          {/* Make Payment — Dialog */}
          <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
            <DialogTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all">
                <CreditCard className="h-5 w-5" />
                Make Payment
              </button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md p-0 overflow-hidden border-none rounded-3xl shadow-2xl">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 text-white relative">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <QrCode className="h-20 w-20" />
                </div>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black mb-1 text-white">
                    Complete Payment
                  </DialogTitle>
                  <DialogDescription className="text-white/80 text-sm">
                    Scan QR or use phone number to complete.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 bg-white space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-20 blur-xl" />
                    <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                      <div className="w-40 h-40 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-100">
                        <QrCode className="h-20 w-20 text-blue-600/30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-white px-2 py-1 rounded-full text-[8px] font-black uppercase text-blue-600 border border-blue-100">
                            Scan to Pay
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 group active:scale-95 transition-transform">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                          GPay / PhonePe / Paytm
                        </p>
                        <p className="text-lg font-black text-blue-900 tracking-tight">
                          +91 86398 88490
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-[10px] font-bold text-gray-600 uppercase">
                          Secure Payment
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-[10px] font-bold text-gray-600 uppercase">
                          Instant Confirm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsPaymentOpen(false)}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all"
                  >
                    Done, I've Paid
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Proceed — secondary */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-orange-200 active:scale-95 transition-all"
          >
            Proceed <ArrowRight className="h-5 w-5" />
          </a>
        </div>
        <button
          onClick={clearCart}
          className="w-full mt-2.5 text-center text-xs text-gray-400 hover:text-red-500 py-1 font-medium"
        >
          Clear Cart
        </button>
      </div>
    </MobileViewLayout>
  );
}
