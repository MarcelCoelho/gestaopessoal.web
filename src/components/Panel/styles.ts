import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Filter = styled.div`
 width: 100%;
  margin-top: 1rem;
  background-color: #DCDCDC;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem; 

  .autocomplete-aplicacoes {
    width: 200px;
    height: 10px;
    margin-top: -3rem;
  }
 
  .autocomplete-funcionalidades {
    width: 400px;
    height: 10px;
    margin-top: -3rem;
    margin-left: 0.5rem;
  }

   .input-quantidade {
      input {
        border: 0.5px solid gray;
        padding: 0.5rem;
        font-size: 0.65rem;
        height: 3.5rem;
        margin-left: 0.5rem;
        border-radius: 0.2rem;
      }
      input:focus {
        outline: none;
        border-radius: 1rem;
      }
   }

  .btn-ir {
    margin-left: 3rem;
    width: 40%;
    height: 3.5rem;
    border: none;
    background: var(--green-light);
    font-size: 0.8rem;
    font-weight: 400;

    transition: background-color 0.2s;

    &:hover {
      filter: brightness(0.8);
      border: 2px solid #04d361;
    }
  }
`;

export const Timeline = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  background-color: #DCDCDC;
  overflow: auto;

  /* The actual timeline (the vertical ruler) */
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    margin-top: 7rem;
  }
`;

export const ContainerLeft = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  border-radius: 0.5rem;
  left: 0;

  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    right: -12px;
    background-color: #FF9F55;
    border: 4px solid #FF9F55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  /* Add arrows to the left container (pointing right) */
  &::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 17px;
    width: 0;
    z-index: 1;
    right: 30px;
    border: medium solid white;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent white;
  }
`;

export const ContentLeft = styled.div`
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;

`;

export const ContainerRight = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  left: 50%;
  font-size: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    right: -10px;
    background-color: white;
    border: 4px solid #FF9F55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    left: -8px;
  }

  &&::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 13px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }
`;

export const ContentRight = styled.div`
  padding: 5px 20px;
  background-color: white;
  position: relative;
  border-radius: 6px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 0.7rem;
  }

  button {
    margin-left: 2rem;
    border: none;
    font-size: 1rem;
    font-weight: 400;
    background: transparent;

    transition: background-color 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;