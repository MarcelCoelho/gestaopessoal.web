import styled from "styled-components";

export const Container = styled.div`
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
