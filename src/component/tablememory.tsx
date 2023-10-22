import React, { useState, useRef, ReactNode, useEffect } from 'react';
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
} from '@elastic/eui';
import { faker } from '@faker-js/faker';
import { PaginationOptions, paginationBase } from '../extension/BaseTable';
import { size } from '@elastic/eui/src/themes/amsterdam/global_styling/variables/_size';
import Repository from '../extension/HttpHelper';
import { MessageResponse, PageTotalCount, WareHouseDTOs } from '../model/model';
import { isNullOrUndefined } from '../hepler/StringHelper';
const userData: WareHouseDTOs[] = [];
const columns: Array<EuiBasicTableColumn<WareHouseDTOs>> = [
    {
        field: 'name',
        name: 'First Name',
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
        render: (online: WareHouseDTOs) => {
            const color = online.inactive ? 'success' : 'danger';
            const label = online.inactive ? 'Online' : 'Offline';
            return <EuiHealth color={color}>{label}</EuiHealth>;
        },
        sortable: true,
        mobileOptions: {
            show: false,
        },
    },
];
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

export default () => {
    // state
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<WareHouseDTOs[]>([]);
    const [pages, setPages] = useState<PageTotalCount<WareHouseDTOs>>();
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
    const [selection, setSelection] = useState<WareHouseDTOs[]>([]);
    const [error, setError] = useState<string | undefined>();
    const tableRef = useRef<EuiInMemoryTable<WareHouseDTOs> | null>(null);
    const dataGridRef = useRef<EuiDataGridRefProps | null>(null);
    const [pagination, setPagination] = useState<Pagination>(paginationBase);
    const [options, setOptions] = useState(optionsStatic);
    const [selectedOptions, setSelected] = useState();
    const [selectedOptions1, setSelected1] = useState();
    //
    useEffect(() => {
        loadUsers(pagination.pageIndex, pagination.pageSize);
    }, [pagination.pageIndex, pagination.pageSize]);



    const loadUsers = async (index: number, size?: number) => {
        setMessage('Đang lấy dữ liệu...');
        setLoading(true);
        setUsers([]);
        setError(undefined);

        setError(undefined);
        const repository = new Repository("http://localhost:5005/api/v1/WareHouses");
        try {
            let callapi = await repository.get<MessageResponse<WareHouseDTOs[]>>(`/get-list?Skip=${index}&Take=${size}`);
            if (isNullOrUndefined(callapi.data.data))
                setMessage(noItemsFoundMsg);
            setUsers(callapi.data.data);
            setPagination({ ...pagination, totalItemCount: callapi.data.totalCount });
            //  setPages({ pageOfItems: callapi.data.data, totalItemCount: callapi.data.totalCount });
            return callapi.data; // Trả về dữ liệu từ API
        } catch (error: any) {
            setError('Có lỗi xảy ra khi tải dữ liệu.');
            // setMessage(error);
            return null; // Trả về null nếu có lỗi
        } finally {
            setLoading(false);
        }
    };
    const loadUsersWithError = () => {
        setMessage('Đang lấy dữ liệ...');
        setLoading(true);
        setUsers([]);
        setError(undefined);
        setTimeout(() => {
            setLoading(false);
            setMessage(noItemsFoundMsg);
            setError('ouch!... again... ');
            setUsers([]);
        }, random.number({ min: 0, max: 3000 }));
    };

    //
    const onTableChange = async ({ page: { index, size } }: CriteriaWithPagination<WareHouseDTOs>) => {
        setPagination({ ...pagination, pageIndex: index, pageSize: size });
        // await loadUsers(index, size);
    };

    //



    const onChange = (selectedOptions: any) => {
        setSelected(selectedOptions);
    };

    const onChange1 = (selectedOptions: any) => {
        setSelected1(selectedOptions);
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

    return (
        <>
            <EuiFlexGroup alignItems="center">
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
                        />
                    </EuiFormRow>
                </EuiFlexItem>

                <EuiFlexItem grow={3}>
                    <EuiFormRow label="Tên: ">
                        <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Chọn..."
                            options={options}
                            selectedOptions={selectedOptions1}
                            onChange={onChange1}
                            fullWidth={true}
                            renderOption={renderOption}
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
                noItemsMessage={isNullOrUndefined(users) ? message : ""}

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
            />
        </>
    );
};