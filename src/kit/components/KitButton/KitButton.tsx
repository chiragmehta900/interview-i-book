import { Button, ButtonProps } from '@mui/material';

const KitButton = ({ ...rest }: ButtonProps) => {
    return <Button {...rest} />;
};

export default KitButton;
