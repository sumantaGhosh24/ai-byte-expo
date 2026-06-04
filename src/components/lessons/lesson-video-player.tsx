import { memo, useState } from "react";
import { Pressable, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Image } from "expo-image";
import { Play } from "lucide-react-native";

interface LessonVideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
}

const LessonVideoPlayer = memo(({ videoUrl, thumbnailUrl }: LessonVideoPlayerProps) => {
  const [started, setStarted] = useState(false);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
  });

  const handlePlay = () => {
    setStarted(true);
    player.play();
  };

  return (
    <View className="overflow-hidden rounded-3xl">
      <View className="relative h-[240px] w-full">
        <VideoView
          player={player}
          nativeControls
          allowsPictureInPicture
          style={{ height: "100%", width: "100%" }}
        />
        {!started && (
          <Pressable onPress={handlePlay} className="absolute inset-0">
            <Image
              source={{
                uri: thumbnailUrl,
              }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              style={{ height: 300, width: "100%", borderRadius: 16 }}
            />
            <View className="absolute inset-0 items-center justify-center bg-black/30">
              <View className="items-center justify-center rounded-full bg-white p-5">
                <Play size={32} color="#1447e6" fill="#1447e6" />
              </View>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
});

LessonVideoPlayer.displayName = "LessonVideoPlayer";

export default LessonVideoPlayer;
