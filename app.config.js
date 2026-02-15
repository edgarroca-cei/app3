export default {
    expo: {
        name: "app3",
        slug: "app3",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "app3",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.edgarrooca.app3"
        },
        android: {
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/images/android-icon-foreground.png",
                backgroundImage: "./assets/images/android-icon-background.png",
                monochromeImage: "./assets/images/android-icon-monochrome.png"
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
            package: "com.edgarrooca.app3"
        },
        web: {
            output: "static",
            favicon: "./assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/splash-icon.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#ffffff",
                    "dark": {
                        "backgroundColor": "#000000"
                    }
                }
            ],
            [
                "./plugins/withUpdateChannel",
                {
                    channel: process.env.EAS_CHANNEL || "production"
                }
            ]
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true
        },
        updates: {
            url: "https://u.expo.dev/23137e7a-4e04-4025-ba12-dbd7684256ea",
            checkAutomatically: "ON_LOAD",
            fallbackToCacheTimeout: 30000
        },
        runtimeVersion: "1.0.0",
        extra: {
            router: {},
            eas: {
                projectId: "23137e7a-4e04-4025-ba12-dbd7684256ea"
            }
        },
        owner: "edgarrooca"
    }
};
