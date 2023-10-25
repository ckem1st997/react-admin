import React, { useContext, useEffect, useState } from 'react';
import {
    EuiButton,
    EuiButtonEmpty,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiRange,
    EuiSwitch,
    EuiSuperSelect,
    EuiText,
    useGeneratedHtmlId,
    EuiSelect,
    EuiSpacer,
    EuiTextArea,
} from '@elastic/eui';
import { CreateContext } from '../../default/Context';
export default function () {
    // title
    const title = "Chỉnh sửa kho !"
    //
    const { isCreate, setIsCreate } = useContext(CreateContext);

    // #region state

    const [isSwitchChecked, setIsSwitchChecked] = useState(true);
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
    const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });
    const onSwitchChange = () => setIsSwitchChecked((isSwitchChecked) => !isSwitchChecked);
    const closeModal = () => {
        setIsCreate(false);
    };
    const [showErrors, setShowErrors] = useState(true);
    //

    useEffect(() => {

        console.log(isCreate)
    }, [isCreate])



    //#endregiond
    let errors;
    if (showErrors) {
        errors = [
            "Here's an example of an error",
            'You might have more than one error, so pass an array.',
        ];
    }

    const onButtonClick = () => {
        setShowErrors(!showErrors);
    };

    const button = (
        <EuiButton fill color="danger" onClick={onButtonClick}>
            Toggle errors
        </EuiButton>
    );
    const formSample = (
        <EuiForm id={modalFormId} component="form">
            <EuiFormRow>
                <EuiSwitch
                    id={modalFormSwitchId}
                    name="popswitch"
                    label="Cool modal form"
                    checked={isSwitchChecked}
                    onChange={onSwitchChange} />
            </EuiFormRow>
            <EuiFormRow label="A text field">
                <EuiFieldText name="popfirst" />
            </EuiFormRow>
            <EuiFormRow label="Range" helpText="Some help text for the range">
                <EuiRange min={0} max={100} value={50} name="poprange" />
            </EuiFormRow>
        </EuiForm>
    );

    const formCreate = (
        <>
            <EuiForm isInvalid={showErrors} error={errors} component="form">
                <EuiFormRow label="Validation only" isInvalid={showErrors}>
                    <EuiFieldText name="first" isInvalid={showErrors} />
                </EuiFormRow>

                <EuiFormRow
                    label="Validation with help text and errors"
                    helpText="I am some friendly help text."
                    isInvalid={showErrors}
                    error={errors}
                >
                    <EuiFieldText name="text" isInvalid={showErrors} />
                </EuiFormRow>

                <EuiFormRow label="Text area" isInvalid={showErrors}>
                    <EuiTextArea name="area" isInvalid={showErrors} />
                </EuiFormRow>

                <EuiFormRow label="Select" isInvalid={showErrors}>
                    <EuiSelect
                        options={[
                            { value: 'option_one', text: 'Option one' },
                            { value: 'option_two', text: 'Option two' },
                            { value: 'option_three', text: 'Option three' },
                        ]}
                        isInvalid={showErrors}
                    />
                </EuiFormRow>

                <EuiSpacer />

                {button}
            </EuiForm>
        </>
    );

    let modal;
    const CreateFrom = () => {
        return (
            <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
                <EuiModalHeader>
                    <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody>{formCreate}</EuiModalBody>
                <EuiModalFooter>
                    <EuiButton size='s' onClick={closeModal}>Huỷ bỏ</EuiButton>
                    <EuiButton iconType="savedObjectsApp" size='s' type="submit" form={modalFormId} onClick={closeModal} fill>
                        Lưu
                    </EuiButton>
                </EuiModalFooter>
            </EuiModal>
        );
    }




    return (
        <>
            {isCreate && (
                <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
                    </EuiModalHeader>
                    <EuiModalBody>{formCreate}</EuiModalBody>
                    <EuiModalFooter>
                        <EuiButton size='s' onClick={closeModal}>Huỷ bỏ</EuiButton>
                        <EuiButton iconType="savedObjectsApp" size='s' type="submit" form={modalFormId} onClick={closeModal} fill>
                            Lưu
                        </EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            )}
        </>
    );
}