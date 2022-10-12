import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import { DATE_FNS } from '../../../../_constants/date';
import type { IPersonDetail } from '../../../../_models/PersonDetail';
import { getDayMonthYear } from '../../../../_utilities/date';
import { options } from './highchartsOptions';
import { useStyles } from './styles';

type Props = {
    personDetails: null | IPersonDetail[];
    displayQuotes: boolean;
};

export default function View({ personDetails, displayQuotes }: Props) {
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

    const weightData = useMemo(
        () => ({
            data: personDetails?.map((d) => parseFloat(d.weight)),
            name: 'Weight',
            type: 'line',
        }),
        [personDetails]
    );
    const heightData = useMemo(
        () => ({
            data: personDetails?.map((d) => parseFloat(d.height)),
            name: 'Height',
            type: 'line',
        }),
        [personDetails]
    );
    const categories = useMemo(
        () => personDetails?.map((d) => format(new Date(d.date), DATE_FNS.DD_MM_YYYY)),
        [personDetails]
    );
    const chartOptions = options(weightData, heightData, categories);

    return (
        <div className={styles.container}>
            {displayQuotes ? (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
