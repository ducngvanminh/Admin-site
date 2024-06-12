import { ConfigProvider, Modal, Table } from 'antd';
import { PageHeader } from '../../components';
import { useMemo, useState } from 'react';
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
  HomeOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import ModalEdit from '../../components/Modal/ModalEdit';
import { FloatButton } from 'antd';
import ModalCreate from '../../components/Modal/ModalCreate';

const { confirm } = Modal;

interface UserModel {
  idUser: number;
  nameUser: string;
  title: string;
  idSeat: number;
  msnv: string;
  phone: string;
}

const SeatsDashboardPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [singleSeat, setSingleSeat] = useState<UserModel[]>([]);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
    {
      idUser: 8,
      nameUser: 'kibum',
      title: 'IT',
      idSeat: 21,
      msnv: 'T123',
      phone: '763512753',
    },
    {
      idUser: 2,
      nameUser: 'kibum',
      title: 'IT',
      idSeat: 21,
      msnv: 'T123',
      phone: '763512753',
    },
    {
      idUser: 3,
      nameUser: 'kibum',
      title: 'IT',
      idSeat: 21,
      msnv: 'T123',
      phone: '763512753',
    },
    {
      idUser: 7,
      nameUser: 'kibum',
      title: 'IT',
      idSeat: 21,
      msnv: 'T123',
      phone: '763512753',
    },
    {
      idUser: 9,
      nameUser: 'kibum',
      title: 'IT',
      idSeat: 21,
      msnv: 'T123',
      phone: '763512753',
    },
    {
      idUser: 10,
      nameUser: 'kibum',
      title: 'IT',
      idSeat: 21,
      msnv: 'T123',
      phone: '763512753',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'idUser',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'nameUser',
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
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const dataSource = useMemo(() => {
    return data?.map((item) => ({
      ...item,
      key: item.idUser,
      id: item.idUser,
      title: item.title,
      nameUser: item.nameUser,
      msnv: item.msnv,
      phone: item.phone,
      idSeat: item.idSeat,

      action: (
        <div style={{ display: 'flex', gap: 6 }}>
          <EditFilled
            className="me-3"
            style={{ fontSize: '20px' }}
            onClick={() => {
              setSingleSeat([item]);
              setOpenModalEdit(true);
            }}
          />
          <DeleteFilled
            style={{ fontSize: '20px' }}
            onClick={() => {
              const idRemove = [];
              idRemove.push(item.idUser);
              setSelectedRowKeys(idRemove);
              showConfirmDeleteModal();
            }}
          />
        </div>
      ),
    }));
  }, [data]);

  const showConfirmDeleteModal = () => {
    confirm({
      title: 'Xác nhận xóa?',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn có muốn xóa vị trí này không ?',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div>
      <Helmet>
        <title>Manager | Seat</title>
      </Helmet>
      <PageHeader
        title="Thông tin vị trí"
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
            title: 'vị trí',
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
          // loading={idShow}
          pagination={{ pageSize: 6 }}
          style={{ backgroundColor: '#edf5fc', borderRadius: 6 }}
        />
      </ConfigProvider>
      <FloatButton
        onClick={() => setOpenModalCreate(true)}
        icon={<UserAddOutlined />}
      />
      <ModalEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        data={singleSeat}
      />
      <ModalCreate open={openModalCreate} setOpen={setOpenModalCreate} />
    </div>
  );
};

export default SeatsDashboardPage;
