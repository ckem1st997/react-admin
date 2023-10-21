import React, { Fragment, useState } from 'react';
import {
    formatDate,
    Comparators,
    EuiBasicTable,
    EuiBasicTableColumn,
    EuiTableSelectionType,
    EuiTableSortingType,
    Criteria,
    EuiLink,
    EuiHealth,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSwitch,
    EuiSpacer,
    EuiButton,
    EuiCodeBlock,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiFormRow,
    EuiRange,
    EuiFieldSearch,
    EuiTextArea,
    euiPaletteColorBlindBehindText,
    EuiComboBox,
    EuiComboBoxOptionOption,
    EuiHighlight,
    euiPaletteColorBlind,
    EuiText,
    EuiHorizontalRule,
    Pagination,
    RIGHT_ALIGNMENT,
} from '@elastic/eui';
import { faker } from '@faker-js/faker';
import { Link, Outlet, useNavigate } from 'react-router-dom';
type User = {
    id: number;
    firstName: string | null | undefined;
    lastName: string;
    github: string;
    dateOfBirth: Date;
    online: boolean;
    location: {
        city: string;
        country: string;
    };
};
const users: User[] = [];
for (let i = 0; i < 20; i++) {
    users.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        github: faker.internet.userName(),
        dateOfBirth: faker.date.past(),
        online: faker.datatype.boolean(),
        location: {
            city: faker.location.city(),
            country: faker.location.country(),
        },
    });
}
const deleteUsersByIds = (...ids: number[]) => {
    ids.forEach((id) => {
        const index = users.findIndex((user) => user.id === id);
        if (index >= 0) {
            users.splice(index, 1);
        }
    });
};
const visColors = euiPaletteColorBlind();
const visColorsBehindText = euiPaletteColorBlindBehindText();
const optionsStatic = [
    {
        value: {
            size: 5,
        },
        label: 'Titan',
        'data-test-subj': 'titanOption',
        color: visColorsBehindText[0],
    },
    {
        value: {
            size: 5,
        },
        label: 'Enceladus',
        color: visColorsBehindText[1],
    },
    {
        value: {
            size: 5,
        },
        label: 'Mimas',
        color: visColorsBehindText[2],
    },
    {
        value: {
            size: 5,
        },
        label: 'Dione',
        color: visColorsBehindText[3],
    },
    {
        value: {
            size: 5,
        },
        label: 'Iapetus',
        color: visColorsBehindText[4],
    },
    {
        value: {
            size: 5,
        },
        label: 'Phoebe',
        color: visColorsBehindText[5],
    },
    {
        value: {
            size: 5,
        },
        label: 'Rhea',
        color: visColorsBehindText[6],
    },
    {
        value: {
            size: 5,
        },
        label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        color: visColorsBehindText[7],
    },
    {
        value: {
            size: 5,
        },
        label: 'Tethys',
        color: visColorsBehindText[8],
    },
    {
        value: {
            size: 5,
        },
        label: 'Hyperion',
        color: visColorsBehindText[9],
    },
];


export default () => {

    //combobox

    const [options, setOptions] = useState(optionsStatic);
    const [selectedOptions, setSelected] = useState([options[2], options[5]]);

    const onChange = (selectedOptions: any) => {
        setSelected(selectedOptions);
    };

    const onCreateOption = (searchValue: any, flattenedOptions: Array<EuiComboBoxOptionOption<string>> = []) => {
        if (!searchValue) {
            return;
        }

        const normalizedSearchValue = searchValue.trim().toLowerCase();

        if (!normalizedSearchValue) {
            return;
        }

        const newOption: any = {
            label: searchValue,
        }

        // Create the option if it doesn't exist.
        // if (flattenedOptions.findIndex(
        //         (option) => option.label.trim().toLowerCase() === normalizedSearchValue
        //     ) === -1
        // ) {
        //     setOptions([...options, newOption]);
        // }

        // Select the option.
        setSelected((prevSelected) => [...prevSelected, newOption]);
    };
    /**
     * Mobile column options
     */
    const [customHeader, setCustomHeader] = useState(true);
    const [isResponsive, setIsResponsive] = useState(true);
    const columns: Array<EuiBasicTableColumn<User>> = [
        {
            field: 'firstName',
            name: 'First Name',
            truncateText: true,
            sortable: true,
            mobileOptions: {
                render: customHeader
                    ? (user: User) => (
                        <span>
                            {user.firstName} {user.lastName}
                        </span>
                    )
                    : undefined,
                header: customHeader ? false : true,
                width: customHeader ? '100%' : undefined,
                enlarge: customHeader ? true : false,
                truncateText: customHeader ? false : true,
            },
        },
        {
            field: 'lastName',
            name: 'Last Name',
            truncateText: true,
            mobileOptions: {
                show: !isResponsive || !customHeader,
            },
        },
        {
            field: 'github',
            name: 'Github',
            render: (username: User['github']) => (
                <EuiLink href="#" target="_blank">
                    {username}
                </EuiLink>
            ),
        },
        {
            field: 'dateOfBirth',
            name: 'Date of Birth',
            dataType: 'date',
            render: (dateOfBirth: User['dateOfBirth']) =>
                formatDate(dateOfBirth, 'dobLong'),
            sortable: true,
        },
        {
            field: 'location',
            name: 'Location',
            truncateText: true,
            textOnly: true,
            render: (location: User['location']) => {
                return `${location.city}, ${location.country}`;
            },
        },
        {
            field: 'online',
            name: 'Online',
            dataType: 'boolean',
            render: (online: User['online']) => {
                const color = online ? 'success' : 'danger';
                const label = online ? 'Online' : 'Offline';
                return <EuiHealth color={color}>{label}</EuiHealth>;
            },
            sortable: true,
            footer: () => {

                return (
                    <strong>
                        Total: 99999
                    </strong>
                );
            },
        },
        {
            field: '',
            name: 'Mobile only',
            mobileOptions: {
                only: true,
                render: () => 'This column only appears on mobile',
            },
        },
        {
            name: 'Actions',
            actions: [
                {
                    name: 'Modal',
                    description: 'Modal this person',
                    icon: 'apps',
                    type: 'icon',
                    onClick: (user: User) => {
                        setIsModalVisible(true);
                        setIsUser(user);
                    },
                },
                {
                    name: 'Edit',
                    description: 'Edit this person',
                    icon: 'copy',
                    type: 'icon',
                    onClick: (user: User) => {
                        navigate("/grid/" + user.id)
                        // cloneUserbyId(user.id);
                        // setSelectedItems([]);
                    },
                },
                {
                    name: 'Delete',
                    description: 'Delete this person',
                    icon: 'trash',
                    type: 'icon',
                    color: 'danger',
                    onClick: (user: User) => {
                        deleteUsersByIds(user.id);
                        setSelectedItems([]);
                    },
                },
            ],
        },

    ];
    /**
     * Selection
     */
    const [, setSelectedItems] = useState<User[]>([]);
    const onSelectionChange = (selectedItems: User[]) => {
        setSelectedItems(selectedItems);
    };
    const selection: EuiTableSelectionType<User> = {
        selectable: (user: User) => user.online,
        selectableMessage: (selectable: boolean) =>
            !selectable ? 'User is currently offline' : '',
        onSelectionChange,
    };
    /**
     * Pagination & sorting
     */
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState<keyof User>('firstName');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const onTableChange = ({ page, sort }: Criteria<User>) => {
        if (page) {
            const { index: pageIndex, size: pageSize } = page;
            setPageIndex(pageIndex);
            setPageSize(pageSize);
        }
        if (sort) {
            const { field: sortField, direction: sortDirection } = sort;
            setSortField(sortField);
            setSortDirection(sortDirection);
        }
    };
    // Manually handle sorting and pagination of data
    const findUsers = (
        users: User[],
        pageIndex: number,
        pageSize: number,
        sortField: keyof User,
        sortDirection: 'asc' | 'desc'
    ) => {
        let items;
        if (sortField) {
            items = users
                .slice(0)
                .sort(
                    Comparators.property(sortField, Comparators.default(sortDirection))
                );
        } else {
            items = users;
        }
        let pageOfItems;
        if (!pageIndex && !pageSize) {
            pageOfItems = items;
        } else {
            const startIndex = pageIndex * pageSize;
            pageOfItems = items.slice(
                startIndex,
                Math.min(startIndex + pageSize, users.length)
            );
        }
        return {
            pageOfItems,
            totalItemCount: users.length,
        };
    };
    const { pageOfItems, totalItemCount } = findUsers(
        users,
        pageIndex,
        pageSize,
        sortField,
        sortDirection
    );
    const pagination = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalItemCount: totalItemCount,
        pageSizeOptions: [3, 5, 8],

    };
    const sorting: EuiTableSortingType<User> = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
    };

    // modal
    const data: User = {
        id: 0,
        firstName: undefined,
        lastName: '',
        github: '',
        dateOfBirth: new Date(),
        online: false,
        location: {
            city: '',
            country: ''
        }
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUser, setIsUser] = useState(data);
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);
    const navigate = useNavigate();
    let modal;
    if (isModalVisible) {

        modal = (
            <EuiModal onClose={closeModal}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>id user: {isUser.id}</EuiModalHeaderTitle>
                </EuiModalHeader>

                <EuiModalBody>
                    This modal has the following setup:
                    <EuiSpacer />
                    <EuiCodeBlock language="html" isCopyable>
                        {`test`}
                    </EuiCodeBlock>
                </EuiModalBody>

                <EuiModalFooter>
                    <EuiButton onClick={closeModal} fill>
                        Close
                    </EuiButton>
                </EuiModalFooter>
            </EuiModal>
        );
    }

    //
    const renderOption = (option: any, searchValue: any, contentClassName: string | undefined) => {
        const { color, label, value } = option;
        const dotColor = visColors[visColorsBehindText.indexOf(color)];
        return (
            <EuiHealth color={dotColor}>
                <span className={contentClassName}>
                    <EuiHighlight search={searchValue}>{label}</EuiHighlight>
                    &nbsp;
                    <span>({value.size})</span>
                </span>
            </EuiHealth>
        );
    };
    //

    return (
        <>
            <EuiFlexGroup responsive={true}>
                <EuiFlexItem grow={3}>
                    <EuiFormRow label="Trạng thái: ">
                        <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Chọn..."
                            options={options}
                            selectedOptions={selectedOptions}
                            onChange={onChange}
                            fullWidth={true}
                            singleSelection={true}
                            customOptionText="dsadsadsa"
                        // onCreateOption={onCreateOption}                       
                        />
                    </EuiFormRow>
                </EuiFlexItem>

                <EuiFlexItem grow={3}>
                    <EuiFormRow label="Tên: ">

                        <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Chọn..."
                            options={options}
                            selectedOptions={selectedOptions}
                            onChange={onChange}
                            fullWidth={true}
                            renderOption={renderOption}
                        // onCreateOption={onCreateOption}                       
                        />
                    </EuiFormRow>

                </EuiFlexItem>

                <EuiFlexItem grow={4}>
                    <EuiFormRow label="Tìm kiếm">
                        <EuiFlexGroup >
                            <EuiFlexItem>
                                <EuiFieldSearch
                                    placeholder="Tìm kiếm..."
                                    fullWidth
                                    aria-label="An example of search with fullWidth"
                                />
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiButton>Search</EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFormRow>

                    <EuiSpacer size="s" />
                </EuiFlexItem>
            </EuiFlexGroup >
            {/* <EuiSpacer size="l" /> */}
            <EuiHorizontalRule size="full" />
            <EuiBasicTable
                tableCaption="Demo for responsive EuiBasicTable with mobile options"
                items={pageOfItems}
                itemId="id"
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                selection={selection}
                isSelectable={true}
                hasActions={true}
                responsive={true}
                onChange={onTableChange}
            />
            {modal}
        </>
    );
};