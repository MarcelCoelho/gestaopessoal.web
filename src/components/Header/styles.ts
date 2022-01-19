import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  grid-gap: 1rem;

  align-items: center;

  button {
    font-size: 0.8rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
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
