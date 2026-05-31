import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import Spinner from "@/components/ui/spinner";

const TermsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <WebView
        source={{
          uri: "https://www.lipsum.com",
        }}
        startInLoadingState
        showsVerticalScrollIndicator={false}
        renderLoading={() => <Spinner fullscreen label="Loading Terms..." />}
      />
    </SafeAreaView>
  );
};

export default TermsScreen;
