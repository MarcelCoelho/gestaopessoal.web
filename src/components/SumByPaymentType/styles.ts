import styled from "styled-components";

interface ComponentProps {
  fechada: boolean;
  atual: boolean;
  active: boolean;
}


export const Component = styled.div<ComponentProps>`
  cursor: pointer;
  margin: 0.5rem;
  width: 8rem;
  height: 3.5rem;
  
  background: ${(props) => props.active ? (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)": "gray")): "var(--shape)"};
  border-radius: 1rem;
  border: solid 0.15rem;
  border-color: ${(props) => props.active ? "var(--black)" : (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)": "var(--cinza)"))};

  &:hover {
    background:  ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)": "var(--cinza)"))};
    border-color: var(--black);
    filter: brightness(0.8);
  } 
   
  display: grid;
  grid-template-rows: 1fr 1fr; 
  
  .header {
    display: grid;
    grid-template-columns: 10fr 1fr;
    margin: 0.2rem;
   
    p {
      justify-content: start
      margin-left: 3rem;
      font-size: 0.7rem;
    }

    span {
      justify-content: end
      margin-top: 0.5rem;
      font-size: 0.5rem;
    }
  }

  .footer {
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    font-size: 0.7rem;
    font-weight: 500;
    justify-content: end
  }

`;

export const Header = styled.div`
grid-row-start: 1;

display: flex;
  
  align-items: center;
  
    p {
      margin-left: 2rem;
      font-size: 1rem;
    }

    span {
      margin-top: 0.2rem;
      font-size: 0.8rem;
    }
`;

export const Footer = styled.div`
  grid-row-end: 1;
  margin-top: -2rem;  
  margin-left: 2.1rem;  
`;