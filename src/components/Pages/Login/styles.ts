import styled from "styled-components";

export const Container = styled.div`    
    height: 100vh;
    background: linear-gradient(90deg, rgba(144,124,203,1) 0%, rgba(9,9,121,1) 35%, rgba(255,255,255,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
`;

export const ContainerInfo = styled.div`
  width: 20rem;
  height:30rem;
  border-radius: 0.7rem;
  background: var(--shape);
  
  

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
    h2 {
      font-size: 1.8rem;
      border-bottom: 0.1rem solid black;
      
      align-content: center;
      align-self: center;
      margin-bottom: 3rem;
    }

  button {
    color: white;
    border: none;
    background: var(--blue-light);

    margin-top: 2rem;
    border-radius: 0.3rem;
    height: 4rem;
    width: 15rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: filter 0.2s;

&:hover {
  filter: brightness(0.9);
}

  }

`;


