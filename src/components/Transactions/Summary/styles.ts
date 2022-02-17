import styled from "styled-components";

interface ContainerProps {
  fechada: boolean;
  atual: boolean;
  active: boolean;
}

export const Content = styled.div`
margin-top: -10rem;  
display: flex;
align-items: center;

  button {
    border: none;
    background: transparent;
    font-size: 2rem;
    padding: 3rem;
    margin-top: -1rem;
    transition: background-color 0.2s;
    
    span {
      color: white;
      font-size: 3rem;

      &:hover {
        filter: brightness(0.8);
      }
    }    
  }
`;

export const Component = styled.div<ContainerProps>`
  display: flex;  
  cursor: pointer;

  div {
  &:hover {
    background: ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "gray"))};
    border-color: black;
    border: solid 0.15rem;
    filter: brightness(0.8);
  }

  background: var(--shape);
  padding: 2rem;
  align-items: center;
  margin: 0;
  margin-right: 0.5rem;
  
  color: var(--text-title);
  border: solid 0.3rem;
  border-color: ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "gray"))};

  width: ${(props) => (props.active ? "8rem" : "10rem" )};
  height: ${(props) => (props.active ? "8rem" : "10rem" )};
  border-radius: 50%;

  header {
    display: flex;
    justify-content: center;
  }

  main {      
    display: flex;
    width: ${(props) => (props.active ? "5rem" : "7rem" )};
    font-size: ${(props) => (props.active ? "0.36rem" : "0.5rem" )};
    margin-top: 0.2rem;
  }

  footer {
    display: flex;
    justify-content: center;
    margin-top: 1rem;      
    font-size: ${(props) => (props.active ? "0.8rem" : "1rem" )};      
    font-weight: 500;
    line-height: ${(props) => (props.active ? "1rem" : "2rem" )};
  }

  strong {
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: ${(props) => (props.active ? "0.6rem" : "0.8rem" )};
  }

  &.highlight-background {
    background: var(--green);
    color: #fff;
  }
}

`;

export const ContentTipoPagamento = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;    
`;
