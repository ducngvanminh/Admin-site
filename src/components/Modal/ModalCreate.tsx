import { useRef, useState } from 'react';
import { Button, Input, Modal, DatePicker } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// Định nghĩa interface cho props của ModalCreate
interface ModalCreateProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  createEmployee: (data: EmployeeData) => void;
  error: string | null;
  loading: boolean;
}

// Định nghĩa interface cho dữ liệu nhân viên
interface EmployeeData {
  nameUser?: string;
  title?: string;
  phone?: string;
  msnv?: string;
  birthday?: string;
  email?: string;
  avatar?: File;
}

export default function ModalCreate({
  open,
  setOpen,
  createEmployee,
  error,
  loading,
}: ModalCreateProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [dataSubmit, setDataSubmit] = useState<EmployeeData>({});
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [errorValidate, setErrorValidate] = useState<{
    [key in keyof EmployeeData]?: string;
  }>({});

  // Hàm kiểm tra tính hợp lệ của địa chỉ email
  const validateEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  // Hàm xử lý thay đổi giá trị các trường dữ liệu
  const handleChange = (key: keyof EmployeeData, value: string) => {
    setDataSubmit((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === 'email') {
      if (!validateEmail(value)) {
        setErrorValidate((prev) => ({ ...prev, email: 'Email không hợp lệ' }));
      } else {
        setErrorValidate((prev) => ({ ...prev, email: '' }));
      }
    }
  };

  // Hàm xử lý khi nhấn nút Xác nhận
  const handleOk = () => {
    // Kiểm tra nếu có lỗi validate
    const hasErrors = Object.values(errorValidate).some((error) => error);
    if (hasErrors) {
      return;
    }

    createEmployee(dataSubmit);
  };

  // Hàm xử lý khi nhấn nút Hủy
  const handleCancel = () => {
    setOpen(false);
    setErrorValidate({});
    setDataSubmit({});
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<CloseOutlined />}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={loading}
        >
          Xác nhận
        </Button>,
      ]}
      title="Tạo Nhân Viên"
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
            borderColor: errorValidate.avatar ? '#dc3545' : undefined,
          }}
        >
          {dataSubmit.avatar ? (
            <img
              src={
                imageChange
                  ? URL.createObjectURL(dataSubmit.avatar)
                  : `https://drive.google.com/thumbnail?id=${dataSubmit.avatar}`
              }
              alt="avatar"
              onClick={() => imgRef.current?.click()}
              style={{ cursor: 'pointer', borderRadius: '50%' }}
              width={130}
              height={130}
            />
          ) : (
            <img
              src={'/user-default.png'}
              alt="default-avatar"
              onClick={() => imgRef.current?.click()}
              style={{ cursor: 'pointer', borderRadius: '50%' }}
              width={130}
              height={130}
            />
          )}
        </div>
        <input
          ref={imgRef}
          type="file"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]; // Kiểm tra files có phải là null không và lấy file đầu tiên
            if (file) {
              // Kiểm tra file có tồn tại không
              setImageChange(true);
              setDataSubmit((prev) => ({
                ...prev,
                avatar: file,
              }));
            }
          }}
        />
      </div>

      <div>
        <p>Họ Và Tên</p>
        <Input
          value={dataSubmit.nameUser}
          status={errorValidate.nameUser ? 'error' : undefined}
          onChange={(event) => handleChange('nameUser', event.target.value)}
        />
      </div>
      <div style={{ marginTop: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '47%' }}>
            <p>Bộ phận</p>
            <Input
              value={dataSubmit.title}
              status={errorValidate.title ? 'error' : undefined}
              onChange={(event) => handleChange('title', event.target.value)}
            />
          </div>
          <div style={{ width: '47%' }}>
            <p>Số điện thoại</p>
            <Input
              value={dataSubmit.phone}
              status={errorValidate.phone ? 'error' : undefined}
              onChange={(event) => handleChange('phone', event.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '47%' }}>
            <p>Mã nhân viên</p>
            <Input
              value={dataSubmit.msnv}
              status={errorValidate.msnv ? 'error' : undefined}
              onChange={(event) => handleChange('msnv', event.target.value)}
            />
          </div>
          <div style={{ width: '47%' }}>
            <p>Ngày sinh</p>
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(value) => {
                setDataSubmit((prev) => ({
                  ...prev,
                  birthday: value ? dayjs(value).format('DD-MM-YYYY') : '',
                }));
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 6 }}>
        <div style={{ width: '100%' }}>
          <p>Email</p>
          <Input
            value={dataSubmit.email}
            status={errorValidate.email ? 'error' : undefined}
            onChange={(event) => handleChange('email', event.target.value)}
          />
        </div>
      </div>
      {error && (
        <div style={{ color: '#dc3545', marginTop: 10 }}>
          <p>{error}</p>
        </div>
      )}
    </Modal>
  );
}
