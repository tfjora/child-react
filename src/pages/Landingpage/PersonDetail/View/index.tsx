import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import type { IPersonDetail } from '../../../../_models/PersonDetail';
import { getDayMonthYear } from '../../../../_utilities/date';
import { useStyles } from './styles';

type Props = {
    personDetails: null | IPersonDetail[];
};

export default function View({ personDetails }: Props) {
    const styles = useStyles();
    const mappedPerson = personDetails?.map((p) => ({
        ...p,
        dateSub: getDayMonthYear(p.date),
        name: `${p.person.firstName} ${p.person.lastName}`,
    }));

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
            },
            {
                accessorKey: 'height',
                header: 'Height',
            },
            {
                accessorKey: 'weight', //normal accessorKey
                header: 'Weight',
            },
            {
                accessorKey: 'dateSub', //normal accessorKey
                header: 'Date submitted',
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
