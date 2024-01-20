interface Props {
    show: boolean;
    children: JSX.Element;
}

const KitShow = ({ show, children }: Props) => {
    return show ? children : null;
};

export default KitShow;
