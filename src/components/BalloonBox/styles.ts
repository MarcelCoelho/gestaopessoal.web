import styled from "styled-components";

export const BalloonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 3rem;
  background: #f1f1f1;
  border-radius: 1.3rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  background: #f1f1f1;
  position: absolute;
  bottom: -7px;
  right: 10px;
  }

  &::before {
    content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #f1f1f1;
  position: absolute;
  right: 10px;
  bottom: -21px;
  }

  filter: drop-shadow(0 0 3px rgba(0, 0, 0, .5));
`;