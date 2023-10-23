import React, { useState } from 'react';
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
} from '@elastic/eui';
export default () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(true);
    const [superSelectvalue, setSuperSelectValue] = useState('option_one');
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
    const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });
    const onSwitchChange = () =>
        setIsSwitchChecked((isSwitchChecked) => !isSwitchChecked);
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);

    const formSample = (
        <EuiForm id={modalFormId} component="form">
            <EuiFormRow>
                <EuiSwitch
                    id={modalFormSwitchId}
                    name="popswitch"
                    label="Cool modal form"
                    checked={isSwitchChecked}
                    onChange={onSwitchChange}
                />
            </EuiFormRow>
            <EuiFormRow label="A text field">
                <EuiFieldText name="popfirst" />
            </EuiFormRow>
            <EuiFormRow label="Range" helpText="Some help text for the range">
                <EuiRange min={0} max={100} value={50} name="poprange" />
            </EuiFormRow>
        </EuiForm>
    );
    const onSuperSelectChange = (value: string) => {
        setSuperSelectValue(value);
    };
    let modal = (
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
            <EuiModalHeader>
                <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>{formSample}</EuiModalBody>
            <EuiModalFooter>
                <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
                <EuiButton type="submit" form={modalFormId} onClick={closeModal} fill>
                    Save
                </EuiButton>
            </EuiModalFooter>
        </EuiModal>
    );

    return (
        <div>
            <EuiButton onClick={showModal}>Show form modal</EuiButton>
            {modal}
        </div>
    );
}