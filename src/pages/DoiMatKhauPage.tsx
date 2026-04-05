// @ts-ignore
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { alertActions, updatePassword } from '../services/main/action';
import Header from '../components/Header/LoginHeader';
import ChangePasswordComponent from '../components/ChangePasswordComponent';
enum MSG_CHANGE_PASSWORD {
  THIEU_TT = 'Vui lòng nhập đầy đủ các thông tin yêu cầu',
  UN_EQUAL_PASSWORD = 'Mật khẩu mới không khớp nhau',
}
type DispatchToProps = {
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => void;
  handleError:(message:string)=> void,
};
type Props = {} & RouteComponentProps<null> & DispatchToProps;

class DoiMatKhauPage extends React.Component<Props, {}> {
  state = {
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  };
  isVaild() {
    if (this.state.currentPassword === '' || this.state.newPassword === '' || this.state.repeatPassword === '') {
      this.props.handleError(MSG_CHANGE_PASSWORD.THIEU_TT)
      return false;
    }
    if(this.state.newPassword !== this.state.repeatPassword){
      this.props.handleError(MSG_CHANGE_PASSWORD.UN_EQUAL_PASSWORD)
      return false;
    }
    return true;
  }
  onChangeHandle = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit() {
    if (this.isVaild()) {
      this.props.updatePassword(
        this.state.currentPassword,
        this.state.newPassword
      );
    }
  }
  getUserName() {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return user.username;
  }
  render() {
    return (
      <div>
        <Header />
        <ChangePasswordComponent
          onSubmit={this.onSubmit.bind(this)}
          onChange={this.onChangeHandle.bind(this)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  updatePassword: (currentPassword: string, newPassword: string) =>
    dispatch(updatePassword(currentPassword, newPassword)),
    handleError:(message:string)=> dispatch(alertActions.error(message)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(DoiMatKhauPage),
);
