import React, { useContext } from 'react';
import { EuiFieldText, EuiForm, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSelect, EuiSpacer, EuiTextArea, EuiButton } from '@elastic/eui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateContext } from '../../default/Context';
import { WareHouse } from '../../model/model';


type Inputs = {
    example: string,
    exampleRequired: string,
};


export default function () {
    // title
    const title = "Tạo mới kho !";
    const { isCreate, setIsCreate } = useContext(CreateContext);

    // Initialize React Hook Form
    const { register, control, handleSubmit } = useForm<WareHouse>({
        defaultValues: {
            address: '',
        }
    });
    // Form submit handler
    const onSubmit: SubmitHandler<WareHouse> = data => console.log(data);


    const closeModal = () => {
        setIsCreate(false);
    };

    const formCreate = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <EuiFormRow label="Mã kho: ">
                <Controller
                    name="code"
                    control={control}
                    render={({ field }) => <EuiFieldText {...field} />}
                />

            </EuiFormRow>
            <Controller
                name="name"
                control={control}
                render={({ field }) =>
                    <EuiSelect
                        {...field}
                        options={[
                            { value: 'option_one', text: 'Option one' },
                            { value: 'option_two', text: 'Option two' },
                            { value: 'option_three', text: 'Option three' },
                        ]}
                    />}
            />
            {/* <EuiFormRow label="Tên kho: ">
                <EuiFieldText {...register("name")} />
            </EuiFormRow>
            <EuiFormRow label="Địa chỉ: ">
                <EuiFieldText {...register("address")} />
            </EuiFormRow>
            <EuiFormRow label="Mô tả: ">
                <EuiTextArea {...register("description")} />
            </EuiFormRow>
            <EuiFormRow label="Kho cha:">
                <EuiSelect
                    {...register("parentId")}
                    options={[
                        { value: 'option_one', text: 'Option one' },
                        { value: 'option_two', text: 'Option two' },
                        { value: 'option_three', text: 'Option three' },
                    ]}
                />
            </EuiFormRow> */}
            <EuiSpacer />
            <input type="submit" />
            <EuiButton size='s' onClick={closeModal}>Huỷ bỏ</EuiButton>
            <EuiButton iconType="savedObjectsApp" size='s' type="submit" form="formId" fill>
                Lưu
            </EuiButton>
        </form>



    );

    let modal;
    if (isCreate) {
        modal = (
            <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
                <EuiModalHeader>
                    <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody>{formCreate}</EuiModalBody>
                <EuiModalFooter>

                </EuiModalFooter>
            </EuiModal>
        );
    }

    return (
        <div>
            {modal}
        </div>
    );
}
