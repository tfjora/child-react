import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import type { IQuotes } from '../../../../_models/Quotes';
import { getDayMonthYear } from '../../../../_utilities/date';
import { useStyles } from './styles';

type Props = {
    quotes: null | IQuotes[];
};

export default function View({ quotes }: Props) {
    const styles = useStyles();
    const mappedPerson = quotes?.map((p) => ({
        ...p,
        name: `${p.person.firstName} ${p.person.lastName}`,
        quoteDate: getDayMonthYear(p.dateTime),
    }));

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
            },
            {
                accessorKey: 'quote',
                header: 'Quote',
            },
            {
                accessorKey: 'quoteDate', //normal accessorKey
                header: 'Quote date',
            },
        ],
        []
    );

    return (
        <div className={styles.container}>
            <MaterialReactTable
                columns={columns as any}
                data={mappedPerson as any}
                enableStickyHeader
            />
        </div>
    );
}
