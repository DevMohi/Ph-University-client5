import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

export const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAcademicDepartmentsQuery(undefined);
  console.log(departmentData);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Faculty Name",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
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
