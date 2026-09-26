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
    title: "Deliver Better Client Campaigns",
    description:
      "Build stronger media plans with verified locations, audience insights, and formats that match every client brief.",
    image: images.billboard1,
    icon: "target" as const,
  },
  {
    title: "Coordinate Multiple Markets",
    description:
      "Plan campaigns across cities, outlets, and media formats from one organized marketplace.",
    image: images.digitalScreen1,
    icon: "building" as const,
  },
  {
    title: "Transparent Campaign Reporting",
    description:
      "Keep clients informed with clear pricing, booking visibility, and practical performance insights.",
    image: images.mallScreen1,
    icon: "checkCircle" as const,
  },
];

const faqs = [
  "Can agencies manage campaigns for multiple clients?",
  "Can I plan campaigns across multiple cities?",
  "Do you support custom media plans and proposals?",
  "How can I track bookings and campaign performance?",
  "Can agencies collaborate with media owners directly?",
];

export default function ForAdAgencyScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    brief: "",
  });

  const ChevronDown = icons.chevronDown;
  const CheckCircle = icons.checkCircle;
  const MessageIcon = icons.support;

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = () => {
    const subject = encodeURIComponent(
      `Agency enquiry from ${form.name || "AdGurilla website"}`,
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
              For agencies and campaign teams
            </Text>
            <Text className="max-w-[315px] text-4xl font-extrabold leading-tight text-white">
              Partner With AdGurilla as a Creative Agency
            </Text>
            <Text className="mt-4 max-w-[320px] text-sm font-medium leading-relaxed text-slate-200">
              Plan, execute, and report high-impact offline campaigns for every
              client from one trusted platform.
            </Text>
          </View>

          <View className="absolute bottom-5 left-4 right-4 rounded-2xl bg-white p-4 shadow-2xl">
            <Text className="mb-3 text-lg font-extrabold text-foreground">
              Plan a client campaign
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
              placeholder="Agency or company name"
              placeholderTextColor="#94A3B8"
              className="mt-2 rounded-lg border border-border px-3 py-2.5 text-xs text-foreground"
            />
            <TextInput
              value={form.brief}
              onChangeText={(value) => updateForm("brief", value)}
              placeholder="Tell us about your client brief"
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
                Start a conversation
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
            <Text className="text-primary">Agency</Text>
          </Text>
          <View className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          <Text className="mt-3 text-center text-xs font-medium text-text-secondary">
            Give every client a clearer path from brief to measurable delivery.
          </Text>
          <View className="mt-7 gap-4">
            <View className="rounded-xl border border-foreground bg-white p-4 shadow-md">
              <Text className="text-xl font-extrabold text-foreground">
                Direct Agency Partnership
              </Text>
              <Text className="mt-1 text-xs font-semibold text-text-secondary">
                More control. Better client outcomes.
              </Text>
              <View className="my-4 h-px bg-border" />
              {[
                "Verified Media Inventory",
                "Multi-City Campaign Planning",
                "Clear Pricing and Proposals",
                "Campaign Reporting Support",
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
                "Scattered Media Discovery",
                "Unclear Availability",
                "Manual Campaign Coordination",
                "Limited Reporting Visibility",
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
                Multi-Client Campaign Workspace
              </Text>
              <Text className="mt-2 text-xs font-medium leading-relaxed text-text-secondary">
                Keep client briefs, locations, campaign requirements, and
                results aligned while your team moves from planning to
                execution.
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
                      Our team can help your agency plan locations, coordinate
                      requirements, manage bookings, and report campaign
                      progress.
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
              Have a client brief to discuss?
            </Text>
            <Text className="mt-2 text-center text-xs font-medium leading-relaxed text-text-secondary">
              Our team is ready to help you turn the brief into a stronger
              offline campaign.
            </Text>
            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-5 w-full rounded-lg bg-primary py-3"
            >
              <Text className="text-center text-sm font-extrabold text-white">
                Consult with us
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
