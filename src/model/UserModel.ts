export class UserModel {
  idUser: number;
  nameUser?: string;
  title?: string;
  idSeat?: number;
  msnv?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  imageAvatar?: string | File;

  constructor() {
    this.idUser = 0;
    this.nameUser = '';
    this.title = '';
    this.idSeat = 0;
    this.msnv = '';
    this.phone = '';
    this.email = '';
    this.birthday = '';
    this.imageAvatar = '';
  }
}
