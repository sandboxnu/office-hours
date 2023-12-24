/* eslint-disable @typescript-eslint/no-unused-vars */

import { InboxOutlined } from '@ant-design/icons'
import { API } from '@koh/api-client'
import { GetOrganizationResponse } from '@koh/common'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Switch,
  Upload,
  Image,
  message,
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

type OrganizationSettingsProps = {
  organization: GetOrganizationResponse
}

export default function SettingsTab({
  organization,
}: OrganizationSettingsProps): ReactElement {
  const [formGeneral] = Form.useForm()
  const router = useRouter()

  const [organizationName, setOrganizationName] = useState(organization.name)
  const [organizationDescription, setOrganizationDescription] = useState(
    organization.description,
  )
  const [organizationWebsiteUrl, setOrganizationWebsiteUrl] = useState(
    organization.websiteUrl,
  )

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (_) {
      return false
    }
  }

  const handleBannerUpload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `/api/v1/organization/${organization?.id}/upload_banner`,
        {
          method: 'POST',
          body: formData,
        },
      )

      const data = await response.json()

      if (response.ok) {
        message.success(`${file.name} file uploaded successfully`).then(() => {
          setTimeout(() => {
            router.reload()
          }, 1750)
        })
      } else {
        message.error(`${file.name} file upload failed: ${data.message}`)
      }
    } catch (error) {
      message.error(`Error uploading ${file.name}. Please try again.`)
    }
  }

  const handleLogoUpload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `/api/v1/organization/${organization?.id}/upload_logo`,
        {
          method: 'POST',
          body: formData,
        },
      )

      const data = await response.json()

      if (response.ok) {
        message.success(`${file.name} file uploaded successfully`).then(() => {
          setTimeout(() => {
            router.reload()
          }, 1750)
        })
      } else {
        message.error(`${file.name} file upload failed: ${data.message}`)
      }
    } catch (error) {
      message.error(`Error uploading ${file.name}. Please try again.`)
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
      return
    }

    const isLT2MB = file.size / 1024 / 1024 < 2

    if (!isLT2MB) {
      message.error('Image must be smaller than 2MB!')
      return
    }

    return isJpgOrPng && isLT2MB
  }

  const updateGeneral = async () => {
    const formValues = await formGeneral.validateFields()
    const organizationNameField = formValues.organizationName
    const organizationDescriptionField = formValues.organizationDescription
    const organizationWebsiteUrlField = formValues.organizationWebsiteUrl

    if (
      organizationNameField === organizationName &&
      organizationDescriptionField === organizationDescription &&
      organizationWebsiteUrlField === organizationWebsiteUrl
    ) {
      message.info(
        'Organization was not updated as information has not been changed',
      )
      return
    }

    if (organizationNameField.length < 3) {
      message.error('Organization name must be at least 3 characters')
      return
    }

    if (organizationDescriptionField.length < 10) {
      message.error('Organization description must be at least 10 characters')
      return
    }

    if (
      organizationWebsiteUrlField &&
      !isValidUrl(organizationWebsiteUrlField)
    ) {
      message.error(
        'Organization URL must be at least 4 characters and be a valid URL',
      )
      return
    }

    await API.organizations
      .patch(organization.id, {
        name: organizationNameField,
        description: organizationDescriptionField,
        websiteUrl: organizationWebsiteUrlField,
      })
      .then((_) => {
        setOrganizationName(organizationNameField)
        setOrganizationDescription(organizationDescriptionField)
        setOrganizationWebsiteUrl(organizationWebsiteUrlField)
        message.success('Organization information was updated')
        setTimeout(() => {
          router.reload()
        }, 1750)
      })
      .catch((error) => {
        const errorMessage = error.response.data.message

        message.error(errorMessage)
      })
  }

  return (
    <>
      <Card title="General" bordered={true} style={{ marginTop: 10 }}>
        <Form
          form={formGeneral}
          onFinish={updateGeneral}
          layout="vertical"
          initialValues={{
            organizationName: organizationName,
            organizationDescription: organizationDescription,
            organizationWebsiteUrl: organizationWebsiteUrl,
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item
                label="Organization Name"
                name="organizationName"
                tooltip="Name of your organization"
              >
                <Input allowClear={true} defaultValue={organizationName} />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item
                label="Organization Website URL"
                name="organizationWebsiteUrl"
                tooltip="Website URL of your organization"
              >
                <Input
                  allowClear={true}
                  defaultValue={organizationWebsiteUrl}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Organization Description"
            name="organizationDescription"
            tooltip="Description of your organization"
          >
            <TextArea
              defaultValue={organizationDescription}
              rows={4}
              style={{ resize: 'none' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Logo & Banner" bordered={true} style={{ marginTop: 10 }}>
        <Form layout="vertical">
          <Form.Item label="Logo">
            <Form.Item name="organizationLogo" noStyle>
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ alignItems: 'center' }}
              >
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Upload.Dragger
                    beforeUpload={beforeUpload}
                    customRequest={({ file }) => handleLogoUpload(file)}
                    showUploadList={true}
                    name="organizationLogoFile"
                    maxCount={1}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Image
                    width={100}
                    src={`/api/v1/organization/${organization?.id}/get_logo/${organization?.logoUrl}`}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form.Item>

          <Form.Item label="Banner">
            <Form.Item name="organizationBanner" noStyle>
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ alignItems: 'center' }}
              >
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Upload.Dragger
                    beforeUpload={beforeUpload}
                    customRequest={({ file }) => handleBannerUpload(file)}
                    showUploadList={true}
                    name="organizationBannerFile"
                    maxCount={1}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Image
                    width={100}
                    src={`/api/v1/organization/${organization?.id}/get_banner/${organization?.bannerUrl}`}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>

      <Card
        title="SSO"
        bordered={true}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Form layout="vertical">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item
                label="Organization SSO URL"
                name="organizationWebsiteUrl"
                tooltip="SSO URL used by organization to authenticate user"
              >
                <Input
                  allowClear={true}
                  defaultValue={organization.ssoUrl}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item
                label="SSO Authorization"
                name="organizationSSOEnabled"
                tooltip="Whether users use organization's authentication system"
              >
                <Switch
                  disabled={true}
                  defaultChecked={organization.ssoEnabled}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}
