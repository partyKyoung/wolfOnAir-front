import React, { Component } from 'react';
import { Nav, NavItem, NavLink,} from 'reactstrap';

class Menu extends Component {
  render() {
    return (
      <Nav className="w-100 menu">
        <NavItem>
          <NavLink href="/lobby">게임 시작</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/board/free">자유 게시판</NavLink>
        </NavItem>
      </Nav> 
    );
  }
}

export default Menu;