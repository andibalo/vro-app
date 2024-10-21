
import { TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_PULSA } from '../../constants'
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

const transactionTypeToInputTitleMap = {
    [TRANSACTION_TYPE_BPJS]: "Nomor BPJS",
    [TRANSACTION_TYPE_PULSA]: "Nomor Telepon",
    [TRANSACTION_TYPE_PLN_TOKEN]: "ID Pelanggan",
}

const plnSchema = yup.object().shape({
    numInput: yup.string().required('ID Pelanggan is required'),
});

const bpjsSchema = yup.object().shape({
    numInput: yup.string().required('ID Pelanggan is required'),
});

const pulsaSchema = yup.object().shape({
    numInput: yup.string().required('ID Pelanggan is required'),
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
