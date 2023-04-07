import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../\bstore/modules/user';

export default function RegisterUseRef() {
  const registerIdInput = useRef();
  const registerPwInput = useRef();
  const dispatch = useDispatch();

  const registerUser = async () => {
    if (!registerIdInput.current.value || !registerPwInput.current.value)
      return alert('값을 입력 하세요');
    const resRegister = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: registerIdInput.current.value,
        password: registerPwInput.current.value,
      }),
    });
    if (resRegister.status === 200) {
      dispatch(
        login({
          id: registerIdInput.current.value,
          password: registerPwInput.current.value,
        }),
      );
      registerIdInput.current.value = '';
      registerPwInput.current.value = '';
      return alert(await resRegister.json());
    } else {
      return alert(await resRegister.json());
    }
  };

  return (
    <>
      <h1>회원가입 파트</h1>
      아이디 <input type="text" ref={registerIdInput} />
      <br />
      <br />
      비밀번호 <input type="password" ref={registerPwInput} />
      <br />
      <br />
      <button onClick={registerUser}>회원가입</button>
    </>
  );
}
