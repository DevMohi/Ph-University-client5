import { Button, Col, Flex } from "antd";
import { PHForm } from "../../../components/form/PHForm";
import { PHInput } from "../../../components/form/PHInput";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { PHSelectWithWatch } from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";

export const OfferCourse = () => {
  const [id, setId] = useState("");
  console.log("Inside parent", id);
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHInput
            disabled={!id}
            name="test"
            type="text"
            label="Test"
          ></PHInput>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
