import styled from "styled-components";

export const Container = styled.div`

    display: block;
    align-items: left;

    input {
      margin-left: -10rem;
      margin-bottom: 1rem;
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
      }
    }

      margin-top: 4rem;
  
      table {
      
        border-spacing: 0 0.3rem;

        th {
          color: black;
          font-weight: 400;
          padding: 1rem 2rem;
          text-align: left;
          line-height: 1.5rem;
        }

        td {
          width: 3rem;
          padding: 1rem 2rem;
          border: 0;
          background: var(--shape);
          color: var(--text-body);
          border-radius: 0.25rem;

          &:first-child {
            color: var(--text-title);
          }

              &.deposit {
                color: var(--green);
              }

              &.withdraw {
                color: var(--red);
              }
            }
          }
        }
`;
