import styled from "styled-components";

export const ContainerTable = styled.div`
    
    margin: 0.3rem auto;
    height: 27rem;
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
    
    table {
      margin: -0.5rem auto;
      border-spacing: 0 0.3rem;

      th {
        width: 6rem;
        background: var(--blue);        
        padding: 0.5rem;
        text-align: left;
        line-height: 1rem;
        color: white;
        font-weight: 300;
        font-size: 0.8rem;   
      }

      td {
        width: 6rem;
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