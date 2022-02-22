import styled from "styled-components";

export const Container = styled.div`
 display: flex;
 flex-direction: column;
 margin-top: 3rem;
`;
export const Barra = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.5rem;
`;

export const Search = styled.div`
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
export const Total = styled.div`
    span {
      font-size: 1.7rem;
      padding: 0.5rem;
      color: var(--blue);
    }
`;
export const ContentTable = styled.div`
    height: 28rem;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 0.7rem;
      height: 0.7rem;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--shape);
      margin-top: 0.8rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: var(--blue);    /* color of the scroll thumb */      
      border: 0.1rem solid orange;  /* creates padding around scroll thumb */
    }
    
    table {
      margin: 0.5rem;
      border-spacing: 0 0.3rem;
      
      th {
        width: 8rem;
        background: var(--blue);        
        padding: 0.5rem;
        text-align: left;
        line-height: 1rem;
        color: white;
        font-weight: 300;
        font-size: 0.8rem;
      }

      td {
        width: 8rem;
        font-size: 0.8rem;
        padding: 0.5rem;
        border: 0;
        background: var(--shape);
        color: var(--text-body);
        border-radius: 0.25rem;
      }

      .close {
        text-align: center;
        width: 4rem;
      }
    }
`;
