import styled from 'styled-components';

export const Container = styled.div`
  

  padding-top: 2rem;
  width: 15rem;
  color: var(--border-botton);

  display: flex;
  justify-content: left;
  align-items: center;
  
  border-bottom: 0.1rem solid var(--border-botton);

  svg {
    margin-right: 0.5rem;
    padding-bottom: 0.3rem;
  }

  input { 
    padding-bottom: 0.3rem;
    background: transparent;
    border: none;
    outline: none;
    
    &::placeholder {
      color: var(--border-botton);      
    }

  }


  
`;