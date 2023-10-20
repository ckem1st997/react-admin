import React, { useState } from 'react';
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
const cloneUserbyId = (id: number) => {
    const index = users.findIndex((user) => user.id === id);
    if (index >= 0) {
        const user = users[index];
        users.splice(index, 0, { ...user, id: users.length });
    }
};
const deleteUsersByIds = (...ids: number[]) => {
    ids.forEach((id) => {
        const index = users.findIndex((user) => user.id === id);
        if (index >= 0) {
            users.splice(index, 1);
        }
    });
};
export default () => {
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
                        navigate("/grid/"+user.id)
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
    const data:User={
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
                        {`<EuiModal onClose={closeModal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle><!-- Modal title --></EuiModalHeaderTitle>
      </EuiModalHeader>
    
      <EuiModalBody>
        <!-- Modal body -->
      </EuiModalBody>
    
      <EuiModalFooter>
        <EuiButton onClick={closeModal} fill>
          Close
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>`}
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
    return (
        <>
            <EuiFlexGroup alignItems="center" responsive={false}>
                <EuiFlexItem grow={false}>
                    <EuiSwitch
                        label="Responsive"
                        checked={isResponsive}
                        onChange={() => setIsResponsive(!isResponsive)}
                    />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiSwitch
                        label="Custom header"
                        disabled={!isResponsive}
                        checked={isResponsive && customHeader}
                        onChange={() => setCustomHeader(!customHeader)}
                    />
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
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
                responsive={isResponsive}
                onChange={onTableChange}
            />
            {modal}
        </>
    );
};