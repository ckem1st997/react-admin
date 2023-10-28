import React, { useContext, useEffect, useState } from 'react';
import { EuiFieldText, EuiForm, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSelect, EuiSpacer, EuiTextArea, EuiButton } from '@elastic/eui';
import { CreateContext } from '../../default/Context';
import { WareHouse } from '../../model/model';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box, LoadingOverlay } from '@mantine/core';
import { MessageHelper } from '../../hepler/MessageHelper';
import { useDisclosure } from '@mantine/hooks';
import { Delay } from '../../hepler/FunctionHelper';


type Inputs = {
    example: string,
    exampleRequired: string,
};


export default function () {
    // title
    const title = "Tạo mới kho !";
    // const { isCreate, setIsCreate } = useContext(CreateContext);
    let data: WareHouse = {
        code: '',
        name: '',
        address: '',
        description: '',
        parentId: '',
        path: '',
        inactive: false,
        id: ''
    }
    const form = useForm<WareHouse>({
        initialValues: {
            code: 'test',
            name: '',
            address: '',
            description: '',
            parentId: '',
            path: '',
            inactive: true,
            id: ''
        },

        validate: {
            name: hasLength({ min: 2, max: 10 }, 'Tên phải chưa từ 2-10 kí tự !'),
            code: hasLength({ min: 2, max: 10 }, 'Mã phải chưa từ 2-10 kí tự !'),
        },
    });

    //

    const [visible, { toggle }] = useDisclosure(false);
    useEffect(() => {
    // Delay(2000);
      //  toggle()
    }, []);



    const formCreate = (
        <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((e) => { console.log(e) })}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <TextInput label="Tên kho:" placeholder="Tên kho..." withAsterisk {...form.getInputProps('name')} />
            <TextInput
                label="Mã kho: "
                placeholder="Mã kho..."
                withAsterisk
                mt="md"
                {...form.getInputProps('code')}
            />
            <TextInput
                label="Địa chỉ: "
                placeholder="Địa chỉ..."
                withAsterisk
                mt="md"
                {...form.getInputProps('address')}
            />
            <TextInput
                label="Mô tả:"
                placeholder="Mô tả..."
                withAsterisk
                mt="md"
                {...form.getInputProps('favoriteColor')}
            />
            <NumberInput
                label="Your age"
                placeholder="Your age"
                withAsterisk
                mt="md"
                {...form.getInputProps('age')}
            />

            <Group justify="flex-end" mt="md">
                <EuiButton size='s' >Huỷ bỏ</EuiButton>
                <EuiButton iconType="savedObjectsApp" size='s' type="submit" fill>
                    Lưu
                </EuiButton>
            </Group>
        </Box>



    );

    let modal;
    // if (isCreate) {
    //     modal = (
    //         <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
    //             <EuiModalHeader>
    //                 <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
    //             </EuiModalHeader>
    //             <EuiModalBody>{formCreate}</EuiModalBody>
    //             <EuiModalFooter>

    //             </EuiModalFooter>
    //         </EuiModal>
    //     );
    // }

    return (
        <>
            {formCreate}

        </>
    );
}
