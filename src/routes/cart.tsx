import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  MessageSquare,
  QrCode,
  Smartphone,
  CheckCircle2,
  Info,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { formatINRPrice, formatNumber } from "@/lib/countries";
import { unsplash } from "@/lib/tourist-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function SmartImage({
  src,
  alt,
  className,
  aspectRatio = "16/9",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)} style={{ aspectRatio }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50">
          <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            isLoading && "opacity-0 scale-110",
            !isLoading && "opacity-100 scale-100",
          )}
        />
      )}
    </div>
  );
}

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "918639888490"; // From footer
    const cartSummary = items
      .map(
        (item) =>
          `*${item.package.name}* (${item.countryName})\n` +
          `   Quantity: ${item.quantity}\n` +
          `   Price: ${formatINRPrice(item.package.price * item.quantity)}`,
      )
      .join("\n\n");

    const message = encodeURIComponent(
      `🌟 *New Booking Request - Vicky Ryoko Tours and Party's* 🌟\n\n` +
        `I would like to proceed with the following booking:\n\n` +
        `${cartSummary}\n\n` +
        `--------------------------\n` +
        `📦 *Total Items:* ${totalItems}\n` +
        `💰 *Total Amount:* ${formatINRPrice(totalPrice)}\n` +
        `--------------------------\n\n` +
        `Please let me know the next steps for confirmation. Thank you!`,
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container-app pt-40 pb-32 text-center">
          <div className="relative mx-auto w-fit mb-8">
            <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse" />
            <div className="relative rounded-full bg-secondary p-8 shadow-inner">
              <ShoppingCart className="h-16 w-16 text-primary/60" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Your journey begins here
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Your cart is currently empty. Our world is full of wonders waiting for you to discover
            them.
          </p>
          <Link
            to="/countries"
            className="btn-primary px-10 py-4 text-base group overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Destinations{" "}
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container-app pt-32 pb-24">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Booking Details</h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? "Adventure" : "Adventures"}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <p className="text-sm font-medium">Ready for confirmation</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/countries" className="btn-outline flex items-center gap-2 px-6 py-3">
              <ArrowLeft className="h-4 w-4" /> Add More Places
            </Link>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
            >
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.countryCode}-${item.package.name}`}
                className="group relative flex flex-col sm:flex-row gap-6 p-5 bg-card border border-border/50 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-full sm:w-48 overflow-hidden rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-500">
                  <SmartImage
                    src={unsplash(item.package.query || item.package.name, 400, 300)}
                    alt={item.package.name}
                    aspectRatio="4/3"
                  />
                </div>

                <div className="flex-1 flex flex-col py-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary px-2 py-0.5 rounded-md bg-primary/5">
                          {item.package.tier}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {item.package.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.package.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium flex items-center gap-1.5 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {item.countryName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                      onClick={() => removeItem(item.countryCode, item.package.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-auto pt-6 flex flex-wrap items-end justify-between gap-4 border-t border-border/30">
                    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-full border border-border/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-background shadow-sm transition-all"
                        onClick={() =>
                          updateQuantity(item.countryCode, item.package.name, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-background shadow-sm transition-all"
                        onClick={() =>
                          updateQuantity(item.countryCode, item.package.name, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs text-muted-foreground font-medium mb-1">
                        ${formatNumber(item.package.price)} per package
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        ${formatNumber(item.package.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  Summary <Info className="h-4 w-4 text-muted-foreground" />
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between text-muted-foreground font-medium">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-foreground">{formatINRPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-medium">
                    <span>Service & Support</span>
                    <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest px-2 py-1 bg-green-50 rounded">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-medium">
                    <span>GST / Local Taxes</span>
                    <span className="text-foreground">Included</span>
                  </div>

                  <div className="pt-6 mt-6 border-t border-dashed border-border flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="text-4xl font-black text-primary drop-shadow-sm">
                        {formatINRPrice(totalPrice)}
                      </span>
                    </div>
                    <p className="text-[10px] text-right text-muted-foreground font-medium uppercase tracking-widest">
                      Final payable amount
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <Button
                    onClick={handleWhatsAppCheckout}
                    className="w-full h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg shadow-lg shadow-green-500/20 group transition-all duration-300 active:scale-[0.98]"
                  >
                    <MessageSquare className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Checkout via WhatsApp
                  </Button>

                  <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-16 rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary font-bold text-lg group transition-all duration-300"
                      >
                        <CreditCard className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                        Make Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-none rounded-3xl shadow-2xl">
                      <div className="bg-gradient-to-br from-primary to-sunset p-8 text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <QrCode className="h-32 w-32" />
                        </div>
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-black mb-2 text-white">
                            Complete Your Booking
                          </DialogTitle>
                          <DialogDescription className="text-white/80 text-lg">
                            Scan the QR code or use the phone number to complete your payment.
                          </DialogDescription>
                        </DialogHeader>
                      </div>

                      <div className="p-10 bg-background grid md:grid-cols-2 gap-12">
                        {/* QR Column */}
                        <div className="flex flex-col items-center text-center space-y-6">
                          <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-border/50">
                              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
                                <QrCode className="h-24 w-24 text-primary/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="bg-background/90 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-foreground border border-border shadow-sm">
                                    Official QR
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-bold text-xl flex items-center justify-center gap-2">
                              <QrCode className="h-5 w-5 text-primary" /> Scan to Pay
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed px-4">
                              Supports all major UPI apps, GPay, PhonePe, and banking applications.
                            </p>
                          </div>
                        </div>

                        {/* Details Column */}
                        <div className="flex flex-col justify-center space-y-8">
                          <div className="space-y-6">
                            <div className="space-y-3 p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                  <Smartphone className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                  Phone Number
                                </h4>
                              </div>
                              <p className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                                +91 86398 88490
                              </p>
                              <div className="flex gap-2">
                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">
                                  WhatsApp
                                </span>
                                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">
                                  GPay
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3 p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                  <CreditCard className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                  Payable Amount
                                </h4>
                              </div>
                              <p className="text-3xl font-black text-primary">
                                {formatINRPrice(totalPrice)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                            <Info className="h-4 w-4 mt-0.5 shrink-0" />
                            <p className="leading-relaxed">
                              After payment, please share a screenshot on WhatsApp for instant
                              confirmation of your booking.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-muted/30 border-t border-border flex justify-between items-center">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Secure Encryption
                        </div>
                        <Button onClick={() => setIsPaymentOpen(false)} className="rounded-xl px-8">
                          I've Made the Payment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mt-8 flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl border border-border/50">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-background flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-[10px] leading-tight text-muted-foreground font-medium uppercase tracking-tight">
                    Secure and transparent booking guaranteed by Vicky Ryoko Tours and Party's.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6">
                <h3 className="text-sm font-bold text-accent mb-3 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" /> Need Assistance?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Our travel experts are available 24/7 to help you with your booking or customize
                  your itinerary.
                </p>
                <a
                  href="tel:+918639888490"
                  className="text-sm font-bold text-foreground hover:text-accent flex items-center gap-2 transition-colors"
                >
                  Call +91 86398 88490
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
