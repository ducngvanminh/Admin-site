import { useEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function ModalCreate(props) {
  const { open, setOpen, singleData, updateEmployee, loading, error } = props;

  const imgRef = useRef(null);
  const [dataSubmit, setDataSubmit] = useState({});
  const [imageChange, setImageChange] = useState(false);
  const [errorValidate, setErrorValidate] = useState({});

  useEffect(() => {
    setDataSubmit(singleData ? singleData : {});
  }, [singleData]);

  const handleOk = () => {
    // Kiểm tra xem có lỗi validate không
    for (const key in errorValidate) {
      if (errorValidate[key]) {
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
              borderColor: errorValidate.image && '#dc3545',
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
              />
            ) : (
              <img
                src={'../../../public/user-defaut.png'}
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
            status={errorValidate?.name && 'error'}
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
              <p>Vị trí ngồi</p>
              <Input
                value={dataSubmit?.idSeat}
                status={errorValidate?.seat && 'error'}
                disabled
                readOnly
                onChange={(event) =>
                  setDataSubmit({ ...dataSubmit, idSeat: event.target.value })
                }
              />
            </div>
            <div style={{ width: '47%' }}>
              <p>Mã nhân viên</p>
              <Input
                value={dataSubmit?.msnv}
                status={errorValidate?.code && 'error'}
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
        {/* <div style={{ marginTop: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '47%' }}>
              <p>Email</p>
              <Input
                value={dataSubmit?.email}
                status={errorValidate?.email && 'error'}
                readOnly
                onChange={(event) =>
                  setDataSubmit({ ...dataSubmit, email: event.target.value })
                }
              />
            </div>
            <div style={{ width: '47%' }}>
              <p>Ngày sinh</p>
              <Input
                value={dataSubmit?.birthday}
                status={errorValidate?.birthday && 'error'}
                onChange={(event) =>
                  setDataSubmit({ ...dataSubmit, birthday: event.target.value })
                }
              />
            </div>
          </div>
        </div> */}
      </Modal>
    </>
  );
}
