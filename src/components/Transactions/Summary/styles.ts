import styled from "styled-components";

export const Content = styled.div`
  margin-top: -10rem;  
  display: flex;
`;

export const Container = styled.div`
  display: flex;  
  cursor: pointer;

  div {    

    &:hover {
      background: var(--green-light);
      border-color: black;
      filter: brightness(0.8);
    }

    background: var(--shape);
    padding: 2rem;
    align-items: center;
    margin: 0;
    margin-right: 0.5rem;
    
    color: var(--text-title);
    border: solid 0.15rem;
    border-color: var(--green-light);

    width: 10rem;
    height: 10rem;
    border-radius: 50%;

    header {
      display: flex;
      justify-content: center;
    }

    main {      
      display: flex;
      width: 6rem;
      font-size: 0.5rem;
      margin-top: 0.2rem;
    }

    footer {
      display: flex;
      justify-content: center;
      margin-top: 1rem;      
      font-size: 1rem;      
      font-weight: 500;
      line-height: 2rem;
    }

    &.highlight-background {
      background: var(--green);
      color: #fff;
    }
  }
`;
