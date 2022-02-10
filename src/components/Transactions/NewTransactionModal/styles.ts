import styled from "styled-components";

export const Content = styled.div`

  height: 40rem;
  font-size: 1rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.7rem;
  }

  ::-webkit-scrollbar-track {
    background: var(--shape);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--blue);    /* color of the scroll thumb */      
    border: 0.1rem solid orange;  /* creates padding around scroll thumb */
  }

  form {
    
    input {
      margin-top: 0.3rem;
      width: 100%;
      padding: 0 1.5rem;
      height: 2.5rem;
      border-radius: 0.25rem;

      border: 0.1rem solid var(--border-botton);
      background: #e7e9ee;

      font-weight: 400;
      font-size: 0.8rem;

      &::placeholder {
        color: var(--text-body);
      }
 
    }

    button[type="submit"] {
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;
      background: var(--green);
      color: var(--shape);
      border-radius: 0.25rem;
      border: 0.1rem solid var(--blue);
      font-size: 1rem;
      margin-top: 1.5rem;
      font-weight: 600;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
