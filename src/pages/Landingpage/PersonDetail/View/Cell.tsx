import { useStyles } from './styles';

type Props = {
    item: string | number;
};

export default function Cell({ item }: Props) {
    const styles = useStyles();

    return <td className={styles.tableTd}>{item}</td>;
}
