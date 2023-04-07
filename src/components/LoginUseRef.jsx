import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../store/modules/user';
import axios from 'axios';

export default function LoginUseRef() {
  const loginIdInput = useRef();
  const loginPwInput = useRef();
  const dispatch = useDispatch();

  const loginUser = async () => {
    if (!loginIdInput.current.value || !loginPwInput.current.value)
      return alert('값을 입력 하세요');
    const resLogin = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: loginIdInput.current.value,
        password: loginPwInput.current.value,
      }),
    });
    if (resLogin.status === 200) {
      dispatch(
        login({
          id: loginIdInput.current.value,
          password: loginPwInput.current.value,
        }),
      );
      loginIdInput.current.value = '';
      loginPwInput.current.value = '';
      return alert(await resLogin.json());
    } else {
      return alert(await resLogin.json());
    }
  };

  return (
    <>
      {/* 로그인 파트 */}
      <h1>로그인 파트</h1>
      아이디 <input type="text" ref={loginIdInput} />
      <br />
      <br />
      비밀번호 <input type="password" ref={loginPwInput} />
      <br />
      <br />
      <button onClick={loginUser}>로그인</button>{' '}
      <Link to="">카카오 로그인</Link>
    </>
  );
}
