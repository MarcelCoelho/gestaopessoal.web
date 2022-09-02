import React, {
  InputHTMLAttributes
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  parent?: string;
  name: string;
  value?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, value, icon: Icon, ...rest }) => {

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input
        name={name}
        value={value}
        {...rest}
      />
    </Container>
  );
};
export default Input;