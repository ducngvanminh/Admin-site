import { useEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface EmployeeData {
  avatar?: string | File;
  nameUser?: string;
  title?: string;
  phone?: string;
  idSeat?: number;
  msnv?: string;
}

interface ErrorValidate {
  name?: boolean;
  title?: boolean;
  phone?: boolean;
  seat?: boolean;
  code?: boolean;
  image?: boolean;
  email?: boolean;
  birthday?: boolean;
}

interface ModalCreateProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  singleData: EmployeeData | null;
  updateEmployee: (data: EmployeeData) => void;
  loading: boolean;
  error?: string;
}

export default function ModalCreate(props: ModalCreateProps) {
  const { open, setOpen, singleData, updateEmployee, loading, error } = props;

  const imgRef = useRef<HTMLInputElement | null>(null);
  const [dataSubmit, setDataSubmit] = useState<EmployeeData>({});
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [errorValidate, setErrorValidate] = useState<ErrorValidate>({});

  useEffect(() => {
    setDataSubmit(singleData ? singleData : {});
  }, [singleData]);

  const handleOk = () => {
    // Kiểm tra xem có lỗi validate không
    for (const key in errorValidate) {
      if (errorValidate[key as keyof ErrorValidate]) {
        return;
      }
    }

    updateEmployee(dataSubmit);
  };

  const handleCancel = () => {
    setOpen(false);
    setErrorValidate({});
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<CloseOutlined />}
      footer={
        <Button type="primary" onClick={handleOk} loading={loading}>
          Xác nhận
        </Button>
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className="circle"
          style={{
            borderColor: errorValidate.image ? '#dc3545' : undefined,
          }}
        >
          {dataSubmit?.avatar ? (
            <img
              src={
                imageChange
                  ? URL.createObjectURL(dataSubmit.avatar as File)
                  : `https://drive.google.com/thumbnail?id=${dataSubmit?.avatar}`
              }
              alt=""
              onClick={() => imgRef.current?.click()}
              style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
          ) : (
            <img
              src={'../../../public/user-defaut.png'}
              alt="avatar"
              width={130}
              height={130}
              onClick={() => imgRef.current?.click()}
              style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
          )}
        </div>
        <input
          ref={imgRef}
          type="file"
          hidden
          onChange={(event) => {
            setImageChange(true);
            setDataSubmit({
              ...dataSubmit,
              avatar: event.target.files ? event.target.files[0] : undefined,
            });
          }}
        />
      </div>

      <div>
        <p>Họ Và Tên</p>
        <Input
          value={dataSubmit?.nameUser}
          status={errorValidate?.name ? 'error' : ''}
          onChange={(event) =>
            setDataSubmit({ ...dataSubmit, nameUser: event.target.value })
          }
        />
      </div>
      <div style={{ marginTop: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '47%' }}>
            <p>Bộ phận</p>
            <Input
              value={dataSubmit?.title}
              status={errorValidate?.title ? 'error' : ''}
              onChange={(event) =>
                setDataSubmit({ ...dataSubmit, title: event.target.value })
              }
            />
          </div>
          <div style={{ width: '47%' }}>
            <p>Số điện thoại</p>
            <Input
              value={dataSubmit?.phone}
              status={errorValidate?.phone ? 'error' : ''}
              onChange={(event) =>
                setDataSubmit({ ...dataSubmit, phone: event.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '47%' }}>
            <p>Vị trí ngồi</p>
            <Input
              value={dataSubmit?.idSeat}
              status={errorValidate?.seat ? 'error' : ''}
              disabled
              readOnly
              onChange={(event) =>
                setDataSubmit({
                  ...dataSubmit,
                  idSeat: Number(event.target.value),
                })
              }
            />
          </div>
          <div style={{ width: '47%' }}>
            <p>Mã nhân viên</p>
            <Input
              value={dataSubmit?.msnv}
              status={errorValidate?.code ? 'error' : ''}
              onChange={(event) =>
                setDataSubmit({ ...dataSubmit, msnv: event.target.value })
              }
            />
          </div>
        </div>
      </div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </Modal>
  );
}
