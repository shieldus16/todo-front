// React component (Login.jsx)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: username,
          password: password,
        }),
      });

      const data = response.data;

      if (data.success) {
        console.log('로그인 성공');
        // 로그인 성공 시 리다이렉트 또는 다른 작업 수행
        navigate('/calendar');
      } else {
        console.error('로그인 실패:', data.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          아이디:
          <input type="text" name="id" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="로그인" />
      </form>

      {/* Add any additional React-specific elements here */}
    </div>
  );
};

export default Login;
