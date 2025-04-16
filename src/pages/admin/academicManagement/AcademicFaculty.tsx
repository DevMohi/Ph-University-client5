import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicFaculty, "name">;

export const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAcademicFacultiesQuery(undefined);
  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Faculty Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};
