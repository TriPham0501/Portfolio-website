import * as React from 'react';
import { Card, TextField, Button, createStyles, WithStyles, Theme, withStyles, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: '20px auto',
    textAlign: 'center',
    maxWidth: 700
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight:700,
    marginTop:15,
    color: theme.palette.primary.main
  },
  cardHeading: {
    padding: 16
  },

});

type Props = {
  onSubmit: (event: object) => void
  onChange: (event: object) => void
} & WithStyles<typeof styles>;
type States = {
};

class ChangePasswordComponent extends React.Component<Props, States> {
  render() {
    const { onChange, onSubmit, classes } = this.props;
    return (
      <Card className={classes.container}>
        <form>
          <Typography className={classes.title} >Đổi mật khẩu</Typography>
          <div className={classes.cardHeading}>
          <TextField
              label="Mật khẩu hiện tại"
              name="currentPassword"
              type="password"
              onChange={onChange}
            />
          </div>

          <div className={classes.cardHeading}>
            <TextField
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              onChange={onChange}
            />
          </div>

          <div className={classes.cardHeading}>
            <TextField
              label="Nhập lại mật khẩu"
              type="password"
              name="repeatPassword"
              onChange={onChange}
            />
          </div>

          <div className={classes.cardHeading}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Đổi mật khẩu
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

export default withStyles(styles)(ChangePasswordComponent);
