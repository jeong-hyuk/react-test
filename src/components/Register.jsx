import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { replace } = useNavigate;
  const [inputId, setInputId] = useState(''); //초기화 시키는 이유는 모든 컴퓨터는 메모리 사용 변수 선언 헀으면 빈값이 아니라는 증거
  const [inputPw, setInputPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');

  //page가 refresh 방지
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  //회원가입
  const register = async () => {
    if (inputPw !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          USER_ID: inputId,
          PASSWORD: inputPw,
          NAME: inputName,
          PHONE_NUMBER: inputPhone,
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        localStorage.setItem('token', result.jwt);
        replace('/');
      } else if (response.status === 400) {
        alert('입력값을 다시 확인해주세요.');
      } else {
        alert('로그인 실패');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      replace('/');
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>register</h1>
      <input
        type="text"
        placeholder="test@test.com"
        name="inputId"
        id="inputId"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />
      <input
        type="password"
        placeholder="**********"
        name="inputPw"
        id="inputPw"
        value={inputPw}
        onChange={(e) => setInputPw(e.target.value)}
      />
      <input
        type="password"
        placeholder="confirm password"
        value={confirmPw}
        onChange={(e) => setConfirmPw(e.target.value)}
      />
      <input
        type="text"
        placeholder="your name"
        name="inputName"
        id="inputName"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        type="text"
        placeholder="phone number"
        name="inputPhone"
        id="inputPhone"
        value={inputPhone}
        onChange={(e) => setInputPhone(e.target.value)}
      />

      <button type="submit" onClick={register}>
        회원가입
      </button>
    </form>
  );
}
