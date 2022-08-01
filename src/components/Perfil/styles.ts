import styled from "styled-components";

export const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }

    & div {
      display: flex;
      justify-content: center;
      align-items: left;
      flex-direction: column;
      padding-left: 0.8rem;
      
    span {
      color: white;
      font-family: 'Roboto', sans-serif;
      font-size: 2rem;
    }

    b {      
      font-family: 'Roboto', sans-serif;
      color: var(--background);
      font-size: 0.8rem;
    }
  }
`;