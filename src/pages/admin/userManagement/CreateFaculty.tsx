import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

import { Button, Col, Divider, Form, Input, Row } from "antd";
import { PHForm } from "../../../components/form/PHForm";
import { PHInput } from "../../../components/form/PHInput";
import { PHSelect } from "../../../components/form/PHSelect";
import { PHDatePicker } from "../../../components/form/PHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
  useAddAcademicFacultyMutation,
  useGetAcademicDepartmentsQuery,
} from "../../../redux/features/admin/academicManagement.api";

const facultyDefaultValues = {
  designation: "Lecturer Pro",
  name: {
    firstName: "Dipon",
    middleName: "Das",
    lastName: "Shakib",
  },
  contactNo: "1235678",
  emergencyContactNo: "0987654321",

  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Elm Street, Townsville",
  academicDepartment: "67f2a0867099060ca3d10e1e",
};

export const CreateFaculty = () => {
  const [addFaculty, { data, error }] = useAddAcademicFacultyMutation();
  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  console.log(data, error);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    console.log(facultyData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);
    addFaculty(formData);
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="designation"
                label="Designation"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.firstName"
                label="First Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.lastName"
                label="Last Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Gender"
                name="gender"
                options={genderOptions}
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker
                name="dateOfBirth"
                label="Date of Birth"
              ></PHDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    ></Input>
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info.</Divider>
          <Row>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};
