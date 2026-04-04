import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
const styles = createStyles({
  metroItem: {
    width: 150,
    height: 150,
    backgroundColor: '#2196F3',
    textAlign: 'center',
    margin: 10,
    cursor: 'pointer',
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    },
    '& .inner': {
    },
    '& img': {
      width: 40,
      marginTop: 30
    },
    '& p': {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: `'Open Sans', sans-serif`
    }
  }
});

type Props = {
  title: string;
  icon?: string;
  path: string;
  backgroundColor: string;
  isExternal?: boolean;
}
  & WithStyles<typeof styles>;

type States = {

};

class MetroItemComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes, title, icon, path, backgroundColor, isExternal } = this.props;
    const component = <div className={classes.metroItem} style={{ backgroundColor: backgroundColor }}>
      <div className="inner">
        <img src={icon} alt={title} />
        <p>{title}</p>
      </div>
    </div>;
    if (isExternal) {
      return <a href={path} target="_blank">
        {component}
      </a>;
    }
    return <Link to={path}>
      {component}
    </Link>;
  }
}

export default withStyles(styles)(MetroItemComponent);