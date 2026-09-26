import { Header } from "@/components/common/Header";
import { NavigationMenuModal } from "@/components/home/NavigationMenuModal";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React, { useState } from "react";
import {
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const benefits = [
  {
    title: "Monetize Your Inventory",
    description:
      "Turn available billboards, screens, transit spaces, and storefronts into a dependable new revenue stream.",
    image: images.billboard1,
    icon: "pricing" as const,
  },
  {
    title: "Manage Your Spaces",
    description:
      "Keep your inventory, availability, pricing, and campaign enquiries organized from one simple dashboard.",
    image: images.digitalScreen1,
    icon: "building" as const,
  },
  {
    title: "Transparent Campaigns & Clear Payouts",
    description:
      "Work with serious advertisers through clear campaign requirements, verified bookings, and predictable payouts.",
    image: images.mallScreen1,
    icon: "checkCircle" as const,
  },
];

const faqs = [
  "How do I list my advertising spaces?",
  "What types of media inventory can I add?",
  "How are bookings and payments managed?",
  "Can I control availability and pricing?",
  "Do you support multiple locations?",
];

export default function ForMediaOwnerScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    inventory: "",
  });

  const ArrowRight = icons.arrowRight;
  const ChevronDown = icons.chevronDown;
  const CheckCircle = icons.checkCircle;
  const MessageIcon = icons.support;

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = () => {
    const subject = encodeURIComponent(
      `Media owner enquiry from ${form.name || "AdGurilla website"}`,
    );
    Linking.openURL(`mailto:info@adgurilla.com?subject=${subject}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="relative min-h-[430px] overflow-hidden bg-slate-950">
          <ImageBackground
            source={{ uri: images.heroCityscape }}
            resizeMode="cover"
            className="absolute inset-0"
          />
          <View className="absolute inset-0 bg-black/60" />
          <View className="px-5 pt-12 pb-36">
            <Text className="mb-3 text-xs font-extrabold uppercase tracking-[2px] text-white">
              For media owners and space partners
            </Text>
            <Text className="max-w-[310px] text-4xl font-extrabold leading-tight text-white">
              Monetize Your Space with AdGurilla
            </Text>
            <Text className="mt-4 max-w-[320px] text-sm font-medium leading-relaxed text-slate-200">
              Put your advertising inventory in front of brands that are ready
              to grow.
            </Text>
          </View>

          <View className="absolute bottom-5 left-4 right-4 rounded-2xl bg-white p-4 shadow-2xl">
            <Text className="mb-3 text-lg font-extrabold text-foreground">
              List your advertising space
            </Text>
            <View className="flex-row gap-2">
              <TextInput
                value={form.name}
                onChangeText={(value) => updateForm("name", value)}
                placeholder="Your name"
                placeholderTextColor="#94A3B8"
                className="flex-1 rounded-lg border border-border px-3 py-2.5 text-xs text-foreground"
              />
              <TextInput
                value={form.email}
                onChangeText={(value) => updateForm("email", value)}
                placeholder="Work email"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                className="flex-1 rounded-lg border border-border px-3 py-2.5 text-xs text-foreground"
              />
            </View>
            <TextInput
              value={form.company}
              onChangeText={(value) => updateForm("company", value)}
              placeholder="Business or company name"
              placeholderTextColor="#94A3B8"
              className="mt-2 rounded-lg border border-border px-3 py-2.5 text-xs text-foreground"
            />
            <TextInput
              value={form.inventory}
              onChangeText={(value) => updateForm("inventory", value)}
              placeholder="Tell us about your spaces"
              placeholderTextColor="#94A3B8"
              multiline
              className="mt-2 min-h-[54px] rounded-lg border border-border px-3 py-2.5 text-xs text-foreground"
              textAlignVertical="top"
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-3 rounded-lg bg-primary py-3"
            >
              <Text className="text-center text-sm font-extrabold text-white">
                List your space
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 py-10">
          <Text className="text-center text-2xl font-extrabold text-foreground">
            Why <Text className="text-primary">AdGurilla</Text>?
          </Text>
          <View className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          <View className="mt-7 gap-4">
            {benefits.map((benefit) => {
              const BenefitIcon = icons[benefit.icon];
              return (
                <View
                  key={benefit.title}
                  className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
                >
                  <View className="relative">
                    <ImageBackground
                      source={{ uri: benefit.image }}
                      resizeMode="cover"
                      className="h-44"
                    />
                    <BenefitIcon className="absolute right-3 top-3 h-8 w-8 text-primary" />
                  </View>
                  <View className="p-4">
                    <Text className="text-base font-extrabold text-foreground">
                      {benefit.title}
                    </Text>
                    <Text className="mt-2 text-xs font-medium leading-relaxed text-text-secondary">
                      {benefit.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View className="bg-surfaceMuted px-4 py-10">
          <Text className="text-center text-2xl font-extrabold text-foreground">
            The Right Option For Your{" "}
            <Text className="text-primary">Space</Text>
          </Text>
          <View className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          <Text className="mt-3 text-center text-xs font-medium text-text-secondary">
            Choose a partnership model that fits your inventory and growth
            plans.
          </Text>
          <View className="mt-7 gap-4">
            <View className="rounded-xl border border-foreground bg-white p-4 shadow-md">
              <Text className="text-xl font-extrabold text-foreground">
                Direct Monetization Model
              </Text>
              <Text className="mt-1 text-xs font-semibold text-text-secondary">
                More control. Better visibility.
              </Text>
              <View className="my-4 h-px bg-border" />
              {[
                "Qualified Brand Enquiries",
                "Verified Campaign Bookings",
                "Flexible Pricing Control",
                "Reliable Payout Tracking",
              ].map((item) => (
                <View key={item} className="mb-3 flex-row items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <Text className="flex-1 text-xs font-extrabold text-foreground">
                    {item}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                onPress={handleSubmit}
                className="mt-2 rounded-lg bg-primary py-3"
              >
                <Text className="text-center text-xs font-extrabold text-white">
                  Become a partner
                </Text>
              </TouchableOpacity>
            </View>
            <View className="rounded-xl border border-foreground bg-white p-4">
              <Text className="text-xl font-extrabold text-foreground">
                Others
              </Text>
              <Text className="text-xs font-semibold text-text-secondary">
                Where they fall short
              </Text>
              <View className="my-4 h-px bg-border" />
              {[
                "Unclear Revenue Share",
                "Limited Brand Access",
                "Manual Campaign Coordination",
                "Delayed Payment Visibility",
              ].map((item) => (
                <View key={item} className="mb-3 flex-row items-center">
                  <View className="mr-2 h-4 w-4 items-center justify-center rounded-full bg-red-100">
                    <Text className="text-[10px] font-extrabold text-primary">
                      x
                    </Text>
                  </View>
                  <Text className="flex-1 text-xs font-bold text-text-secondary">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="px-4 py-10">
          <Text className="text-2xl font-extrabold text-foreground">
            Explore our <Text className="text-primary">standout feature</Text>
          </Text>
          <View className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <View className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <ImageBackground
              source={{ uri: images.retailAd1 }}
              resizeMode="cover"
              className="h-52"
            />
            <View className="p-4">
              <Text className="text-base font-extrabold text-foreground">
                Performance Insights
              </Text>
              <Text className="mt-2 text-xs font-medium leading-relaxed text-text-secondary">
                Understand enquiries, bookings, and inventory performance so you
                can make better decisions about every space.
              </Text>
              <View className="mt-4 flex-row justify-center gap-1">
                <View className="h-2 w-2 rounded-full bg-primary" />
                <View className="h-2 w-2 rounded-full bg-border" />
                <View className="h-2 w-2 rounded-full bg-border" />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-surfaceMuted px-4 py-10">
          <Text className="text-center text-2xl font-extrabold text-foreground">
            Frequently Asked <Text className="text-primary">Questions</Text>
          </Text>
          <View className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          <View className="mt-7 gap-3">
            {faqs.map((question, index) => {
              const isOpen = expandedFaq === index;
              return (
                <TouchableOpacity
                  key={question}
                  onPress={() => setExpandedFaq(isOpen ? null : index)}
                  activeOpacity={0.8}
                  className="rounded-xl border border-border bg-white px-4 py-4 shadow-sm"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="flex-1 pr-4 text-sm font-bold leading-5 text-foreground">
                      {question}
                    </Text>
                    <ChevronDown
                      className={`h-4 w-4 text-text-secondary ${isOpen ? "rotate-180" : ""}`}
                    />
                  </View>
                  {isOpen && (
                    <Text className="mt-3 pr-6 text-xs font-medium leading-relaxed text-text-secondary">
                      Our team can help you list inventory, set availability,
                      manage enquiries, and understand campaign performance.
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="mt-8 items-center rounded-2xl bg-white p-6 shadow-lg">
            <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-primary-light">
              <MessageIcon className="h-6 w-6 text-primary" />
            </View>
            <Text className="text-center text-xl font-extrabold text-foreground">
              Ready to list your spaces?
            </Text>
            <Text className="mt-2 text-center text-xs font-medium leading-relaxed text-text-secondary">
              Talk to our team and start turning your inventory into measurable
              revenue.
            </Text>
            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-5 w-full rounded-lg bg-primary py-3"
            >
              <Text className="text-center text-sm font-extrabold text-white">
                Talk to our team
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <NavigationMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </SafeAreaView>
  );
}
