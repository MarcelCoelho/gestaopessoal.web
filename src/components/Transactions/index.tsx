import { Summary } from "./Summary";
import { Table } from "./Table";
import { Container } from "./styles";

export function Transactions() {
  return (
    <Container>
      <Summary />
      <Table />
    </Container>
  );
}