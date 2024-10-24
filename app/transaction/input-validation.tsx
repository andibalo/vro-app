
import { isValidINDPhoneOperatorPrefix, TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_PULSA, transactionTypeToInputTitleMap } from '../../constants'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, View, YStack, Button, Input } from 'tamagui'
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const transactionTypeToInputPlaceholderMap = {
    [TRANSACTION_TYPE_BPJS]: "Masukkan Nomor BPJS",
    [TRANSACTION_TYPE_PULSA]: "Masukkan Nomor Telepon",
    [TRANSACTION_TYPE_PLN_TOKEN]: "Masukkan ID Pelanggan",
}


const plnSchema = yup.object().shape({
    numInput: yup.
        string().
        required('ID Pelanggan is required').
        test("numberOnly", "Must be only numbers", (value) => /^\d+$/.test(value)).
        test("doesNotStartWithZero", "First number must not be a 0", val => val.charAt(0) !== "0"),
});

const bpjsSchema = yup.object().shape({
    numInput: yup.
        string().
        required('Nomor BPJS is required').
        test("numberOnly", "Must be only numbers", (value) => /^\d+$/.test(value)).
        test("startWithZero", "First number must be a 0", val => val.charAt(0) === "0").
        test("len13", "Must be exactly 13 characters", val => val.length === 13),
});

const pulsaSchema = yup.object().shape({
    numInput: yup.
        string().
        required('Nomor Telepon is required').
        test("numberOnly", "Must be only numbers", (value) => /^\d+$/.test(value)).
        test("startWithZeroEight", "Number must start with 08", val => val.slice(0, 2) === "08").
        test("validINDOperatorPrefix", "Must be valid phone operator prefix in Indonesia", (val) => {
            let phonePrefix = isValidINDPhoneOperatorPrefix.find(prefix => prefix === val.slice(0, 4))
            return !!phonePrefix
        }),
});


const resolveSchema = (transactionType: string): any => {
    if (transactionType === TRANSACTION_TYPE_BPJS) {
        return bpjsSchema
    }

    if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
        return plnSchema
    }

    if (transactionType === TRANSACTION_TYPE_PULSA) {

        return pulsaSchema
    }
}

export default function TransactionInputValidationScreen() {
    const { transactionType } = useLocalSearchParams<{ transactionType: string }>()
    const navigation = useNavigation()
    const [inputMaxLength, setInputMaxLength] = useState<number>(13)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resolveSchema(transactionType)),
        defaultValues: {
            numInput: ''
        },
    });

    useEffect(() => {
        if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
            setInputMaxLength(12)
        }
    }, [])


    const onPressSend = (formData) => {

        if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
            //@ts-ignore
            navigation.navigate("transaction/pln", {
                transactionType: TRANSACTION_TYPE_PLN_TOKEN,
                data: formData.numInput
            })
        }

        if (transactionType === TRANSACTION_TYPE_PULSA) {
            //@ts-ignore
            navigation.navigate("transaction/pulsa", {
                transactionType: TRANSACTION_TYPE_PULSA,
                data: formData.numInput
            })
        }

        if (transactionType === TRANSACTION_TYPE_BPJS) {
            //@ts-ignore
            navigation.navigate("transaction/bpjs", {
                transactionType: TRANSACTION_TYPE_BPJS,
                data: formData.numInput
            })
        }
    }

    return (
        <View flex={1} bg="$background" px="$4" py="$3">
            <YStack flex={1} justifyContent="space-between">
                <View mt="$4">
                    <Text mb="$2">{transactionTypeToInputTitleMap[transactionType]}<Text color={"$red10"}>*</Text></Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder={transactionTypeToInputPlaceholderMap[transactionType]}
                                maxLength={inputMaxLength}
                                keyboardType='number-pad'
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        name="numInput"
                    />
                    {errors.numInput && <Text color="$red10" fontSize={12}>{errors.numInput.message}</Text>}
                </View>
                <View>
                    <Button theme="active" backgroundColor={"$blue10"} color="white" onPress={handleSubmit(onPressSend)}>Continue</Button>
                </View>
            </YStack>
        </View>
    )
}
