import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { color } from "../theme";
import { useState } from "react";
import backgroundImage from "../photos/signupbackground.png";
import { API_BASE_URL } from "../config";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: lighten;

  h1 {
    margin-top: 150px;
    margin-bottom: 15px;
    font-size: 2.2em;

    @media (max-width: 768px) {
      margin-top: 100px;
      font-size: 1.8em;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  flex: 1;
  margin-bottom: 8px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1em;
  }
`;

const Select = styled.select`
  flex: 1;
  margin-bottom: 8px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1em;
  }
`;

const CheckButton = styled.button`
  margin-left: 10px;
  padding: 15px;
  margin-bottom: 8px;
  text-decoration: none;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 7px;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    padding: 10px;
    font-size: 0.9em;
  }
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 15px;
  text-decoration: none;
  font-size: 1.5em;
  cursor: pointer;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 7px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    background: #fff;
    color: #abb7b7;
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1.2em;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 400px;
  color: ${color.lightGray};
  font-size: 1.2em;

  a {
    text-decoration: none;
    color: ${color.lightGray};
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: 1em;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  margin-bottom: 8px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;
  width: 50%;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1em;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const handleCheckDuplicate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}check-duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (data.exists) {
        alert("이미 있는 아이디입니다.");
        setIsDuplicate(true);
      } else {
        alert("가입 가능한 아이디입니다.");
        setIsDuplicate(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('중복 확인에 실패했습니다. 서버 Error!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDuplicate) {
      alert("가입이 불가능한 아이디 입니다.");
      return;
    }

    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!confirmPassword) {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    const email = emailDomain !== "none" ? `${emailLocal}@${emailDomain}` : null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name, email }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "회원가입에 실패했습니다.");
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Style>
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CheckButton type="button" onClick={handleCheckDuplicate}>
            중복확인
          </CheckButton>
        </InputContainer>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputContainer>
          <EmailInput
            type="text"
            placeholder="[선택] 이메일 주소"
            value={emailLocal}
            onChange={(e) => setEmailLocal(e.target.value)}
          />
          <span style={{ margin: "0 5px" }}>@</span>
          <Select value={emailDomain} onChange={(e) => setEmailDomain(e.target.value)}>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="kakao.com">kakao.com</option>
            <option value="none">없음(선택안함)</option>
          </Select>
        </InputContainer>
        <Button type="submit" disabled={loading}>
          {loading ? "회원가입 중 ..." : "회원가입"}
        </Button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </Form>
      <LinkContainer>
        <Link to="/login">로그인</Link>
      </LinkContainer>
    </Style>
  );
};

export default SignUp;