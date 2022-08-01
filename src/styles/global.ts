import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --background: #f0f2f5;
    --red: #E52E4D;
    --green: #33CC95;
    --blue: #5429CC;
    --blue-light: #6933FF;
    --text-title: #363F5F;
    --text-body: #969CB3;
    --shape: #FFFFFF;
    --border-botton: #d7d7d7;
    --green-light: #3CB371;
    --red-tomato: #FF6347;
    --black: #000;
    --cinza: gray;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 // padrão font aplicação 16px (ideal Desktop);
 html {
   @media (max-width: 1080px) {
     font-size: 93.75%; // 15px
   }

   @media (max-width: 920px) {
     font-size: 87.5%; // 14px
     
    .tableData {
      font-size: 0.5rem;
      background: black;
    }

    .contentModal {
      height: 20rem;
      width: 30rem;
      margin: 1rem;

      .input {
        height: 2rem;
      }
    }

    .contentSummary {
        flex-wrap: wrap;

        button {
          font-size: 1rem;
          padding: 2rem;
          margin-top: -0.5rem;

          span {
            color: black;
            font-size: 2.5rem;
          }
        }
      }

    .componentSummary {
      flex-wrap: wrap;
      div {
        width: 8rem;
        height: 8rem;

        main {
          width: 5rem;
          font-size: 0.36rem;
        }

        footer {
          font-size: 0.8rem;
          line-height: 1rem;
        }
      }
    }

    .searchData {
      input {
        width: 18rem;
        height: 2rem;
        font-size: 0.7rem;
      }
      input:focus {
        border-radius: 0.4rem;
      }
      button {
        margin-left: -1rem;
        width: 4rem;
        height: 2rem;
        font-size:0.7rem;
      }
    }
    .totalData {
      span {
        font-size: 1.2rem;
        padding: 0.3rem;
      }
    }

   }

 }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

body::-webkit-scrollbar {
  width: 1rem;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: var(--shape);        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: var(--blue);    /* color of the scroll thumb */  
  border: 0.1rem solid orange;  /* creates padding around scroll thumb */
}

.contentModal {
  height: 40rem;
  font-size: 1rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.7rem;
    
  }

  ::-webkit-scrollbar-track {
    background: var(--shape);
    height: 0.4rem;
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
}

.react-modal-overlay {
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.react-modal-content {
  width: 100%;
  max-width: 576px;
  background: var(--background);
  padding: 3rem;
  position: relative;
  border-radius: 0.25rem;
  border: 0.1rem solid var(--blue);
  margin: 1rem;
  padding: 1rem;
}

.react-modal-close {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  border: 0;
  background: transparent;
  text-color: var(--blue);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

}

`;
