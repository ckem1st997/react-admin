import React, { useState, useRef, ReactNode, useEffect, EventHandler, createContext, useContext } from 'react';
import {
    formatDate,
    Random,
    EuiInMemoryTable,
    EuiBasicTableColumn,
    EuiTableSelectionType,
    EuiSearchBarProps,
    EuiLink,
    EuiHealth,
    EuiButton,
    EuiEmptyPrompt,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiDataGridRefProps,
    CriteriaWithPagination,
    EuiFormRow,
    EuiComboBox,
    EuiFieldSearch,
    EuiHighlight,
    euiPaletteColorBlind,
    euiPaletteColorBlindBehindText,
    EuiDataGrid,
    EuiBasicTable,
    Pagination,
    EuiButtonIcon,
    EuiToolTip,
    EuiPopover,
    EuiContextMenuItem,
    EuiContextMenuPanel,
    useGeneratedHtmlId,
    EuiHorizontalRule,
    EuiModalHeaderTitle,
    EuiText,
} from '@elastic/eui';
import { faker } from '@faker-js/faker';
import { PaginationOptions, paginationBase } from '../extension/BaseTable';
import { size } from '@elastic/eui/src/themes/amsterdam/global_styling/variables/_size';
import Repository from '../extension/HttpHelper';
import { MessageResponse, PageTotalCount, ParamSearchBase, TodoContextType, WareHouseDTOs } from '../model/model';
import { isNullOrEmpty, isNullOrUndefined, isNullOrUndefinedArry } from '../hepler/StringHelper';
import { ToastContainer, toast } from 'react-toastify';
import { ToastifyHelper } from '../hepler/ToastifyHelper';
import { json } from 'stream/consumers';
import Create from './warehouse/Create';
import { CreateContext } from '../default/Context';
import { modals } from '@mantine/modals';
import { MessageHelper } from '../hepler/MessageHelper';
import { Menu, Button, rem, Text, Box, Group, Divider, Tooltip, Title } from '@mantine/core';
import { IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash, IconPlus, IconEdit, IconDotsVertical, IconChevronDown } from '@tabler/icons-react';








// Context
//export const ModelContext = createContext<any>(null);
//
const userData: WareHouseDTOs[] = [];

const random = new Random();
const noItemsFoundMsg = 'Không có kết quả tìm kiếm phù hợp...';


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
const optionInactive = [
    {
        value: true,
        label: 'Kích hoạt',
        'data-test-subj': 'titanOption',
        color: visColorsBehindText[0],
    },
    {
        value: false,
        label: 'Chưa kích hoạt',
        color: visColorsBehindText[1],
    }
];
export default () => {
    const [toltal, setTotal] = useState(0);

    //#region VARIBLE
    const columns: Array<EuiBasicTableColumn<WareHouseDTOs>> = [
        {
            field: 'name',
            name: 'First Name',
            footer: <em>Page totals: {toltal}</em>,
            sortable: true,
            truncateText: true,
            render: (username: WareHouseDTOs['name']) => (
                <EuiLink target="_blank">
                    {username}
                </EuiLink>
            ),
            mobileOptions: {
                render: (user: WareHouseDTOs) => (
                    <span>
                        {user.name}
                    </span>
                ),
                header: false,
                truncateText: false,
                enlarge: true,
                width: '100%',
            },
        },
        {
            field: 'code',
            name: 'Code',
            truncateText: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            field: 'address',
            name: 'Địa chỉ',
            mobileOptions: {
                show: false,
            },
        },
        {
            field: 'description',
            name: 'Mô tả',
            mobileOptions: {
                show: false,
            },
        },
        {
            field: 'inactive',
            name: 'Trạng thái',
            dataType: 'boolean',
            render: (online: WareHouseDTOs["inactive"]) => {
                const color = online ? 'success' : 'danger';
                const label = online ? 'Online' : 'Offline';
                return <EuiHealth color={color}>{label}</EuiHealth>;
            },
            sortable: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            name: 'Actions',
            render: (online: WareHouseDTOs) => {
                return <>
                    <EuiFlexGroup responsive={true} wrap={false} gutterSize="s" alignItems="center">
                        <EuiFlexItem grow={false}>
                            <EuiButtonIcon
                                iconType="documentEdit"
                                aria-label="Dashboard"
                                color="success"
                                onClick={(e: any) => { setIsCreate(true) }}
                            />
                            {/* <EuiButton size='s' isLoading={loading} iconType="trash" isDisabled={loading} onClick={onSearch}>Search</EuiButton> */}

                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>

                            <EuiButtonIcon
                                //display="base"
                                iconType="trash"
                                // aria-label="Delete"
                                color="danger"
                                onClick={(e: any) => { ToastifyHelper.info(JSON.stringify(online)); }}
                            />
                            {/* <EuiButton size='s' isLoading={loading} iconType="trash" isDisabled={loading} onClick={onSearch}>Search</EuiButton> */}

                        </EuiFlexItem>
                    </EuiFlexGroup>

                </>;
            },
        },
    ];
    //#endregion

    //#region state
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<WareHouseDTOs[]>([]);
    const [isFrist, setIsFrist] = useState(true);
    const [message, setMessage] = useState<ReactNode>(
        <EuiEmptyPrompt
            title={<h3>Dữ liệu rỗng !</h3>}
            titleSize="xs"
            body="Tải lại dữ liệu nếu trường hợp bạn không thấy có dữ liệu hiển thị !"
            actions={
                <EuiButton
                    size="s"
                    key="loadUsers"
                    onClick={async () => {
                        await loadUsers(pagination.pageIndex, pagination.pageSize);
                    }}
                >
                    Load Users
                </EuiButton>
            }
        />
    );
    const [selectionInactive, setSelectionInactive] = useState(optionInactive);
    const [error, setError] = useState<string | undefined>();
    const tableRef = useRef<EuiInMemoryTable<WareHouseDTOs> | null>(null);
    const dataGridRef = useRef<EuiDataGridRefProps | null>(null);
    const [pagination, setPagination] = useState<Pagination>(paginationBase);
    const [options, setOptions] = useState(optionsStatic);
    const [selectedOptions, setSelected] = useState();
    const [selectedOptions1, setSelected1] = useState();
    const [paramSearch, setParamSearch] = useState<ParamSearchBase>();
    const [, setSelectedItems] = useState<WareHouseDTOs[]>([]);
    //#endregion

    const { isCreate, setIsCreate } = useContext(CreateContext);



    //#region Effect
    useEffect(() => {
        if (isFrist)
            setIsFrist(false);
        else
            loadUsers(pagination.pageIndex, pagination.pageSize, paramSearch?.keyWord, paramSearch?.inActive);
        //  ToastifyHelper.info("useEffect !");
        // MessageHelper.Success("test thông báo !")

        //nếu muốn tìm kiếm luôn theo trường muốn
    }, [pagination.pageIndex, pagination.pageSize]);

    //#endregion

    //#region  varible funtion
    const loadUsers = async (index: number, size?: number, keyWord?: string, inActive?: boolean) => {
        setMessage('Đang lấy dữ liệu...');
        setLoading(true);
        setUsers([]);
        setError(undefined);//get-list?KeySearch=1&Active=true&Skip=1&Take=1
        const repository = new Repository("http://localhost:5005/api/v1");
        try {
            let urlSearch = `/WareHouses/get-list?Skip=${(index * (size ?? 0))}&Take=${size}`;
            if (!isNullOrEmpty(keyWord))
                urlSearch = urlSearch + `&KeySearch=` + keyWord;
            if (!isNullOrUndefined(inActive))
                urlSearch = urlSearch + `&Active=` + inActive;
            let callapi = await repository.get<MessageResponse<WareHouseDTOs[]>>(urlSearch);
            console.log(callapi)
            if (isNullOrUndefined(callapi) || isNullOrUndefinedArry(callapi?.data)) {

                setMessage(noItemsFoundMsg);
                setTotal(0)
            }
            else {
                setUsers(callapi?.data ?? []);
                setPagination({ ...pagination, totalItemCount: callapi?.totalCount ?? 0 });
                setTotal(callapi?.totalCount ?? 0)
            }
            return callapi?.data;
        } catch (error: any) {
            setError('Có lỗi xảy ra khi tải dữ liệu !');
            return null;
        } finally {
            setLoading(false);
        }
    };
    const onTableChange = async ({ page: { index, size } }: CriteriaWithPagination<WareHouseDTOs>) => {
        setPagination({ ...pagination, pageIndex: index, pageSize: size });
    };
    const onSearch = async (event: any) => {
        await loadUsers(pagination.pageIndex, pagination.pageSize, paramSearch?.keyWord, paramSearch?.inActive);
    };

    const onChange = (selectedOptions: any) => {
        setSelected(selectedOptions);
        if (!isNullOrUndefinedArry(selectedOptions)) {
            const value = selectedOptions[0].value;
            if (!isNullOrUndefined(value))
                setParamSearch({ ...paramSearch, inActive: value })
        }
        else
            setParamSearch({ ...paramSearch, inActive: undefined })
    };

    const onChange1 = (selectedOptions: any) => {
        setSelected1(selectedOptions);
    };

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value;
        if (!isNullOrUndefined(key))
            setParamSearch({ ...paramSearch, keyWord: key })
    };

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

    const onSelectionChange = (selectedItems: WareHouseDTOs[]) => {
        setSelectedItems(selectedItems);
    };
    const selection: EuiTableSelectionType<WareHouseDTOs> = {
        // tieu chi de checkbox
        selectable: (user: WareHouseDTOs) => true,
        selectableMessage: (selectable: boolean) =>
            !selectable ? 'User is currently offline' : '',
        onSelectionChange,
    };

    //#endregion



    // menu toggel

    const [isPopoverOpen, setPopover] = useState(false);
    const splitButtonPopoverId = useGeneratedHtmlId({
        prefix: 'splitButtonPopover',
    });

    const onButtonClick = () => {
        setPopover(!isPopoverOpen);
    };

    const closePopover = () => {
        setPopover(false);
    };

    //mantine


    const openModal = () => modals.openConfirmModal({
        // title: <Title order={3}>This is h3 title</Title>,
        children: (
            <Create></Create>
        ),
        //  labels: { confirm: 'Delete account', cancel: "No don't delete it" },
        confirmProps: { display: 'none' },
        cancelProps: { display: 'none' },
    });

    return (
        <>
            <Box style={{ overflow: 'hidden' }}>
                <Box mx="auto">
                    <Group wrap="nowrap" justify='flex-end'>
                        <Button onClick={openModal} leftSection={<IconPlus size={14} />} color='blue' variant='outline'>Thêm mới</Button>
                        <Button leftSection={<IconEdit size={14} />} color='orange' variant="outline">Chỉnh sửa</Button>
                        <Button leftSection={<IconTrash size={14} />} color='red' variant="outline">Xóa (Đã chọn)</Button>
                        <Menu shadow="md" trigger="hover" openDelay={100} closeDelay={200} >
                            <Menu.Target>
                                <Button rightSection={<IconChevronDown size={14} />} leftSection={<IconDotsVertical size={14} />} color='violet' variant='outline'>Thao tác khác</Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Application</Menu.Label>
                                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                    Settings
                                </Menu.Item>
                                <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                                    Messages
                                </Menu.Item>
                                <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                                    Gallery
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
                                    rightSection={
                                        <Text size="xs" c="dimmed">
                                            ⌘K
                                        </Text>
                                    }
                                >
                                    Search
                                </Menu.Item>

                                <Menu.Divider />

                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Transfer my data
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Delete my account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Box>
            </Box>
            <Divider my="sm" />
            {/* <EuiSpacer size="xs" /> */}
            <EuiFlexGroup>
                <EuiFormRow label="Tìm kiếm :">
                    <EuiFlexGroup alignItems='flexEnd' >
                        <EuiFlexItem grow={false}>
                            <EuiFieldSearch
                                placeholder="Tìm kiếm..."
                                fullWidth
                                aria-label="An example of search with fullWidth"
                                onChange={onChangeText}
                                disabled={loading}
                                append={
                                    <Menu trigger='hover' closeOnClickOutside={false} shadow="md" width={500} openDelay={100} closeDelay={300} >
                                        <Menu.Target>
                                            <Tooltip label="Hiển thị tùy chọn tìm kiếm">
                                                <IconChevronDown className='Menu_IconChevronDown_Search' width={35} size={20} />
                                            </Tooltip>

                                        </Menu.Target>

                                        <Menu.Dropdown >
                                            <Menu.Label>Tùy chọn tìm kiếm</Menu.Label>
                                            <Menu.Item closeMenuOnClick={false}>
                                                <EuiFormRow label="Trạng thái: ">
                                                    <EuiComboBox
                                                        aria-label="Accessible screen reader label"
                                                        placeholder="Chọn..."
                                                        options={optionInactive}
                                                        selectedOptions={selectedOptions}
                                                        onChange={onChange}
                                                        fullWidth={true}
                                                        singleSelection={true}
                                                        isDisabled={loading}
                                                        isCaseSensitive

                                                    />
                                                </EuiFormRow>
                                            </Menu.Item>
                                            <Menu.Item closeMenuOnClick={false}>
                                                <EuiFormRow label="Tên: ">
                                                    <EuiComboBox
                                                        aria-label="Accessible screen reader label"
                                                        placeholder="Chọn..."
                                                        options={options}
                                                        selectedOptions={selectedOptions1}
                                                        onChange={onChange1}
                                                        fullWidth={true}
                                                        renderOption={renderOption}
                                                        isDisabled={loading}

                                                    />
                                                </EuiFormRow>
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                }
                            />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton isLoading={loading} iconType="lensApp" isDisabled={loading} onClick={onSearch}>Search</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFormRow>
            </EuiFlexGroup>


            <EuiSpacer size="l" />
            <EuiBasicTable
                tableCaption="Demo of EuiDataGrid with selection"
                //ref={tableRef}
                items={users}
                itemId="id"
                error={error}
                loading={loading}
                // noItemsMessage="Không có dữ liệu==> check không có data thì throw là không có dữ liệu, lỗi thì throw ra lỗi"
                noItemsMessage={isNullOrUndefinedArry(users) ? message : ""}
                selection={selection}
                // message={message}
                columns={columns}
                // search={search}
                pagination={pagination}
                // sorting={true}
                isSelectable={true}
                hasActions={true}
                responsive={true}
                //  onChange={onTableChange}
                onChange={onTableChange}
                compressed={true}
            />
            {/* <CreateContext.Provider value={{ isCreate, setIsCreate }}>
                <Create ></Create >
            </CreateContext.Provider> */}

        </>
    );
};