import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text, View } from 'tamagui'
import { OtpInput } from "react-native-otp-entry";
import { BIRTH_DATE_PIN, TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_PULSA } from '../../constants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/slice/transaction';
import { TransactionStatus } from '../../types'
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs'
import { plnTokenItemsList } from './pln';

export default function PINValidationScreen() {
    const { transactionType, itemID } = useLocalSearchParams<{ transactionType: string, itemID: string }>()
    const [attemptCount, setAttemptCount] = useState<number>(0)
    const [itemData, setItemData] = useState<any>({})
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
            const itemData = plnTokenItemsList.find(item => item.id === itemID)

            setItemData(itemData)
            return
        }

        if (transactionType === TRANSACTION_TYPE_BPJS) {

            return
        }

        if (transactionType === TRANSACTION_TYPE_PULSA) {

            return
        }
    }, [])

    useEffect(() => {
        if (attemptCount === 3) {
            console.log("TRANSACTION FAILED")

            let trxID = 'TXN-' + nanoid()

            dispatch(addTransaction({
                id: trxID,
                type: transactionType,
                name: itemData.name,
                value: itemData.value,
                status: TransactionStatus.Failed,
                createdAt: dayjs().toISOString()
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
            name: itemData.name,
            value: itemData.value,
            status: TransactionStatus.Success,
            createdAt: dayjs().toISOString()
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


