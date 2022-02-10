import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    margin-top: 3rem;  
   
`;

export const Search = styled.div`

  margin: 0 auto;
  

  input {
    width: 25rem;
    height: 3rem;
    border: none;
    padding: 0.5rem; 
  }

  input:focus {
    outline: none;
    border-radius: 0.7rem;
  }

  button {
    margin-left: -2rem;
    width: 6rem;
    height: 3rem;
    border: none;
    background: var(--green-light);
    font-size:0.8rem;
    font-weight: 400;

    transition: background-color 0.2s;

    &:hover {
      filter: brightness(0.8);
      border: 2px solid #04d361;
    }}

`;


