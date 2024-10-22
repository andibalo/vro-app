import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text, View } from 'tamagui'
import { OtpInput } from "react-native-otp-entry";
import { BIRTH_DATE_PIN } from '../../constants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from 'redux/slice/transaction';
import { TransactionStatus } from '../../types'
import { nanoid } from '@reduxjs/toolkit';

export default function PINValidationScreen() {
    const { transactionType, itemID } = useLocalSearchParams<{ transactionType: string, itemID: string }>()
    const [attemptCount, setAttemptCount] = useState<number>(0)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        if (attemptCount === 3) {
            console.log("TRANSACTION FAILED")

            let trxID = 'TXN-' + nanoid()

            dispatch(addTransaction({
                id: trxID,
                type: transactionType,
                name: "PLN 30rb",
                value: 20000,
                status: TransactionStatus.Failed,
                createdAt: Date.now().toString()
            }))

            // @ts-ignore
            navigation.navigate("transaction/transaction-fail", {
                trxID
            })
        }
    }, [attemptCount])

    const handlePINOnFilled = (text: string) => {
        if (text === BIRTH_DATE_PIN) {
            setAttemptCount((prev) => prev + 1)
            return
        }


        let trxID = 'TXN-' + nanoid()

        dispatch(addTransaction({
            id: trxID,
            type: transactionType,
            name: "PLN 30rb",
            value: 20000,
            status: TransactionStatus.Success,
            createdAt: Date.now().toString()
        }))

        // @ts-ignore
        navigation.navigate("transaction/transaction-success", {
            trxID
        })
    }

    return (
        <View flex={1} alignItems="center" justifyContent="center" bg="$background">
            <Text fontSize={20} color="$black10" fontWeight="bold" mb="$3">
                Masukkan PIN Anda
            </Text>
            <View px="$8">
                <OtpInput
                    secureTextEntry
                    numberOfDigits={6}
                    onFilled={handlePINOnFilled}
                />
            </View>
        </View>
    )
}


