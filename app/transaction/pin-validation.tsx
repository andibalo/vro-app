import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text, View } from 'tamagui'
import { OtpInput } from "react-native-otp-entry";
import { BIRTH_DATE_PIN, phonePrefixToINDOperatorMap, TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_PULSA } from '../../constants';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/slice/transaction';
import { ITransaction, TransactionStatus } from '../../types'
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs'
import { plnTokenItemsList } from './pln';
import { bpjsItemsList } from './bpjs';
import { pulsaItemsList } from './pulsa';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context';

export default function PINValidationScreen() {
    const { transactionType, itemID, data } = useLocalSearchParams<{ transactionType: string, itemID: string, data: string }>()
    const [attemptCount, setAttemptCount] = useState<number>(0)
    const [itemData, setItemData] = useState<any>({})
    const [isInputWrong, setIsInputWrong] = useState(false)
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error(
            "PINValidationScreen has to be used within <ThemeContext.Provider>"
        );
    }

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const shakeTranslateX = useSharedValue(0)

    useEffect(() => {
        if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
            const plnItemData = plnTokenItemsList.find(item => item.id === itemID)

            setItemData(plnItemData)
            return
        }

        if (transactionType === TRANSACTION_TYPE_BPJS) {
            const bpjsItemData = bpjsItemsList.find(item => item.id === itemID)

            setItemData(bpjsItemData)
            return
        }

        if (transactionType === TRANSACTION_TYPE_PULSA) {
            const pulsaItemData = pulsaItemsList.find(item => item.id === itemID)

            setItemData(pulsaItemData)
            return
        }
    }, [])

    useEffect(() => {
        if (attemptCount === 3) {
            let trxID = 'TXN-' + nanoid()


            let trxData: ITransaction = {
                id: trxID,
                type: transactionType,
                number: data,
                name: itemData.name,
                value: itemData.value,
                status: TransactionStatus.Failed,
                createdAt: dayjs().toISOString()
            }

            if (transactionType === TRANSACTION_TYPE_PULSA) {
                let phonePrefix = data.slice(0, 4)
                trxData.phoneOperatorImgURL = phonePrefixToINDOperatorMap[phonePrefix].imgURL
                trxData.phoneOperatorName = phonePrefixToINDOperatorMap[phonePrefix].name
            }

            dispatch(addTransaction(trxData))

            // @ts-ignore
            navigation.navigate("transaction/transaction-complete", {
                trxID
            })
        }
    }, [attemptCount])


    const setIsInputWrongToFalse = () => {
        setIsInputWrong(false)
    };

    const shake = useCallback(() => {
        let transalationVal = 10
        let timingConfig = {
            duration: 80,
            easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
        }

        shakeTranslateX.value = withSequence(
            withTiming(transalationVal, timingConfig),
            withRepeat(withTiming(-transalationVal, timingConfig), 3, true),
            withSpring(0, {
                mass: 0.5
            }, (finished) => {
                if (finished) {
                    // @ts-ignore
                    runOnJS(setIsInputWrongToFalse)(null);
                }
            }),
        )
    }, [])

    const rShakeStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: shakeTranslateX.value }],
        }
    }, [])

    const handlePINOnFilled = (text: string) => {
        if (text === BIRTH_DATE_PIN) {
            setAttemptCount((prev) => prev + 1)
            setIsInputWrong(true)
            shake()
            return
        }

        let trxID = 'TXN-' + nanoid()

        let trxData: ITransaction = {
            id: trxID,
            type: transactionType,
            number: data,
            name: itemData.name,
            value: itemData.value,
            status: TransactionStatus.Success,
            createdAt: dayjs().toISOString()
        }

        if (transactionType === TRANSACTION_TYPE_PULSA) {
            let phonePrefix = data.slice(0, 4)
            trxData.phoneOperatorImgURL = phonePrefixToINDOperatorMap[phonePrefix].imgURL
            trxData.phoneOperatorName = phonePrefixToINDOperatorMap[phonePrefix].name
        }

        dispatch(addTransaction(trxData))

        // @ts-ignore
        navigation.navigate("transaction/transaction-complete", {
            trxID
        })
    }

    return (
        <View flex={1} alignItems="center" justifyContent="center" bg="$background">
            <Text fontSize={20} color="$color" fontWeight="bold" mb="$3">
                {t('transaction.pinValidation.title')}
            </Text>
            <Animated.View style={[rShakeStyle]}>
                <View px="$8">
                    <OtpInput
                        secureTextEntry
                        numberOfDigits={6}
                        onFilled={handlePINOnFilled}
                        theme={{
                            pinCodeTextStyle: {
                              color: themeContext.theme === "dark" ? "white" : "black"  
                            },
                            pinCodeContainerStyle: {
                                borderColor: isInputWrong ? "red" : "#DFDFDE"
                            },
                            focusedPinCodeContainerStyle: {
                                borderColor: isInputWrong ? "red" : "#A4D0A4"
                            }
                        }}
                    />
                </View>
            </Animated.View>
        </View>
    )
}


