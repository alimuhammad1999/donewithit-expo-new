import { FunctionComponent, useEffect, useRef } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";
import AppText from "../components/AppText.android";
import ListItem from "../components/List/ListItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Listing } from "./ListingScreen";
import routes from "../navigation/routes";
import useAuth from "@/auth/useAuth";
import Screen from "@/components/Screen";
import { FormikHelpers, FormikValues } from "formik";
import { AppFrorm, AppFrormField, SubmitButton } from "@/components/Form";
import * as yup from 'yup';
import authApi from "@/auth/storage";
import apiClient from "@/api/client";

let validationSchema = yup.object().shape({
    message: yup.string().required().min(1).max(200).label("message"),
})

const ListingDetails: FunctionComponent = () => {
    const listing = useRoute().params as Listing;
    const { user } = useAuth();
    if (!listing) return null
    const navigator = useNavigation()

    const submitData = async (values: FormikValues, { resetForm }: FormikHelpers<FormikValues>) => {
        // setUploadVisible(true);
        // setProgress(0);
        const authToken = await authApi.getToken();
        const response = await apiClient.post('/messages', {
            listingId: listing.id,
            message: values.message,
        }, { headers: { "x-auth-token": authToken } })
        // const response = await listingApi.uploadData({ ...values, location });
        // (progressEvent) => setProgress(progressEvent.loaded / progressEvent.total!));

        if (!response.ok) {
            console.log(response, '\n\n\n\nError: ', response.originalError, response.data, response.problem);
            if (messageInputRef.current) {
                messageInputRef.current.blur();
            }
            // setUploadVisible(false);
        } else Alert.alert('Success', 'Your message has been sent successfully');
        resetForm({
            values: { message: ' ' }, // Clear the input
            touched: { message: false }, // Mark field as untouched to trigger blur
        });
        Keyboard.dismiss();
    };
    const messageInputRef = useRef<TextInput>(null);

    return (
        <Screen>
            <ScrollView
                keyboardShouldPersistTaps="handled" >
                <Image
                    style={styles.image}
                    preview={{ uri: listing.images[0].thumbnailUrl }}
                    uri={listing.images[0].url}
                    tint="light"
                />
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
                <AppText style={styles.description}>{listing.description}</AppText>
                <ListItem style={{ top: 30 }} title={user!.name} info="11 Ads"
                    image={require('./../assets/RM_logo.png')} onPress={() => navigator.navigate(routes.ACCOUNT_DETAILS as never)}
                />
                <KeyboardAvoidingView style={styles.formContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}>
                    <AppFrorm
                        initialValues={{ message: '' }}
                        onSubmit={submitData} validationSchema={validationSchema}>
                        <AppFrormField
                            placeholder="Message"
                            name="message" textContentType='name' />
                        <SubmitButton title="Submit" />
                    </AppFrorm>
                </KeyboardAvoidingView>
            </ScrollView >
        </Screen>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1
    }, image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: colors.black
    }, formContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    title: {
        fontSize: 30, margin: 5,
    },
    price: {
        fontSize: 20, marginLeft: 5,
        color: 'blue',
    },
    description: {
        fontSize: 20, marginLeft: 5, marginTop: 15, marginBottom: 30,
    },
});

export default ListingDetails;