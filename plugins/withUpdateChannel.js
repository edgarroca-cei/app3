const { withExpoPlist, withAndroidManifest } = require('@expo/config-plugins');

const withUpdateChannel = (config, { channel }) => {
    config = withExpoPlist(config, (config) => {
        config.modResults.EXPO_UPDATES_CHANNEL_NAME = channel;
        config.modResults.EXPO_UPDATES_ENABLED = true;
        config.modResults.EXPO_UPDATES_CHECK_ON_LAUNCH = 'ALWAYS';
        config.modResults.EXPO_UPDATES_LAUNCH_WAIT_MS = 30000;

        // Fallback if runtime version didn't get picked up from app.json
        if (!config.modResults.EXPO_RUNTIME_VERSION) {
            config.modResults.EXPO_RUNTIME_VERSION = config.version || '1.0.0';
        }

        return config;
    });

    config = withAndroidManifest(config, (config) => {
        const mainApplication = config.modResults.manifest.application[0];
        const metaData = mainApplication['meta-data'] || [];

        const addOrUpdate = (name, value) => {
            const existingIndex = metaData.findIndex(item => item.$['android:name'] === name);
            if (existingIndex !== -1) {
                metaData.splice(existingIndex, 1);
            }
            metaData.push({
                $: {
                    'android:name': name,
                    'android:value': value,
                },
            });
        };

        addOrUpdate('expo.modules.updates.EXPO_UPDATES_CHANNEL_NAME', channel);
        addOrUpdate('expo.modules.updates.EXPO_UPDATES_ENABLED', 'true');
        addOrUpdate('expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH', 'ALWAYS');
        addOrUpdate('expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS', '30000');

        mainApplication['meta-data'] = metaData;
        return config;
    });

    return config;
};

module.exports = withUpdateChannel;
