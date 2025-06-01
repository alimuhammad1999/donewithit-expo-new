import { useEffect } from "react";
import Constants from 'expo-constants';
import expoPushTokens from "@/api/expoPushTokens";

import * as Notifications from 'expo-notifications';

// Configure notifications (add this before your component)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
    }),
});

const useNotifications = (listener: (event: Notifications.NotificationResponse) => void) => {

    useEffect(() => {
        registerForPushNotifications();

        Notifications.addNotificationResponseReceivedListener(listener);
    }, [])

    const registerForPushNotifications = async () => {
        // let token;
        const permission = await Notifications.requestPermissionsAsync()
        console.log(permission);
        if (!permission.granted) return;
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

        try {
            const token =
                await Notifications.getExpoPushTokenAsync({ projectId });
            console.log("token", token.data);
            const response = await expoPushTokens.register(token.data);
            console.log(response);
        } catch (error) {
            console.log("Error getting token", error);
        }
    }
}

export default useNotifications;