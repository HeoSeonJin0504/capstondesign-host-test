import styled from "styled-components";
import { Link } from "react-router-dom";
import { color } from "../theme";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    flex-direction: column;
    height: auto;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: ${color.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    margin-bottom: 20px;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  background-color: ${color.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow-y: auto;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    overflow-y: visible;
  }
`;

const LeftTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #343a40;
`;

const LeftDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 300px;
  height: auto;
  margin-bottom: 20px;
  border: 2px solid #343a40;
  border-radius: 10px;
`;

const Button = styled(Link)`
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #343a40;
  font-size: 1.5em;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const RightTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const RightDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Introduce = () => {
  return (
    <Container>
      <LeftContainer>
        <LeftTitle>AI 기반 어린이 그림 동화 생성기</LeftTitle>
        <LeftDescription>
          그림을 디지털로 업로드하여 저장하고 인공지능을 활용하여<br/>
          주제를 분석해 동화를 생성하는 프로그램입니다.
        </LeftDescription>
        <Image src="src/photos/introduce.png" alt="프로그램 실행 사진" />
        <Button to="/login">로그인</Button>
      </LeftContainer>
      <RightContainer>
        <RightTitle>프로그램 사용 방법</RightTitle>
        <StepContainer>
          <RightDescription>1. 로그인을 진행해 주세요.</RightDescription>
          <Image src="src/photos/introduce/introduce1.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            2. 상단의 '실습하기'를 클릭해 주세요.
          </RightDescription>
          <Image src="src/photos/introduce.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            3. '사진 열기' 버튼을 클락해서 그림을 업로드해 주세요.
          </RightDescription>
          <Image src="src/photos/introduce/introduce3.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            4. '동화 생성' 버튼을 클릭해 주세요.
          </RightDescription>
          <Image src="src/photos/introduce/introduce4.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            5. '이미지 저장' 버튼을 클릭하면 이미지 저장이 가능합니다.
          </RightDescription>
          <Image src="src/photos/introduce.png" />
        </StepContainer>
      </RightContainer>
    </Container>
  );
};

export default Introduce;