import type { IPersonDetail } from "../../../../_models/PersonDetail";
import { getDayMonthYear } from "../../../../_utilities/date";
import MaterialReactTable from "material-react-table";
import { useStyles } from "./styles";
import { useMemo } from "react";

type Props = {
  personDetails: null | IPersonDetail[];
};

export default function View({ personDetails }: Props) {
  const styles = useStyles();
  const mappedPerson = personDetails?.map((p) => ({
    ...p,
    name: `${p.person.firstName} ${p.person.lastName}`,
    dateSub: getDayMonthYear(p.date),
  }));

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
      },
      {
        accessorKey: "height",
        header: "Height",
      },
      {
        accessorKey: "weight", //normal accessorKey
        header: "Weight",
      },
      {
        accessorKey: "dateSub", //normal accessorKey
        header: "Date submitted",
      },
    ],
    []
  );

  return (
    <div>
      <MaterialReactTable columns={columns as any} data={mappedPerson as any} enableStickyHeader />
    </div>
  );
}
