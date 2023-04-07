import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { replace } = useNavigate;
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //page가 refresh 방지
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  //비밀번호 확인
  const validateInput = () => {
    if (inputId === '' || inputPw === '') {
      setErrorMessage('아이디와 비밀번호를 입력해주세요');
      return false;
    }
    return true;
  };

  //로그인
  const login = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          USER_ID: inputId,
          PASSWORD: inputPw,
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        localStorage.setItem('token', result.jwt);
        replace('/');
      } else if (response.status === 401) {
        setErrorMessage('로그인 정보가 일치하지 않습니다.');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('로그인 실패');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      replace('/');
    }
  }, []);

  return (
    <form onChange={onSubmitHandler}>
      <h1>login</h1>
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
        id="inputId"
        value={inputPw}
        onChange={(e) => setInputPw(e.target.value)}
      />
      <button type="submit" onClick={validateInput}>
        로그인
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
