/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import type { IQuotes } from '../../../../_models/Quotes';
import { getDayMonthYear } from '../../../../_utilities/date';
import CircleChart from './BarChart';
import { useStyles } from './styles';

type Props = {
    quotes: null | IQuotes[];
    displayQuotes: boolean;
};

export default function View({ quotes, displayQuotes }: Props) {
    const styles = useStyles();
    const mappedPerson = quotes?.map((p) => ({
        ...p,
        name: `${p.person.firstName} ${p.person.lastName}`,
        quoteDate: getDayMonthYear(p.dateTime),
    }));

    const calcSize = () => {
        let size = Math.random() * 100 + 50;
        if (size < 100 || size > 900) size = Math.random() * (700 - 100) + 100;

        return size;
    };

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
    const colors = ['lightblue', 'yellow'];

    const data = useMemo(
        () =>
            quotes?.map((d, i) => ({
                background: i % 2 === 0 ? colors[0] : colors[1],
                color: 'black',
                r: 30,
                text: `${d.quote}`,
                x: calcSize(),
                y: calcSize(),
            })),
        [quotes]
    );

    return (
        <div className={styles.container}>
            {displayQuotes ? (
                <CircleChart data={data} />
            ) : (
                <MaterialReactTable
                    columns={columns as any}
                    data={mappedPerson as any}
                    enableStickyHeader
                />
            )}
        </div>
    );
}
