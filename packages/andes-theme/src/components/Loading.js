import React from "react";
import { styled, keyframes, css } from "frontity";

const scale = keyframes`
  0% {transform: scaley(1.0)}
  50% {transform: scaley(0.4)}
  100% {transform: scaley(1.0)}
`;

const Loading = () => (
  <Container>
    <div>
      <div css={bar(1)} />
      <div css={bar(2)} />
      <div css={bar(3)} />
      <div css={bar(4)} />
      <div css={bar(5)} />
    </div>
  </Container>
);

export default Loading;

const bar = index => css`
  background-color: #44841a;
  width: 4px;
  height: 24px;
  margin: 3px;
  border-radius: 0;
  display: inline-block;
  animation: ${scale} 1s ${index * 0.1}s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation-fill-mode: both;
`;

const Container = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 25rem 0 15rem 0;
  }

  @media(max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;
