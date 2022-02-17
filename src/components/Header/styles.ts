import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 10rem;

  display: flex;
  justify-content: space-between;

  align-items: center;

  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      margin-left: 1rem;
      color: white;
      font-family: 'Roboto', sans-serif;
      font-size: 1.5rem;
    }
  }

  button {
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  button {
    margin: 1rem 0.5rem 1rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    height: 3rem;
    border: 0;
    padding: 0 2rem;
    background: var(--blue-light);
    color: #fff;
  }

  div {
    display: flex;
    justify-content: space-between;
   
    .newPage {
      
      button {       
        padding: 0 0.5rem;
      }
    }
  
    .newItem {
      margin-left: 5rem;
    }

  }
`;

export const LinkButton = styled(Link)`
    text-decoration: none;

    font-size: 0.8rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 0.4rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;
    
`;
