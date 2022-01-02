import { ReactElement } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button } from "antd";

const Bold = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const { Option } = Select;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: 'Please provide a valid email!',
    number: '${label} is not a valid number!',
    url: 'Please provide a valid Google (or Outlook) calendar url!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function createSGString(name: String, crns: number[]) {
  return `${name} (CRNs: ${crns.join(", ")})`;
}

export default function EditCourse({
  courseInfo,
  onChangeCourse,
}): ReactElement {
  console.log(courseInfo, onChangeCourse);
  const handleSubmit = () =>
  onChangeCourse(
    //selectedCourses.map((courseIdx) => profile?.pendingCourses[courseIdx])
  );

  const sectionGroupString = createSGString(courseInfo.name, courseInfo.crns);

  return (
    // need to fix the link :|
    <div>
      <div>
        <Bold>
        Please fill out the following course information for <a href="https://play2048.co/">{sectionGroupString}</a>
        </Bold>
      </div>

      <Form layout="vertical" validateMessages={validateMessages}>
        <Form.Item name="display name" 
        label="Course Display Name" 
        rules={[{ required: true }]}>
          <Input placeholder="ex: CS 2500"/>
        </Form.Item>

        <Form.Item name="campus" 
        label="Campus" 
        rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            //onChange={this.onCampusChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="coordinator email"
        label="Coordinator Email" 
        rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="example@northeastern.edu"/>
      </Form.Item>

      <Form.Item
        name="icalURL"
        label="Office Hours Calendar URL"
        rules={[{ required: true, type: 'url' }]}
      >
        <Input placeholder="http://calendar.google.com/calendar/ical/...basics.ics"></Input>
      </Form.Item>

      </Form>
      <Button
        onClick={handleSubmit}
        style={{ marginTop: "30px" }}
      >
        Back
      </Button>

      <Button
        onClick={handleSubmit}
        type="primary"
        style={{ marginTop: "30px" }}
      >
        Next
      </Button>
    </div>
  );
}
