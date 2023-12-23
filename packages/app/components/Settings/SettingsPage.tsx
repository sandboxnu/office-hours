import {
  BellOutlined,
  BookOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Collapse } from 'antd'
import { API } from '@koh/api-client'
import { useWindowWidth } from '@react-hook/window-size'
import { Button, Col, Menu, message, Row, Skeleton, Space, Upload } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import NotificationsSettings from './NotificationsSettings'
import ProfileSettings from './ProfileSettings'
import TeamsSettings from './TeamsSettings'
import CoursePreferenceSettings from './CoursePreferenceSettings'
import { useIsMobile } from '../../hooks/useIsMobile'
import { SettingsPanelAvatar } from './SettingsSharedComponents'

export enum SettingsOptions {
  PROFILE = 'PROFILE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  TEAMS_SETTINGS = 'TEAMS_SETTINGS',
  PREFERENCES = 'PREFERENCES',
}

interface SettingsPageProps {
  defaultPage: SettingsOptions
}

export const VerticalDivider = styled.div`
  @media (min-width: 767px) {
    border-right: 1px solid #cfd6de;
    margin-right: 32px;
  }
`

const ProfilePicButton = styled(Button)`
  flex: wrap;
  width: calc(5vw);
  min-width: 180px;
`

const { Panel } = Collapse

export default function SettingsPage({
  defaultPage,
}: SettingsPageProps): ReactElement {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR(`api/v1/profile`, async () => API.profile.index())

  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || SettingsOptions.PROFILE,
  )
  const [uploading, setUploading] = useState(false)
  const isMobile = useIsMobile()
  const windowWidth = useWindowWidth()
  const [avatarSize, setAvatarSize] = useState(windowWidth / 2)

  useEffect(() => {
    const widthDivider = isMobile ? 6 : 10
    setAvatarSize(windowWidth / widthDivider)
  })

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJpgOrPng) {
      message.error('You can only upload JPGs or PNGs!')
    }

    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!')
    }

    return isJpgOrPng && isLt1M
  }
  const handleUpload = async (file) => {
    try {
      setUploading(true) // Start the upload state
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('api/v1/profile/upload_picture', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        message.success(`${file.name} file uploaded successfully`)
        mutate() // Refresh profile data
      } else {
        message.error(`${file.name} file upload failed: ${data.message}`)
      }
    } catch (error) {
      message.error(`Error uploading ${file.name}. Please try again.`)
    } finally {
      setUploading(false) // Reset the upload state regardless of success or error
    }
  }

  if (error) {
    message.error(error)
  }

  const AvatarSettings = () => (
    <Col>
      {avatarSize ? (
        <Row
          style={{
            marginTop: avatarSize / 6,
            justifyContent: `${isMobile ? 'left' : 'center'}`,
          }}
        >
          {uploading ? (
            <Skeleton.Avatar
              active={true}
              size={avatarSize}
              shape="circle"
              style={{
                marginTop: avatarSize / 6,
                marginBottom: avatarSize / 12,
                marginLeft: avatarSize / 6,
                marginRight: avatarSize / 6,
              }}
            />
          ) : (
            <SettingsPanelAvatar avatarSize={avatarSize} />
          )}
          <Col>
            {profile && (
              <h2>
                {profile.firstName} {profile.lastName}
              </h2>
            )}
            <Upload
              customRequest={async ({ file }) => await handleUpload(file)} // Use customRequest to handle the upload logic ourselves
              beforeUpload={beforeUpload}
              showUploadList={true}
              onChange={(info) => {
                setUploading(info.file.status === 'uploading')
                mutate()
              }}
            >
              <ProfilePicButton icon={<UploadOutlined />}>
                Edit photo
              </ProfilePicButton>
            </Upload>
            {profile?.photoURL && (
              <ProfilePicButton
                icon={<DeleteOutlined />}
                style={{ marginTop: '10px' }}
                onClick={async () => {
                  try {
                    await API.profile.deleteProfilePicture()
                    message.success(
                      "You've successfully deleted your profile picture",
                    )
                    mutate()
                  } catch (e) {
                    message.error(
                      'There was an error with deleting your profile picture, please contact HelpMe Office Hours team for assistance',
                    )
                    throw e
                  }
                }}
              >
                Delete Profile Picture
              </ProfilePicButton>
            )}
          </Col>
        </Row>
      ) : null}
    </Col>
  )

  const SettingsMenu = () => (
    <>
      {isMobile ? (
        <Collapse accordion style={{ marginTop: '10px' }}>
          <Panel header="Personal Information" key="profile">
            <ProfileSettings />
          </Panel>
          {/* {isTAOrProfessor && (
            <Panel header="Teams Settings" key="teams_settings">
              <TeamsSettings />
            </Panel>
          )} */}
          <Panel header="Notifications" key="notifications">
            <NotificationsSettings />
          </Panel>
          <Panel header="Course Preferences" key="preferences">
            <CoursePreferenceSettings />
          </Panel>
        </Collapse>
      ) : (
        <Menu
          style={{ background: 'none', marginTop: '10px' }}
          defaultSelectedKeys={[currentSettings]}
          onClick={(e) => setCurrentSettings(e.key as SettingsOptions)}
        >
          <Menu.Item key={SettingsOptions.PROFILE} icon={<UserOutlined />}>
            Personal Information
          </Menu.Item>
          {/* {isTAOrProfessor && (
            <Menu.Item
              key={SettingsOptions.TEAMS_SETTINGS}
              icon={<WindowsOutlined />}
            >
              Teams Settings
            </Menu.Item>
          )} */}
          <Menu.Item
            key={SettingsOptions.NOTIFICATIONS}
            icon={<BellOutlined />}
          >
            Notifications
          </Menu.Item>
          <Menu.Item key={SettingsOptions.PREFERENCES} icon={<BookOutlined />}>
            Course Preferences
          </Menu.Item>
        </Menu>
      )}
    </>
  )

  const DesktopSettingsSubpage = () => (
    <Col>
      {currentSettings === SettingsOptions.PROFILE && <ProfileSettings />}
      {currentSettings === SettingsOptions.NOTIFICATIONS && (
        <NotificationsSettings />
      )}
      {currentSettings === SettingsOptions.TEAMS_SETTINGS && <TeamsSettings />}
      {currentSettings === SettingsOptions.PREFERENCES && (
        <CoursePreferenceSettings />
      )}
    </Col>
  )

  return (
    <div>
      {isMobile ? (
        <Col>
          <AvatarSettings />
          <SettingsMenu />
        </Col>
      ) : (
        <Row>
          <Col span={5} style={{ textAlign: 'center' }}>
            <AvatarSettings />
            <SettingsMenu />
          </Col>
          <VerticalDivider />
          <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
            <DesktopSettingsSubpage />
          </Space>
        </Row>
      )}
    </div>
  )
}
