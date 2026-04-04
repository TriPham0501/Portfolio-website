import * as React from 'react';
import { Paper, List, ListItem, ListItemText, ListItemIcon, ClickAwayListener } from '@material-ui/core';
export type Menu = {
  icon: JSX.Element, text: string, type: string,disabled?:boolean
};

type Props = {
  visible: boolean,
  coords: { x: number, y: number },
  menus: Menu[],
  onClick: (type: string) => void,
  onClose: (event: React.ReactNode) => void
}
export default function ContextMenu(props: Props) {
  return <Paper
    style={{
      position: 'absolute', top: props.coords.y - 60, left: props.coords.x, zIndex: 999,
      visibility: props.visible ? 'visible' : 'hidden'
    }}>
    <ClickAwayListener onClickAway={props.onClose}>
      <List>
        {props.menus.map(m =>
          <ListItem
          disabled={Boolean(m.disabled)}
            key={m.text}
            button
            onClick={() => props.onClick(m.type)} >
            <ListItemIcon>{m.icon}</ListItemIcon>
            <ListItemText>{m.text}</ListItemText>
          </ListItem>
        )}
      </List>
    </ClickAwayListener>
  </Paper>
}