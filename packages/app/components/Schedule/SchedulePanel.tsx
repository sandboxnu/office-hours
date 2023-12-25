import {
  ReactElement,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import FullCalendar, { EventContentArg } from '@fullcalendar/react' // must go before plugins
import timeGridPlugin, { DayTimeColsView } from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import interactionPlugin from '@fullcalendar/interaction'
import { Form, Input, Modal, Spin, Switch, Tooltip, message } from 'antd'
import { useRoleInCourse } from '../../hooks/useRoleInCourse'
import styled from 'styled-components'
import './fullcalendar.css'
import { API } from '@koh/api-client'
import { Role } from '@koh/common'
import { format } from 'date-fns'

const CalendarWrapper = styled.div`
  margin-bottom: 20px;
`
const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #f8f9fb99;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`

type ScheduleProps = {
  courseId: number
  defaultView?: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek'
}
export default function SchedulePanel({
  courseId,
  defaultView = 'timeGridWeek',
}: ScheduleProps): ReactElement {
  const [form] = Form.useForm()
  const [isClientSide, setIsClientSide] = useState(false)
  const role = useRoleInCourse(courseId)
  const calendarRef = useRef(null)
  const spinnerRef = useRef(null)
  const [events, setEvents] = useState([])
  const [eventVisible, setEventVisible] = useState(false)
  const [info, setInfo] = useState(null)
  useEffect(() => {
    // it is now safe to render the client-side only component
    setIsClientSide(true)
  }, [])
  useEffect(() => {
    if (courseId) {
      getEvent()
    }
  }, [courseId])

  //format events-all repeated ones need to start time and endTime, the other ones are regular stuff
  const getEvent = async () => {
    await API.calendar.getEvents(Number(courseId)).then((result) => {
      const modifiedEvents = result.map((event) => parseEvent(event))
      setEvents(modifiedEvents)
    })
  }
  const parseEvent = (event) => {
    if (event.daysOfWeek) {
      const startDate = new Date(event.start)
      const endDate = new Date(event.end)
      return {
        id: event.id,
        title: event.title,
        daysOfWeek: event.daysOfWeek,
        startTime: format(startDate, 'HH:mm'),
        endTime: format(endDate, 'HH:mm'),
      }
    } else {
      return {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
      }
    }
  }
  //allows us to render tooltips around events (in case of cluttered calendars)
  const renderEventContent = (arg: EventContentArg) => {
    const data = calendarRef.current.getApi().getCurrentData()
    const viewSpec = data.viewSpecs[arg.view.type].component
    if (viewSpec === DayTimeColsView) {
      return (
        <Tooltip title={`${arg.timeText}: ${arg.event.title}`}>
          <span>
            <strong>{arg.timeText}</strong> {arg.event.title}
          </span>
        </Tooltip>
      )
    }
  }
  const onOk = async (values: any) => {
    const calendarApi = info.view.calendar
    calendarApi.unselect() // clear date selection
    let e = null
    if (values.repeat) {
      const date = new Date(info.startStr)
      const selectedDay = String(date.getDay())
      e = {
        cid: courseId,
        title: values.eventName,
        start: info.startStr,
        end: info.endStr,
        daysOfWeek: [selectedDay],
      }
    } else {
      e = {
        cid: courseId,
        title: values.eventName,
        start: info.startStr,
        end: info.endStr,
      }
    }
    API.calendar.addCalendar(e).then((event) => {
      setEvents([...events, parseEvent(event)])
    })
  }
  const onCancel = () => {
    setEventVisible(false)
  }
  const handleDateSelect = (selectInfo) => {
    setInfo(selectInfo)
    setEventVisible(true)
  }
  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      API.calendar.deleteEvent(clickInfo.event.id).then((result) => {
        if (result) {
          setEvents(events.filter((event) => event.id != clickInfo.event.id))
        } else {
          message.error('Deletion failed')
        }
      })
    }
  }
  if (role === Role.STUDENT) {
    return (
      <div>
        <SpinnerContainer ref={spinnerRef}>
          <Spin />
        </SpinnerContainer>
        {isClientSide && !isNaN(courseId) && (
          <CalendarWrapper>
            <FullCalendar
              selectable={true}
              editable={true}
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              events={events}
              scrollTime="10:00:00" // auto set each day's view to begin at 8AM
              initialView={defaultView}
              initialEvents={events}
              eventContent={renderEventContent}
              headerToolbar={{
                start: 'title',
                center: 'dayGridMonth timeGridWeek timeGridDay listWeek',
                end: 'today prev,next',
              }}
              loading={(loading) => {
                if (spinnerRef.current)
                  spinnerRef.current.style.display = loading ? 'flex' : 'none'
              }}
              height="70vh"
              timeZone="local"
            />
          </CalendarWrapper>
        )}
      </div>
    )
  } else {
    return (
      <div>
        <SpinnerContainer ref={spinnerRef}>
          <Spin />
        </SpinnerContainer>
        {isClientSide && !isNaN(courseId) && (
          <CalendarWrapper>
            <FullCalendar
              selectable={true}
              editable={true}
              ref={calendarRef}
              plugins={[
                timeGridPlugin,
                iCalendarPlugin,
                dayGridPlugin,
                listPlugin,
                interactionPlugin,
              ]}
              eventClick={handleEventClick}
              select={handleDateSelect}
              events={events}
              scrollTime="13:00:00" // auto set each day's view to begin at x AM
              initialView={defaultView}
              initialEvents={events}
              headerToolbar={{
                start: 'title',
                center: 'dayGridMonth timeGridWeek timeGridDay listWeek',
                end: 'today prev,next',
              }}
              loading={(loading) => {
                if (spinnerRef.current)
                  spinnerRef.current.style.display = loading ? 'flex' : 'none'
              }}
              height="100vh"
            />
            <Modal
              visible={eventVisible}
              onOk={async () => {
                await form.validateFields().then((value) => onOk(value))
                onCancel()
              }}
              onCancel={onCancel}
            >
              <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  label="Event Name"
                  name="eventName"
                  rules={[
                    { required: true, message: 'Please input event name!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Repeat Weekly"
                  name="repeat"
                  valuePropName="checked"
                >
                  <Switch data-cy="repeat-toggle" />
                </Form.Item>
              </Form>
            </Modal>
          </CalendarWrapper>
        )}
      </div>
    )
  }
}
