import React, { useState, useRef, ReactNode, useEffect, EventHandler, createContext } from 'react';
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









// Context
export const ModelContext = createContext<any>(null);
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
    //#region VARIBLE
    const columns: Array<EuiBasicTableColumn<WareHouseDTOs>> = [
        {
            field: 'name',
            name: 'First Name',
            footer: <em>Page totals:</em>,
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
    const [isCreate, setIsCreate] = useState(false);
    const [, setSelectedItems] = useState<WareHouseDTOs[]>([]);
    //#endregion

    //#region Effect
    useEffect(() => {
        if (isFrist)
            setIsFrist(false);
        else
            loadUsers(pagination.pageIndex, pagination.pageSize, paramSearch?.keyWord, paramSearch?.inActive);
        //  ToastifyHelper.info("useEffect !");
        //nếu muốn tìm kiếm luôn theo trường muốn
    }, [pagination.pageIndex, pagination.pageSize, paramSearch?.inActive, paramSearch?.keyWord]);

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
            if (isNullOrUndefined(callapi) || isNullOrUndefined(callapi.data) || isNullOrUndefinedArry(callapi.data.data))
                setMessage(noItemsFoundMsg);
            else {
                setUsers(callapi.data.data);
                setPagination({ ...pagination, totalItemCount: callapi.data.totalCount });
            }
            return callapi.data;
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
        //  ToastifyHelper.success("Call api !");
        // ToastifyHelper.info("Call api !");
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
        if (!isNullOrEmpty(key))
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
  
    const items = [
      <EuiContextMenuItem key="copy" icon="copy" onClick={closePopover}>
        Copy
      </EuiContextMenuItem>,
      <EuiContextMenuItem key="edit" icon="pencil" onClick={closePopover}>
        Edit
      </EuiContextMenuItem>,
      <EuiContextMenuItem key="share" icon="share" onClick={closePopover}>
        Share
      </EuiContextMenuItem>,
    ];
    //
    return (
        <>
            <EuiFlexGroup responsive={true} justifyContent='flexEnd' gutterSize="xs" alignItems="center">
                <EuiFlexItem grow={false}>
                    <EuiButton size="s" iconType="calendar">
                        Last 15 min
                    </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiPopover
                        id={splitButtonPopoverId}
                        button={
                            <EuiButtonIcon
                                display="base"
                                size="s"
                                iconType="boxesVertical"
                                aria-label="More"
                                onClick={onButtonClick}
                            />
                        }
                        isOpen={isPopoverOpen}
                        closePopover={closePopover}
                        panelPaddingSize="none"
                        anchorPosition="downLeft"
                    >
                        <EuiContextMenuPanel size="s" items={items} />
                    </EuiPopover>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            <EuiFlexGroup alignItems="center">
                <EuiFlexItem grow={3}>
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
                            isDisabled={loading}

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
                                    onChange={onChangeText}
                                    disabled={loading}
                                />
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiButton isLoading={loading} iconType="lensApp" isDisabled={loading} onClick={onSearch}>Search</EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFormRow>
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
            <ModelContext.Provider value={{ isCreate, setIsCreate }}>
                <Create ></Create >
            </ModelContext.Provider>.

        </>
    );
};