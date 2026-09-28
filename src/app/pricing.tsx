import { Header } from "@/components/common/Header";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const PRICING_URL = "https://adgurilla.com/pricing";

export default function PricingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0);

  const retry = () => {
    setHasError(false);
    setIsLoading(true);
    setWebViewKey((currentKey) => currentKey + 1);
  };

  const injectedCSS = `
  header,
  .navbar,
  .site-header,
  .mobile-header {
    display: none !important;
  }
`;

const injectedJavaScript = `
  const style = document.createElement('style');
  style.innerHTML = \`${injectedCSS}\`;
  document.head.appendChild(style);
  true;
`;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Header showBack title="Packages & Pricing" />
      <View className="flex-1">
        
        <WebView
          key={webViewKey}
          source={{ uri: PRICING_URL }}
          className="flex-1"
          injectedJavaScript={injectedJavaScript}
          startInLoadingState
          onLoadStart={() => {
            setHasError(false);
            setIsLoading(true);
          }}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          accessibilityLabel="AdGurilla pricing page"
        />

        {isLoading && !hasError ? (
          <View className="absolute inset-0 items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#F97316" />
            <Text className="mt-3 text-sm font-semibold text-text-secondary">
               Loading pricing...
            </Text>
          </View>
        ) : null}

        {hasError ? (
          <View className="absolute inset-0 items-center justify-center bg-white px-8">
            <Text className="text-center text-lg font-bold text-foreground">
              Pricing is unavailable right now
            </Text>
            <Text className="mt-2 text-center text-sm text-text-secondary">
              Check your connection and try loading the plans again.
            </Text>
            <TouchableOpacity
              onPress={retry}
              activeOpacity={0.85}
              className="mt-5 rounded-xl bg-primary px-5 py-3"
              accessibilityLabel="Retry loading pricing"
            >
              <Text className="text-sm font-bold text-white">Try again</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
