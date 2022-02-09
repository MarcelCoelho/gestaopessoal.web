import styled from "styled-components";

interface TRProps {
  fechada: boolean;
  atual: boolean;
}

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }    
  }
`;

export const TR = styled.tr<TRProps>`

 td {
  padding: 1rem 2rem;
  border: 0;
  background: var(--shape);
  color: ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "var(--text-body)"))};
  border-radius: 0.25rem;

 checkbox {
  backgorund-color: ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "var(--text-body)"))};
 }
}
`;
