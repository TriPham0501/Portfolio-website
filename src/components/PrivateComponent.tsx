import * as React from 'react';
import authService from '../services/api/AuthServices';
import LoadingPage from '../pages/LoadingPage';
import NotAccess from '../pages/NotAccess';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = createStyles({

});

type States = {
  isLoadAccess: boolean
  isAccess: boolean
};

type PrivateComponentProps = {
  Component: React.ComponentType<any>
  id: string
}
  & WithStyles<typeof styles>;

class PrivateComponent extends React.PureComponent<PrivateComponentProps, States>{
  constructor(props: PrivateComponentProps) {
    super(props);
    this.state = { isLoadAccess: false, isAccess: false };
  }
  async componentWillMount() {
    // TODO: login temporarily disabled
    // const isAccess = await authService.isAccess(this.props.id);
    this.setState({ isLoadAccess: true, isAccess: true });
  }
  render() {
    if (this.state.isLoadAccess && !this.state.isAccess) {
      return <NotAccess />;
    }
    if (!this.state.isLoadAccess) {
      return <LoadingPage />;
    }
   
    return <this.props.Component id={this.props.id} />
       
  }
}
export default withStyles(styles)(PrivateComponent);