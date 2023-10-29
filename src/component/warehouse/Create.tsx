import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { EuiFieldText, EuiForm, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSelect, EuiSpacer, EuiTextArea, EuiButton } from '@elastic/eui';
import { CreateContext } from '../../default/Context';
import { MessageResponse, WareHouse, WareHouseDTOs } from '../../model/model';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box, LoadingOverlay, Title, CheckIcon, Combobox, Pill, useCombobox, PillsInput, NativeSelect, Select, Textarea, ComboboxItem } from '@mantine/core';
import { MessageHelper } from '../../hepler/MessageHelper';
import { useDisclosure } from '@mantine/hooks';
import { Delay } from '../../hepler/FunctionHelper';
import Repository from '../../extension/HttpHelper';
import { isNullOrUndefined, isNullOrUndefinedArry } from '../../hepler/StringHelper';


type Inputs = {
    example: string,
    exampleRequired: string,
};


export default function () {
    // title
    const title = "Tạo mới kho !";
    // const { isCreate, setIsCreate } = useContext(CreateContext);
    let data: WareHouseDTOs = {
        code: '',
        name: '',
        address: '',
        description: '',
        parentId: '',
        path: '',
        inactive: false,
        id: '',
        wareHouseDTOs: null,
        onDelete: false
    }
    const form = useForm<WareHouseDTOs>({
        initialValues: {
            code: '',
            name: '',
            address: '',
            description: '',
            parentId: '',
            path: '',
            inactive: true,
            id: '',
            wareHouseDTOs: null,
            onDelete: false
        },

        validate: {
            name: hasLength({ min: 2, max: 100 }, 'Tên phải chưa từ 2-10 kí tự !'),
            code: hasLength({ min: 2, max: 100 }, 'Mã phải chưa từ 2-10 kí tự !'),
            parentId: hasLength({ min: 2, max: 100 }, 'Bạn chưa chọn dữ liệu kho cha !'),
        },
    });

    //
    const repository = new Repository("http://localhost:5005/api/v1");
    const [visible, { toggle }] = useDisclosure(true);
    useEffect(() => {
        callApiGetData()
    }, []);
    // call api

    const callApiGetData = async () => {
        let urlCreate = `/WareHouses/create`;
        let callapi = await repository.get<MessageResponse<WareHouseDTOs>>(urlCreate);
        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
            const dataApi = callapi?.data;
            if (dataApi != null && !isNullOrUndefined(dataApi))
                form.setValues(dataApi);
            let urlAll = `/WareHouses/get-all`;
            let callapigetall = await repository.get<MessageResponse<WareHouseDTOs[]>>(urlAll);
            if (!isNullOrUndefined(callapigetall) && !isNullOrUndefinedArry(callapigetall?.data)) {
                const dataApiAll = callapigetall?.data;
                let dataarry: ComboboxItem[] = [];
                if (dataApiAll !== undefined)
                    for (let index = 0; index < dataApiAll.length; index++) {
                        const element = dataApiAll[index];
                        const elementp: ComboboxItem = {
                            label: '[' + element.code + ']' + element.name,
                            value: element.id
                        }
                        dataarry.push(elementp)
                    }
                setDataDrop(dataarry)
            }
            toggle()
        }
    }
    //combobox

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [dataDrop, setDataDrop] = useState<ComboboxItem[]>([]);

    //

    const apiCreate = async (e: FormEvent) => {
        e.preventDefault();
        console.log(form.values)
        let urlCreate = `/WareHouses/create`;
        let callapi = await repository.get<MessageResponse<WareHouseDTOs>>(urlCreate);
        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
            const dataApi = callapi?.data;
            if (dataApi != null && !isNullOrUndefined(dataApi))
                form.setValues(dataApi);
            let urlAll = `/WareHouses/get-all`;
            let callapigetall = await repository.get<MessageResponse<WareHouseDTOs[]>>(urlAll);
            if (!isNullOrUndefined(callapigetall) && !isNullOrUndefinedArry(callapigetall?.data)) {
                const dataApiAll = callapigetall?.data;
                let dataarry: ComboboxItem[] = [];
                if (dataApiAll !== undefined)
                    for (let index = 0; index < dataApiAll.length; index++) {
                        const element = dataApiAll[index];
                        const elementp: ComboboxItem = {
                            label: '[' + element.code + ']' + element.name,
                            value: element.id
                        }
                        dataarry.push(elementp)
                    }
                setDataDrop(dataarry)
            }
            toggle()
        }
    }


    const formCreate = (
        <Box component="form" maw={400} mx="auto" onSubmit={apiCreate}>
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
                mt="md"
                {...form.getInputProps('address')}
            />
            <Textarea
                label="Mô tả:"
                placeholder="Mô tả..."
                mt="md"
                {...form.getInputProps('description')}
            />

            <Select
                label="Thuộc kho: "
                placeholder="Chọn kho..."
                data={dataDrop}
                searchable
                withAsterisk
                {...form.getInputProps('parentId')}

            />
            <Group justify="flex-end" mt="md">
                {/* <EuiButton size='s' >Huỷ bỏ</EuiButton> */}
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
            <Title order={3}>{title}</Title>
            {formCreate}

        </>
    );
}
