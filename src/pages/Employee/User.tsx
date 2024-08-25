import { Button, ConfigProvider, Input, Modal, Space, Table } from 'antd';
import { PageHeader } from '../../components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
  HomeOutlined,
  SearchOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import ModalEdit from '../../components/Modal/ModalEdit';
import { FloatButton } from 'antd';
import type { InputRef, TableColumnType } from 'antd';
import ModalCreate from '../../components/Modal/ModalCreate';
import axios from 'axios';
import { URL_CONFIG } from '../../constants/routes';
import { UserModel } from '../../model/UserModel';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

const { confirm } = Modal;

const UsersDashboardPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [singleUser, setSingleUser] = useState<UserModel | null>(null);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [userList, setUserList] = useState<UserModel[]>([]);

  const [errCreate, setErrCreate] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const onGetEmployee = async () => {
    try {
      await axios.get(URL_CONFIG + 'admin/listing').then((res) => {
        setUserList(res?.data?.data);
        setLoading(false);
      });
    } catch (error) {
      console.log('err: ', error);
    }
  };

  const createEmployee = async (data: unknown) => {
    setLoadingCreate(true);
    try {
      await axios.post(URL_CONFIG + 'admin/create', data).then((res) => {
        if (res?.data?.status == 1) {
          setOpenModalCreate(false);
          setLoadingCreate(false);
          window.location.reload();
        } else {
          setErrCreate(res.data.message);
          setLoadingCreate(false);
        }
      });
    } catch (error) {
      console.log('err', error);
    }
  };

  const updateEmployee = async (data: unknown) => {
    setLoadingEdit(true);
    try {
      await axios.put(URL_CONFIG + 'admin/update', data).then((res) => {
        if (res?.data?.status == 1) {
          setOpenModalEdit(false);
          window.location.reload();
        } else {
          setErrCreate(res.data.message);
          setLoadingCreate(false);
        }
      });
    } catch (error) {
      console.log('err', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteEmployee = async (idUser: number) => {
    try {
      await axios
        .post(URL_CONFIG + 'admin/delete', { idUser: idUser })
        .then((res) => {
          if (res?.data?.status == 1) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log('err', error);
    }
  };

  type DataIndex = keyof UserModel;

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<UserModel> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] // Check if `record[dataIndex]` is defined
        ? record[dataIndex]!.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    onGetEmployee();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'idUser',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'nameUser',
      ...getColumnSearchProps('nameUser'),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'title',
    },
    {
      title: 'Vị trí',
      dataIndex: 'idSeat',
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'msnv',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  type Key = string | number;

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    // Convert keys to numbers if necessary
    const numberKeys = newSelectedRowKeys.map((key) => Number(key));
    setSelectedRowKeys(numberKeys); // Assuming setSelectedRowKeys expects a number[]
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys.map((key) => Number(key)) as number[], // Ensure the keys are numbers
    onChange: onSelectChange, // Use the adjusted onSelectChange function
  };

  const showConfirmDeleteModal = useCallback(
    (idUser: number[]) => {
      confirm({
        title: 'Xác nhận xóa?',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn có muốn xóa nhân viên này không ?',
        onOk() {
          deleteEmployee(idUser[0]);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    [deleteEmployee]
  );

  const dataSource = useMemo(() => {
    return userList?.map((item) => ({
      ...item,
      key: item.idUser,
      id: item.idUser,
      title: item.title,
      nameUser: item.nameUser,
      msnv: item.msnv,
      phone: item.phone,
      email: item.email,
      birthday: item.birthday,
      idSeat: item.idSeat,

      action: (
        <div style={{ display: 'flex', gap: 6 }}>
          <EditFilled
            className="me-3"
            style={{ fontSize: '20px' }}
            onClick={() => {
              setSingleUser(item);
              setOpenModalEdit(true);
            }}
          />
          <DeleteFilled
            style={{ fontSize: '20px' }}
            onClick={() => {
              const idRemove: number[] = [];
              idRemove.push(item.idUser);
              setSelectedRowKeys(idRemove);
              showConfirmDeleteModal(idRemove);
            }}
          />
        </div>
      ),
    }));
  }, [userList, showConfirmDeleteModal]);

  return (
    <div>
      <Helmet>
        <title>Manager | Employee</title>
      </Helmet>
      <PageHeader
        title="Thông tin nhân viên"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Trang chủ</span>
              </>
            ),
            path: '/',
          },
          {
            title: 'nhân viên',
          },
        ]}
      />

      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: '#70C1FF26',
            },
          },
        }}
      >
        <Table
          bordered
          scroll={{ x: 770 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{ pageSize: 5 }}
          style={{ backgroundColor: '#edf5fc', borderRadius: 6 }}
        />
      </ConfigProvider>
      {selectedRowKeys.length > 1 && (
        <Button style={{ marginTop: 10 }}>
          <UsergroupDeleteOutlined /> Xóa nhiều nhân viên
        </Button>
      )}
      <FloatButton
        onClick={() => setOpenModalCreate(true)}
        icon={<UserAddOutlined />}
        style={{ bottom: 30, right: 30 }}
      />
      <ModalEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        singleData={singleUser}
        updateEmployee={updateEmployee}
        loading={loadingEdit}
      />
      <ModalCreate
        open={openModalCreate}
        setOpen={setOpenModalCreate}
        createEmployee={createEmployee}
        error={errCreate}
        loading={loadingCreate}
      />
    </div>
  );
};

export default UsersDashboardPage;
