"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, ChevronDown, ChevronUp, Info, Link } from "lucide-react";

interface PricingFeature {
  title: string;
  basic: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
  tooltip?: string;
}

interface PricingTier {
  name: string;
  price: {
    monthly: number;
    annually: number;
  };
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
}

const pricingFeatures: PricingFeature[] = [
  {
    title: "Access to video library",
    basic: true,
    pro: true,
    premium: true,
  },
  {
    title: "HD video quality",
    basic: true,
    pro: true,
    premium: true,
  },
  {
    title: "Downloads per month",
    basic: "5",
    pro: "20",
    premium: "Unlimited",
    tooltip: "Number of videos you can download for offline viewing",
  },
  {
    title: "Ad-free experience",
    basic: false,
    pro: true,
    premium: true,
  },
  {
    title: "Exclusive tutorials",
    basic: false,
    pro: true,
    premium: true,
  },
  {
    title: "1-on-1 coaching sessions",
    basic: false,
    pro: "1/month",
    premium: "4/month",
    tooltip: "Personal coaching sessions with our expert instructors",
  },
  {
    title: "Early access to new content",
    basic: false,
    pro: false,
    premium: true,
  },
  {
    title: "Community forum access",
    basic: true,
    pro: true,
    premium: true,
  },
  {
    title: "Priority support",
    basic: false,
    pro: true,
    premium: true,
  },
];

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: {
      monthly: 9.99,
      annually: 99.99,
    },
    description: "Perfect for beginners looking to expand their skills",
    features: [
      "Access to basic video library",
      "HD streaming",
      "5 downloads per month",
      "Community access",
    ],
    ctaText: "Start Basic",
  },
  {
    name: "Pro",
    price: {
      monthly: 19.99,
      annually: 199.99,
    },
    description: "Ideal for professionals seeking to advance their career",
    features: [
      "Everything in Basic",
      "Ad-free experience",
      "20 downloads per month",
      "Exclusive tutorials",
      "Monthly coaching session",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most Popular",
    ctaText: "Get Pro Access",
  },
  {
    name: "Premium",
    price: {
      monthly: 39.99,
      annually: 399.99,
    },
    description: "The ultimate package for serious learners and teams",
    features: [
      "Everything in Pro",
      "Unlimited downloads",
      "Weekly coaching sessions",
      "Early access to new content",
      "Team collaboration tools",
      "Custom learning paths",
    ],
    badge: "Best Value",
    ctaText: "Go Premium",
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showFeatureComparison, setShowFeatureComparison] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleToggleFeatures = () => {
    setShowFeatureComparison(!showFeatureComparison);
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-1/5 h-1/5 bg-[#ff6b3d]/3 blur-[180px] rounded-full"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Choose Your </span>
              <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text inline-block">
                Plan
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Unlock premium content and exclusive features with our flexible
              subscription plans
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex justify-center items-center"
          >
            <div className="flex items-center bg-black/30 p-1 rounded-full backdrop-blur-sm">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isAnnual
                    ? "bg-[#ff6b3d] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isAnnual
                    ? "bg-[#ff6b3d] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Annual <span className="text-xs ml-1 opacity-80">Save 20%</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative rounded-2xl overflow-hidden ${
                tier.highlighted ? "md:-mt-4 md:mb-4 md:pt-4 md:pb-4" : ""
              }`}
            >
              {/* Highlight border effect for featured plan */}
              {tier.highlighted && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ff6b3d] to-[#ff4d00] p-[2px]">
                  <div className="absolute inset-0 rounded-2xl bg-[#0f0f0f]"></div>
                </div>
              )}

              <div
                className={`relative h-full flex flex-col p-6 sm:p-8 bg-[#0f0f0f] backdrop-blur-sm rounded-2xl border ${
                  tier.highlighted
                    ? "border-[#ff6b3d]/50 shadow-xl shadow-[#ff6b3d]/10"
                    : "border-white/10 shadow-lg"
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="absolute inset-0 blur-sm bg-[#ff6b3d]/70 rounded-bl-xl rounded-tr-xl"></div>
                      <div
                        className={`relative px-3 py-1 text-xs font-bold text-white rounded-bl-xl rounded-tr-xl ${
                          tier.highlighted ? "bg-[#ff6b3d]" : "bg-[#ff6b3d]/80"
                        }`}
                      >
                        {tier.badge}
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center">
                  {tier.name}
                  {tier.highlighted && (
                    <Sparkles className="h-5 w-5 ml-2 text-[#ff6b3d]" />
                  )}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      ${isAnnual ? tier.price.annually : tier.price.monthly}
                    </span>
                    <span className="text-gray-400 ml-2 text-sm">
                      {isAnnual ? "/year" : "/month"}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-[#ff6b3d] text-sm mt-1">
                      ${(tier.price.monthly * 12).toFixed(2)} value
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-[#ff6b3d] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:shadow-lg hover:shadow-[#ff6b3d]/20"
                      : "bg-white/10 hover:bg-white/15 border border-white/10"
                  }`}
                >
                  {tier.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature comparison toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={handleToggleFeatures}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white text-sm transition-all duration-300"
          >
            {showFeatureComparison ? "Hide" : "Show"} detailed feature
            comparison
            {showFeatureComparison ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </motion.div>

        {/* Feature comparison table */}
        <AnimatePresence>
          {showFeatureComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="relative overflow-x-auto rounded-xl border border-white/10 shadow-lg bg-[#0f0f0f]/80 backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase border-b border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Feature
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Basic
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center bg-[#ff6b3d]/5"
                      >
                        Pro
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingFeatures.map((feature, index) => (
                      <tr
                        key={index}
                        className={`border-b border-white/5 ${
                          index % 2 === 0 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-medium text-white flex items-center">
                          {feature.title}
                          {feature.tooltip && (
                            <div className="relative ml-2">
                              <button
                                onMouseEnter={() =>
                                  setActiveTooltip(feature.title)
                                }
                                onMouseLeave={() => setActiveTooltip(null)}
                                onClick={() =>
                                  setActiveTooltip(
                                    activeTooltip === feature.title
                                      ? null
                                      : feature.title
                                  )
                                }
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="More information"
                              >
                                <Info className="h-4 w-4" />
                              </button>
                              {activeTooltip === feature.title && (
                                <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 text-white text-xs rounded shadow-lg">
                                  {feature.tooltip}
                                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/90"></div>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof feature.basic === "boolean" ? (
                            feature.basic ? (
                              <Check className="h-5 w-5 text-[#ff6b3d] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-300">
                              {feature.basic}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center bg-[#ff6b3d]/5">
                          {typeof feature.pro === "boolean" ? (
                            feature.pro ? (
                              <Check className="h-5 w-5 text-[#ff6b3d] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-300">{feature.pro}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof feature.premium === "boolean" ? (
                            feature.premium ? (
                              <Check className="h-5 w-5 text-[#ff6b3d] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-300">
                              {feature.premium}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            All plans include a 7-day free trial. No credit card required.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Need a custom plan for your team?{" "}
            <Link href="#" className="text-[#ff6b3d] hover:underline">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
