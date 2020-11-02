import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '@/api/user';

import { RootState } from '@/modules';
import { removeUser } from '@/modules/user';

import useRequest from '@/hooks/useRequest';

import Header from '@/components/molecules/Header';

const HeaderContainer = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));
  const userName = useSelector((state: RootState) => (state.user.userName));
  const dispatch = useDispatch();
  const [,,,onLogout] = useRequest(logout, null, true);

  const onClickLogout = () => {
    dispatch(removeUser());
    onLogout(null);

    history.push('/');
  }

  return (
    <Header 
      isLoggedIn={isLoggedIn}
      onLogout={onClickLogout}
      userName={userName}
    />
  )
}

export default HeaderContainer;