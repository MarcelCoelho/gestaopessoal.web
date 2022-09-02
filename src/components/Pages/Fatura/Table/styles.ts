import styled from "styled-components";

interface TrProps {
  fechada: boolean;
  atual: boolean;
}

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
  }
`;

export const Tr = styled.tr<TrProps>`

  .title {
    color: ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "var(--text-body)"))};
  }
`;
