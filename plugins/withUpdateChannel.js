const { withExpoPlist, withAndroidManifest } = require('@expo/config-plugins');

const withUpdateChannel = (config, { channel }) => {
    config = withExpoPlist(config, (config) => {
        config.modResults.EXPO_UPDATES_CHANNEL_NAME = channel;
        return config;
    });

    config = withAndroidManifest(config, (config) => {
        const mainApplication = config.modResults.manifest.application[0];
        const metaData = mainApplication['meta-data'] || [];

        // Remove existing if any
        const existingIndex = metaData.findIndex(item => item.$['android:name'] === 'expo.modules.updates.EXPO_UPDATES_CHANNEL_NAME');
        if (existingIndex !== -1) {
            metaData.splice(existingIndex, 1);
        }

        // Add new
        metaData.push({
            $: {
                'android:name': 'expo.modules.updates.EXPO_UPDATES_CHANNEL_NAME',
                'android:value': channel,
            },
        });

        mainApplication['meta-data'] = metaData;
        return config;
    });

    return config;
};

module.exports = withUpdateChannel;
