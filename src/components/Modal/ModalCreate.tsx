import { useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function ModalCreate(props) {
  const { open, setOpen, createEmployee, error, loading } = props;

  const imgRef = useRef(null);
  const [dataSubmit, setDataSubmit] = useState({});
  const [imageChange, setImageChange] = useState(false);
  const [errorValidate, setErrorValidate] = useState({});

  const validateEmail = (email: string) => {
    // Biểu thức chính quy để kiểm tra địa chỉ email
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleChange = (key: string, value: string) => {
    setDataSubmit({ ...dataSubmit, [key]: value });

    // Kiểm tra tính hợp lệ của địa chỉ email khi người dùng nhập
    if (key === 'email') {
      if (!validateEmail(value)) {
        setErrorValidate({ ...errorValidate, email: 'Email không hợp lệ' });
      } else {
        setErrorValidate({ ...errorValidate, email: '' });
      }
    }
  };

  const handleOk = () => {
    // Kiểm tra xem có lỗi validate không
    for (const key in errorValidate) {
      if (errorValidate[key]) {
        return;
      }
    }

    createEmployee(dataSubmit);
  };

  const handleCancel = () => {
    setOpen(false);
    setErrorValidate({});
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined />}
        footer={
          <>
            <Button type="primary" onClick={handleOk} loading={loading}>
              Xác nhận
            </Button>
          </>
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
              borderColor: errorValidate.avatar && '#dc3545',
            }}
          >
            {dataSubmit?.avatar ? (
              <img
                src={
                  imageChange
                    ? URL.createObjectURL(dataSubmit.avatar)
                    : `https://drive.google.com/thumbnail?id=${dataSubmit?.avatar}`
                }
                alt=""
                onClick={() => imgRef.current.click()}
                style={{ cursor: 'pointer', borderRadius: '50%' }}
                className="avatar"
              />
            ) : (
              <img
                src={'/user-defaut.png'}
                alt="avatar"
                width={130}
                height={130}
                onClick={() => imgRef.current.click()}
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
                avatar: event.target.files[0],
              });
            }}
          />
        </div>

        <div>
          <p>Họ Và Tên</p>
          <Input
            value={dataSubmit?.nameUser}
            status={errorValidate?.nameUser && 'error'}
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
                status={errorValidate?.title && 'error'}
                onChange={(event) =>
                  setDataSubmit({ ...dataSubmit, title: event.target.value })
                }
              />
            </div>
            <div style={{ width: '47%' }}>
              <p>Số điện thoại</p>
              <Input
                value={dataSubmit?.phone}
                status={errorValidate?.phone && 'error'}
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
              <p>Mã nhân viên</p>
              <Input
                value={dataSubmit?.msnv}
                status={errorValidate?.msnv && 'error'}
                onChange={(event) =>
                  setDataSubmit({ ...dataSubmit, msnv: event.target.value })
                }
              />
            </div>
            <div style={{ width: '47%' }}>
              <p>Ngày sinh</p>
              <DatePicker
                onChange={(value) => {
                  setDataSubmit({
                    ...dataSubmit,
                    birthday: dayjs(value).format('DD-MM-YYYY'),
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
              <p>Email</p>
              <Input
                value={dataSubmit?.email}
                status={errorValidate?.email && 'error'}
                onChange={(event) => handleChange('email', event.target.value)}
              />
            </div>
          </div>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
